import express from 'express';
export const router = express.Router();

router.get('/list', (req,res) => {
  res.send('list');
});

router.get('/note/:id', (req,res) => {
  res.send('note:'+req.params.id);
});

router.post('/note/add', (req,res) => {
  res.status(201).send('add new note');
});

router.put('/note/save/:id', (req,res) => {
  res.send('save note:'+req.params.id);
});

router.delete('/note/:id', (req,res) => {
  res.send('deleted note:'+req.params.id);
});
