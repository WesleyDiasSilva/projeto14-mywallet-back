import express from "express";
import cors from "cors";
import { openServerDatabase } from "./database/connection.js";
import {newUser} from './controllers/userController.js'

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

app.post('/', newUser)

app.listen(5000, () => console.log("Server rodando!"));
