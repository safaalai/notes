/** Main application router for gateway */
import express from 'express';
const app = express();

app.get('/', (req,res) => {
  console.log('get /');
  res.send('Hello World!');
});

const port = process.env.port || 8080;
app.listen(port, () => {
  console.log(`gateway is listening on port ${port}!`);
});
