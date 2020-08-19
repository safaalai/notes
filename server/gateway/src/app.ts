/** Main application router for gateway */
import express from 'express';
import cors from 'cors';
export const app = express();

app.use(express.json());

app.use(cors());
app.options('*', cors());

app.get('/', (req,res) => {
  console.log('get /');
  res.send('Hello World!');
});

import * as api from './api';
app.use('/api', api.router);
