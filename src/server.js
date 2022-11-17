import express from "express";
import cors from "cors";
import { openServerDatabase } from "./database/connection.js";
import {newUser, login} from './controllers/userController.js'
import {newRevenue} from './controllers/transactionController.js'


let connection;
try{
   connection = await openServerDatabase();
}catch(erro){
  console.log(erro, "Error in database!")
}

export const connectionUser = connection.collection("users");
export const connectionTransaction = connection.collection("transaction");

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sign-up', newUser);
app.post('/sign-in', login);




app.post('/revenue', newRevenue)

app.get("/", async (req, res) => {
  const t = await connectionTransaction.find({}).toArray()
  res.send(t)
})

const port = 5000
app.listen(port, () => console.log(`Server running in http://localhost:${port}`));
