import express from 'express';
import db from './config/db.js';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';

const app = express();
app.use(express.json());
dotenv.config();
db();

// Routing
app.use('/api/users', userRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo desde el puerto ${PORT}`);
});