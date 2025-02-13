import Joi from "joi";

const addCustomerValidation = Joi.object({
  name: Joi.string().max(255).required(),
  email: Joi.string().email().max(255).required(),
  phone: Joi.string().max(50).required(),
  address: Joi.string().optional(),
  level: Joi.string().max(50).required(),
  favorite_menu: Joi.string().max(255).optional(),
});

const getDetailCustomerValidation = Joi.object({
  id: Joi.string().uuid().required(),
});

const deleteCustomerValidation = Joi.object({
  id: Joi.string().uuid().required(),
});

const createTransactionValidation = Joi.object({
  customer_id: Joi.string().uuid().required(),
  product_id: Joi.string().uuid().required(),
  quantity: Joi.number().integer().min(1).required(),
});

const updateTransactionValidation = Joi.object({
  id: Joi.string().uuid().required(),
  quantity: Joi.number().integer().min(1).required(),
});

export {
  addCustomerValidation,
  getDetailCustomerValidation,
  deleteCustomerValidation,
  createTransactionValidation,
  updateTransactionValidation,
};
