import express from "express";
import cors from "cors";
import { openServerDatabase } from "./database/connection.js";
import routeAuth from "./routes/userRoutes.js";
import routeTransactions from "./routes/transactionsRoutes.js";

let connection;
try {
  connection = await openServerDatabase();
} catch (err) {
  connection = err;
}
export const connectionUser = connection.collection("users");
export const connectionTransaction = connection.collection("transaction");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routeAuth);
app.use(routeTransactions);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server running in http://localhost:${port}`)
);
