import express from 'express';
import creador from './creador.js';

const app = express();

app.listen(4000, () => {
  console.log('Creador', creador);
  console.log('Servidor corriendo desde el puerto 4000');
});