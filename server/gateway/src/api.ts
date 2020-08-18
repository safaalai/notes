import express from 'express';
import * as data from './data';
export const router = express.Router();

router.get('/list', (req,res) => {
  res.json(data.getList());
});

router.get('/note/:id', (req,res) => {
  try {
    res.json(data.getNote(req.params.id));
  } catch(error) {
    res.status(404).send(req.params.id);
  }
});

router.post('/note/add', (req,res) => {
  const id = data.addNote();
  res.status(201).send(id);
});

router.put('/note/save/:id', (req,res) => {
  res.send('save note:'+req.params.id);
});

router.delete('/note/:id', (req,res) => {
  try {
    const id = data.deleteNote(req.params.id);
    res.send(id);  
  } catch {
    res.status(404).send(req.params.id);
  }
});
