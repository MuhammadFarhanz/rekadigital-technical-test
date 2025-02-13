import { pool } from "../application/db.js";
import { ResponseError } from "../error/response-error.js";
import {
  addCustomerValidation,
  createTransactionValidation,
  deleteCustomerValidation,
  getDetailCustomerValidation,
  updateTransactionValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";

const getAllCustomer = async (request) => {
  const { rows } = await pool.query(
    "SELECT * FROM customers WHERE deleted_at IS NULL"
  );
  return rows;
};

const addCustomer = async (request) => {
  const customer = validate(addCustomerValidation, request);

  const query = `
      INSERT INTO customers (name, email, phone, address, level, favorite_menu)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;

  const values = [
    customer.name,
    customer.email,
    customer.phone,
    customer.address,
    customer.level,
    customer.favorite_menu,
  ];

  const { rows } = await pool.query(query, values);
  return { id: rows[0].id };
};

const getDetailCustomer = async (request) => {
  const { id } = validate(getDetailCustomerValidation, request);

  const customerQuery = `
      SELECT id, name, email, phone, address, level, favorite_menu, total_transaction
      FROM customers
      WHERE id = $1;
    `;

  const orderHistoryQuery = `
      SELECT t.id AS transaction_id, p.name AS product_name, t.quantity, t.total_amount, t.created_at
      FROM transactions t
      JOIN products p ON t.product_id = p.id
      WHERE t.customer_id = $1
      ORDER BY t.created_at DESC;
    `;

  const customerResult = await pool.query(customerQuery, [id]);

  if (customerResult.rows.length === 0) {
    throw new ResponseError(404, "Customer not found");
  }

  const orderHistoryResult = await pool.query(orderHistoryQuery, [id]);

  return {
    ...customerResult.rows[0],
    order_history: orderHistoryResult.rows,
  };
};

const deleteCustomer = async (request) => {
  const { id } = validate(deleteCustomerValidation, request);

  const query = `
    UPDATE customers SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1;
  `;

  await pool.query(query, [id]);
  return;
};

const createTransaction = async (request) => {
  const { customer_id, product_id, quantity } = validate(
    createTransactionValidation,
    request
  );

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const productQuery = `
    SELECT stock, price FROM products WHERE id = $1 FOR UPDATE;
  `;
    const productResult = await client.query(productQuery, [product_id]);

    if (productResult.rows.length === 0) {
      throw new ResponseError(404, "Product not found");
    }
    if (productResult.rows[0].stock < quantity) {
      throw new ResponseError(400, "Insufficient stock");
    }

    const productPrice = productResult.rows[0].price;
    const totalAmount = quantity * productPrice;

    // Insert transaction
    const transactionQuery = `
    INSERT INTO transactions (customer_id, product_id, quantity, total_amount)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
  `;
    const { rows } = await client.query(transactionQuery, [
      customer_id,
      product_id,
      quantity,
      totalAmount,
    ]);

    const updateStockQuery = `
    UPDATE products SET stock = stock - $1 WHERE id = $2;
  `;
    await client.query(updateStockQuery, [quantity, product_id]);

    // Update customer's total_transaction
    const updateCustomerQuery = `
    UPDATE customers SET total_transaction = total_transaction + $1 WHERE id = $2;
  `;
    await client.query(updateCustomerQuery, [totalAmount, customer_id]);

    await client.query("COMMIT");

    return { id: rows[0].id };
  } catch (err) {
    await client.query("ROLLBACK");

    throw err;
  } finally {
    client.release();
  }
};

const updateTransaction = async (request) => {
  const { id, quantity } = validate(updateTransactionValidation, {
    id: request.params.id,
    quantity: request.body.quantity,
  });

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Fetch the current transaction
    const fetchTransactionQuery = `
      SELECT t.quantity, t.total_amount, t.customer_id, p.price
      FROM transactions t
      JOIN products p ON t.product_id = p.id
      WHERE t.id = $1
      FOR UPDATE;
    `;
    const transactionResult = await client.query(fetchTransactionQuery, [id]);

    if (transactionResult.rows.length === 0) {
      throw new ResponseError(404, "Transaction not found");
    }

    const {
      total_amount: oldTotalAmount,
      customer_id,
      price,
    } = transactionResult.rows[0];

    const newTotalAmount = quantity * price;

    // Update the transaction
    const updateTransactionQuery = `
      UPDATE transactions
      SET quantity = $1, total_amount = $2
      WHERE id = $3
      RETURNING *;
    `;
    const { rows } = await client.query(updateTransactionQuery, [
      quantity,
      newTotalAmount,
      id,
    ]);

    const updateCustomerQuery = `
      UPDATE customers
      SET total_transaction = total_transaction - $1 + $2
      WHERE id = $3;
    `;
    await client.query(updateCustomerQuery, [
      oldTotalAmount,
      newTotalAmount,
      customer_id,
    ]);

    await client.query("COMMIT");

    return { transaction: rows[0] };
  } catch (err) {
    await client.query("ROLLBACK");

    if (err instanceof ResponseError) {
      throw err;
    } else {
      throw new ResponseError(500, "Internal server error");
    }
  } finally {
    client.release();
  }
};

export default {
  getAllCustomer,
  addCustomer,
  getDetailCustomer,
  deleteCustomer,
  createTransaction,
  updateTransaction,
};
