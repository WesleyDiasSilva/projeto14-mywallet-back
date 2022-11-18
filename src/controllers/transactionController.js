import dayjs from "dayjs";
import Joi from "joi";
import { transactionModel } from "../models/TransactionModel.js";
import { userModel } from "../models/UserModel.js";

export async function newTransaction(req, res) {
  const date = dayjs().format("DD/MM/YYYY");
  const user = req.userAuth;
  const { description, value, type } = req.newTransaction;
  try {
    await transactionModel.insertOne({
      date,
      email: user.email,
      description,
      value,
      type,
    });
    res.status(201).send("New transaction created with success");
  } catch (err) {
    console.log(err);
    res.status(500);
    return;
  }
}

export async function getTransactions(req, res) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(400).send("Request authorization");
    return;
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const user = await userModel.findOneToken({ token });
    if (!user) {
      res.status(401).send("Invalid Token!");
      return;
    }
    const transactions = await transactionModel.getAllTransaction(user.email);
    res.status(200).send(transactions);
  } catch (err) {
    console.log(err);
  }
}
