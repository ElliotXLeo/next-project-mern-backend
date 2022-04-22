import { Router } from "express";
const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.json({
    message: 'OK',
    endpoint: '/api/users'
  });
});

export default userRouter;