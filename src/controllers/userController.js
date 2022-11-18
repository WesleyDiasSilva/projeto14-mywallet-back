import Joi from "joi";
import { userModel } from "../models/UserModel.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

export async function newUser(req, res) {
  const { name, email, password } = req.newUser;
  try {
    const emailExist = await userModel.findOneEmail({
      email: email.toLowerCase(),
    });

    if (emailExist) {
      res.status(401).send("Invalid e-mail ");
      return;
    }

    const hash = bcrypt.hashSync(password, 10);
    const result = await userModel.insertOne({
      name,
      email: email.toLowerCase(),
      hash,
    });
    const user = { name };
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
    const result = await userModel.findOneEmail({ email: email.toLowerCase() });
    if (result) {
      const hashIsValid = bcrypt.compareSync(password, result.hash);
      if (hashIsValid) {
        const token = uuid();
        await userModel.updateOne(result._id, { token });
        res.send({ user: result.name, token: "Bearer " + token });
        return;
      } else {
        res.status(401).send("Invalid Password!");
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
