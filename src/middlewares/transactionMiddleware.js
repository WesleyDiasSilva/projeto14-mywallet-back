import Joi from "joi";
import { transactionModel } from "../models/TransactionModel.js";

export function transactionMiddleware(req, res, next) {
  const schemaNewTransaction = Joi.object({
    value: Joi.number().positive().precision(2).required(),
    description: Joi.string().min(3).required(),
    type: Joi.string().valid("revenue", "expense").required(),
  });

  const { value, description, type } = req.body;

  const valueNumber = Number(value).toFixed(2).trim();

  const validation = schemaNewTransaction.validate(
    { value: valueNumber, description, type },
    { abortEarly: false }
  );

  if (validation.error) {
    const errors = validation.error.details.map((err) => err.message);
    res.status(406).send(errors);
    return;
  }

  req.transaction = { value: valueNumber, description, type };
  next();
}
