import { Router } from "express";
import { newUser, login } from "../controllers/userController.js";
import { validateSchemaNewUser } from "../middlewares/newUserMiddleware.js";

const route = Router();

route.post("/sign-up", validateSchemaNewUser, newUser);
route.post("/sign-in", login);

export default route;
