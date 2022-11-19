import { userModel } from "../models/UserModel.js";

export async function authUser(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(400).send("Authorization is required");
    return;
  }
  const token = authorization?.replace("Bearer ", "");
  try {
    const tokenIsValid = await userModel.findOneToken({ token: token });
    if (!tokenIsValid) {
      res.status(401).send("Token invalid");
      return;
    }
    delete tokenIsValid.hash;
    req.userAuth = tokenIsValid;
  } catch (err) {
    console.log(err);
  }
  next();
}
