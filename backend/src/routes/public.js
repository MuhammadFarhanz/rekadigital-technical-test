import express from "express";
import userController from "../controller/user-controller.js";

const publicRouter = new express.Router();

publicRouter.get("/customers", userController.getAllCustomer);
publicRouter.post("/customer", userController.addCustomer);
publicRouter.get("/customer/:id", userController.getDetailCustomer);
publicRouter.delete("/customer/:id", userController.deleteCustomer);
publicRouter.post("/transaction", userController.createTransaction);
publicRouter.patch("/transaction/:id", userController.updateTransaction);

export { publicRouter };
