/** Main application router for gateway */
import express from 'express';
export const app = express();

app.get('/', (req,res) => {
  console.log('get /');
  res.send('Hello World!');
});
