import dayjs from "dayjs";
import Joi from "joi";
import { transactionModel } from "../models/TransactionModel.js";
import { userModel } from "../models/UserModel.js";

export async function newTransaction(req, res) {
  const date = dayjs().format("DD/MM/YYYY");
  const user = req.userAuth;
  const { description, value, type } = req.transaction;
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
    res.status(500).send();
  }
}

export async function updateTransactions(req, res) {
  const { value, description, type } = req.transaction;
  const { id } = req.params;

  try {
    const result = await transactionModel.updateOne(id, {
      value,
      description,
      type,
    });
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send();
  }
}

export async function deleteTransactions(req, res) {
  const { id } = req.params;
  try {
    const result = await transactionModel.deleteOne(id);
    res.status(200).send(result);
    return { status: true, result };
  } catch (err) {
    res.status(500).send();
  }
}

export async function newTransactionTeste(req, res) {
  const { value, description, type } = req.body;
  const result = await transactionModel.insertOne({
    email: "wesley@gmail.com",
    date: "21/11/2022",
    value,
    description,
    type,
  });
  res.send(result);
}
