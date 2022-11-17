import express from "express";
import cors from "cors";
import { openServerDatabase } from "./database/connection.js";
import {newUser, login} from './controllers/userController.js'

let connection;
try{
   connection = await openServerDatabase();
}catch(erro){
  console.log(erro, "Falha no banco de dados!")
}

export const connectionUser = connection.collection("users");
export const connectionTransaction = connection.collection("transaction");

const app = express();

app.use(cors());
app.use(express.json());

app.post('/sign-up', newUser);
app.post('/sign-in', login);

app.get("/", async (req, res) => {
  const t = await connectionUser.find({}).toArray()
  res.send(t)
})

app.delete("/" , async (req, res) => {
  const result = await connectionUser.deleteMany({});
  res.send(result);
})

app.listen(5000, () => console.log("Server rodando!"));
