import express from 'express';
import database from './config/database.js';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';
import projectRouter from './routes/projectRouter.js';
import taskRouter from './routes/taskRouter.js';

const app = express();
app.use(express.json());
dotenv.config();
database();

app.use('/api/users', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/tasks', taskRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo desde el puerto ${PORT}`);
});