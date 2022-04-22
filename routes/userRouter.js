import { Router } from "express";
import { userCreate } from "../controllers/userController.js";
const userRouter = Router();

userRouter.post('/', userCreate);

export default userRouter;