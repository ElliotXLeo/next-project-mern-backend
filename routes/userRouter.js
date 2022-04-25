import { Router } from "express";
import { userAuthenticate, userConfirm, userCreate } from "../controllers/userController.js";
const userRouter = Router();

userRouter.post('/', userCreate);
userRouter.post('/login', userAuthenticate);
userRouter.get('/confirm/:token', userConfirm);

export default userRouter;