import express from 'express';

const app = express();

app.listen(4000, () => {
  console.log('Servidor corriendo desde el puerto 4000');
});