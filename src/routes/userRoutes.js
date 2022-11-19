import { Router } from "express";
import { newUser, login } from "../controllers/userController.js";
import { newUserMiddleware } from "../middlewares/newUserMiddleware.js";
import { authUser } from "../middlewares/authMiddleware.js";
import { updateUser } from "../controllers/userController.js";

const route = Router();

route.post("/sign-up", newUserMiddleware, newUser);
route.post("/sign-in", login);
route.put("/user", authUser, updateUser);

export default route;
