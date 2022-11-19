import Joi from "joi";

export function newUserMiddleware(req, res, next) {
  const schemaNewUser = Joi.object({
    name: Joi.string().min(3).trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().min(6).required(),
    image: Joi.string().min(6),
  });

  const { name, email, password, confirmPassword, image } = req.body;
  const validation = schemaNewUser.validate(
    { name, email, password, confirmPassword, image },
    { abortEarly: false }
  );
  console.log(image);

  if (validation.error) {
    const errors = validation.error.details.map((err) => err.message);
    res.status(406).send(errors);
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).send("The password must be equal to password confirmation");
    return;
  }

  req.newUser = { name, email, password, confirmPassword, image };
  next();
}
