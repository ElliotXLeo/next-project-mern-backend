import cors from 'cors';
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

const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Error de Cors'));
    }
  }
}

app.use(cors(corsOptions));

app.use('/api/users', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/tasks', taskRouter);

const PORT = process.env.PORT || 4000;

const serverNode = app.listen(PORT, () => {
  console.log(`Servidor corriendo desde el puerto ${PORT}`);
});

import { Server } from 'socket.io';
const serverIo = new Server(serverNode, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL
  }
});

serverIo.on('connection', (socket) => {
  socket.on('project', (id) => {
    socket.join(id);
  });

  socket.on('createTask', (task) => {
    socket.to(task.project).emit('taskCreated', task);
  });

  socket.on('updateTask', (task) => {
    socket.to(task.project._id).emit('updatedTask', task);
  });
});