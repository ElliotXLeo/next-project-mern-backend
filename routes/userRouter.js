import { Router } from "express";
import { recoverPassword, recoverPasswordToken, userAuthenticate, userConfirm, userCreate } from "../controllers/userController.js";
const userRouter = Router();

userRouter.post('/', userCreate);
userRouter.post('/login', userAuthenticate);
userRouter.get('/confirm/:token', userConfirm);
userRouter.post('/recover-password', recoverPassword);
userRouter.get('/recover-password/:token', recoverPasswordToken);

export default userRouter;