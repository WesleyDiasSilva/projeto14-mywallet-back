import { userModel } from "../models/UserModel.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

export async function newUser(req, res) {
  const { name, email, password, image } = req.newUser;
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
      image,
    });
    const user = { name, image };
    res.status(201).send({ result, status: true, user });
  } catch (err) {
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
        res.send({
          user: result.name,
          token: "Bearer " + token,
          image: result.image,
        });
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
    res.status(500);
    return;
  }
}

export async function updateUser(req, res) {
  const user = req.userAuth;
  const updateDocument = req.body;

  try {
    const result = await userModel.updateOne(user._id, updateDocument);
    res.status(200).send(result);
  } catch (err) {
    res.sendStatus(500);
  }
}
