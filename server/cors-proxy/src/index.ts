import express from 'express';
const app = express();

const gatewayAddress =
  'http://' + process.env.GATEWAY + ':' + process.env.GATEWAY_PORT;

// Disable CORS
import cors from 'cors';
app.use(cors());
app.options('*', cors());

// Root route forwards all requests to gateway container
import proxy from 'express-http-proxy';
app.use('/', proxy(gatewayAddress));

// Listen on port
const port = 3000;
app.listen(port, () => {
  console.log(`cors-proxy listening on port ${port}`);
  console.log(`gateway address: ${gatewayAddress}`);
});
