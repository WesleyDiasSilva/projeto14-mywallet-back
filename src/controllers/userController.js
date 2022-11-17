import Joi from "joi";
import { userModel } from "../models/UserModel.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

const schemaNewUser = Joi.object({
  name: Joi.string().min(3).trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).required(),
});

export async function newUser(req, res) {
  const { name, email, password, confirmPassword } = req.body;
  const validation = schemaNewUser.validate(
    { name, email, password, confirmPassword },
    { abortEarly: false }
  );

  if (validation.error) {
    const errors = validation.error.details.map((err) => err.message);
    res.status(406).send(errors);
    return;
  }

  try {
    const emailExist = await userModel.findOne({ email });

    if (emailExist) {
      res.send("Invalid e-mail ");
      return;
    }

    const hash = bcrypt.hashSync(password, 10);
    const result = await userModel.insertOne({ name, email, hash });
    const user = {name}
    res.status(201).send({ result, status: true, user });
  } catch (err) {
    console.log(err);
    res.status(500).send({ result, status: false });
    return;
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  try {
    const result = await userModel.findOne({ email });
    if (result) {
      const hashIsValid = bcrypt.compareSync(password, result.hash);
      if (hashIsValid) {
        const token = uuid();
        await userModel.updateOne(result._id, {token});
        res.send({user: result.name, token});
        return;
      } else {
        res.send("Invalid Password!");
        return;
      }
    } else {
      res.status(406).send("email not found!");
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500);
    return;
  }
}
