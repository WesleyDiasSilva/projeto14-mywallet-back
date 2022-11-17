import dayjs from "dayjs";
import Joi from "joi";
import { transactionModel } from "../models/TransactionModel.js";
import { userModel } from "../models/UserModel.js";

const schemaNewTransaction = Joi.object({
  value: Joi.number().positive().precision(2).required(),
  description: Joi.string().min(3).required(),
});

export async function newRevenue(req, res) {
  const { value, description } = req.body;
  const { authorization } = req.headers;
  const date = dayjs().format("DD/MM/YYYY");
  const type = "revenue";
  
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
    res.status(201).send("New revenue created with success")
  } catch (err) {
    console.log(err);
    res.status(500);
    return;
  }
}

