import { Router } from "express";
import { newUser, login } from "../controllers/userController.js";
import { newUserMiddleware } from "../middlewares/newUserMiddleware.js";

const route = Router();

route.post("/sign-up", newUserMiddleware, newUser);
route.post("/sign-in", login);

export default route;
