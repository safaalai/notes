import express from 'express';
import * as data from './data';
export const router = express.Router();

router.put('/reset', (req,res) => {
  data.reset();
  res.send('RESET OK');
});
