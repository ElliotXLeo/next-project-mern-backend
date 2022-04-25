import { Router } from "express";
import { newPasswordToken, recoverPassword, recoverPasswordToken, userAuthenticate, userConfirm, userCreate } from "../controllers/userController.js";
const userRouter = Router();

userRouter.post('/', userCreate);
userRouter.post('/login', userAuthenticate);
userRouter.get('/confirm/:token', userConfirm);
userRouter.post('/recover-password', recoverPassword);
userRouter.route('/recover-password/:token').get(recoverPasswordToken).post(newPasswordToken);

export default userRouter;