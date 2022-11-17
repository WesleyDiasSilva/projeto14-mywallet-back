import Joi from "joi";
import { userModel } from "../models/UserModel.js";
import { v4 as uuid } from "uuid";

const schemaNewUser = Joi.object({
  name: Joi.string().min(3).trim().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).required()
})

export async function newUser(req, res){
  const {name, email, password, confirmPassword} = req.body;
  const validation = schemaNewUser.validate({name, email, password, confirmPassword}, {abortEarly: false})
  
  if(validation.error){
    const errors = validation.error.details.map(err => err.message);
    res.status(406).send(errors);
    return;
  }

  try{
    const result = await userModel.insertOne({name, email, password, confirmPassword});
    res.status(201).send({result, status: true})
  } catch(err){
    console.log(err)
    res.status(500).send({result, status: false})
    return
  }

}