import { Router } from "express";
import { userAuthenticate, userCreate } from "../controllers/userController.js";
const userRouter = Router();

userRouter.post('/', userCreate);
userRouter.post('/login', userAuthenticate);

export default userRouter;