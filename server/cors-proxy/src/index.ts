import express from 'express';
const app = express();

// Disable CORS
import cors from 'cors';
app.use(cors());
app.options('*', cors());

// Root route forwards all requests to gateway container
app.use('/', function(req,res) {
  console.log(req.originalUrl);
  res.send('proxy hello!');
});

// Listen on port
const port = 3000;
app.listen(port, () => {
  console.log(`cors-proxy listening on port ${port}`);
});
