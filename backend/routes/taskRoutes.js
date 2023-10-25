
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');


router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find(); 
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/tasks', async (req, res) => {
  const { title } = req.body;
  const task = new Task({ title });

  try {
    const newTask = await task.save(); 
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.put('/tasks/:id', async (req, res) => {
  const { title, description } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete('/tasks/all', async (req, res) => {
  try {
    await Task.deleteMany({}); 
    res.sendStatus(204); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id); 
    res.sendStatus(204); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
