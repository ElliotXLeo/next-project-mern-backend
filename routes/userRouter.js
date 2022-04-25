import { Router } from "express";
import { newPasswordToken, userProfile, recoverPassword, recoverPasswordToken, userAuthenticate, userConfirm, userCreate } from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";
const userRouter = Router();

userRouter.post('/', userCreate);
userRouter.post('/login', userAuthenticate);
userRouter.get('/confirm/:token', userConfirm);
userRouter.post('/recover-password', recoverPassword);
userRouter.route('/recover-password/:token').get(recoverPasswordToken).post(newPasswordToken);

userRouter.get('/perfil', checkAuth, userProfile);

export default userRouter;