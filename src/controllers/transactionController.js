import dayjs from "dayjs";
import Joi from "joi";
import { transactionModel } from "../models/TransactionModel.js";
import { userModel } from "../models/UserModel.js";

const schemaNewTransaction = Joi.object({
  value: Joi.number().positive().precision(2).required(),
  description: Joi.string().min(3).required(),
});

export async function newTransaction(req, res) {
  const { value, description, type } = req.body;
  const { authorization } = req.headers;
  const date = dayjs().format("DD/MM/YYYY");

  const valueNumber = Number(value).toFixed(2).trim();

  const validation = schemaNewTransaction.validate(
    { value: valueNumber, description },
    { abortEarly: false }
  );

  if (validation.error) {
    const errors = validation.error.details.map((err) => err.message);
    res.status(406).send(errors);
    return;
  }

  const token = authorization.replace("Bearer", "");

  try {
    const tokenIsValid = await userModel.findOne({ token });
    if (!tokenIsValid) {
      res.status(401).send("Token invalid");
      return;
    }

    await transactionModel.insertOne({
      date,
      email: tokenIsValid.email,
      description,
      value: valueNumber,
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
  const token = authorization.replace("Bearer", "");

  try {
    const user = await userModel.findOne({ token: token });
    console.log(user);
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

export async function newExpense(req, res){

}