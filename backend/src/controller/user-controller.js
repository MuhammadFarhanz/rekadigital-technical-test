import userService from "../services/user-service.js";

const getAllCustomer = async (req, res, next) => {
  try {
    const result = await userService.getAllCustomer();
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const addCustomer = async (req, res, next) => {
  try {
    const result = await userService.addCustomer(req.body);

    res.status(200).json({
      data: { id: result.id },
    });
  } catch (e) {
    next(e);
  }
};

const getDetailCustomer = async (req, res, next) => {
  try {
    const result = await userService.getDetailCustomer(req.params);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const result = await userService.deleteCustomer(req.params);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const createTransaction = async (req, res, next) => {
  try {
    const result = await userService.createTransaction(req.body);

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const updateTransaction = async (req, res, next) => {
  try {
    const result = await userService.updateTransaction(req);

    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
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
