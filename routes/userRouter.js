import { Router } from "express";
import { userProfile, userAuthenticate, userConfirm, userRegister, userRecoverPassword, userRecoverPasswordToken, userNewPasswordToken } from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";
const userRouter = Router();

userRouter.post('/', userRegister);
userRouter.post('/login', userAuthenticate);
userRouter.get('/confirm/:token', userConfirm);
userRouter.post('/recover-password', userRecoverPassword);
userRouter.route('/recover-password/:token')
  .get(userRecoverPasswordToken)
  .post(userNewPasswordToken);

userRouter.get('/perfil', checkAuth, userProfile);

export default userRouter;