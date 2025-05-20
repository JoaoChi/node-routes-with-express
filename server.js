// import { createServer } from 'node:http';
// const server = createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello World!\n');
// });

// server.listen(3000, '127.0.0.1', () => {
//   console.log('Listening on 127.0.0.1:3000');
// });

import express from 'express';
import router from './src/routers/index.js';

const app = express();
const port = 3000;

// Middleware para processar JSON
app.use(express.json());

// Registra todas as rotas da aplicação
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('API de Clientes - Bem-vindo!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});