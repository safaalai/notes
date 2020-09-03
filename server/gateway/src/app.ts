/** Main application router for gateway */
import express from 'express';
import cors from 'cors';
export const app = express();

app.use(express.json());

// Default path serves web pages
app.use(express.static('dist/www'));

app.use(cors());
app.options('*', cors());

import * as api from './api';
app.use('/api', api.router);
