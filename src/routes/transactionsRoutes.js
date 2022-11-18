import { Router } from "express";
import {
  getTransactions,
  newTransaction,
} from "../controllers/transactionController.js";
import { authUser } from "../middlewares/authMiddleware.js";
import { newTransactionMiddleware } from "../middlewares/newTransactionMiddleware.js";

const route = Router();

route.use(authUser);
route.post("/transaction", newTransactionMiddleware, newTransaction);
route.get("/transaction?", getTransactions);

export default route;
