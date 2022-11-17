import express from "express";
import cors from "cors";
import { openServerDatabase } from "./database/connection.js";
import { newUser, login } from "./controllers/userController.js";
import {
  newRevenue,
  getTransactions,
} from "./controllers/transactionController.js";

let connection;
try {
  connection = await openServerDatabase();
} catch (erro) {
  console.log(erro, "Error in database!");
}

export const connectionUser = connection.collection("users");
export const connectionTransaction = connection.collection("transaction");

const app = express();

app.use(cors());
app.use(express.json());

//Route users
app.post("/sign-up", newUser);
app.post("/sign-in", login);

//Route transactions
app.post("/revenue", newRevenue);
app.get("/transaction", getTransactions);

const port = 5000;
app.listen(port, () =>
  console.log(`Server running in http://localhost:${port}`)
);
