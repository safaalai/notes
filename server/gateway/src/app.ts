/** Main application router for gateway */
import express from 'express';
export const app = express();

app.use(express.json());

// Default path serves web pages
app.use(express.static('dist/www'));

import * as api from './api';
app.use('/api', api.router);
