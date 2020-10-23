import express from 'express';
import * as data from './data';
export const router = express.Router();

router.put('/reset', async (req,res) => {
  await data.reset();
  res.send('RESET OK');
});
