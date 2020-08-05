/** Main application router for gateway */
import {app} from './app';

const port = process.env.port || 8080;
app.listen(port, () => {
  console.log(`gateway is listening on port ${port}!`);
});
