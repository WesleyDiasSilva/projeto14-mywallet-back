import { Router } from "express";
import {
  deleteTransactions,
  getTransactions,
  newTransaction,
  newTransactionTeste,
  updateTransactions,
} from "../controllers/transactionController.js";
import { authUser } from "../middlewares/authMiddleware.js";
import { transactionMiddleware } from "../middlewares/transactionMiddleware.js";
const route = Router();

route.post("/transactionNew", newTransactionTeste);
route.use(authUser);
route.get("/transaction?", getTransactions);
route.delete("/transaction/:id", deleteTransactions);
route.use(transactionMiddleware);
route.post("/transaction", newTransaction);
route.put("/transaction/:id", updateTransactions);

export default route;
