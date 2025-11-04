const express = require('express');
const { addDependency, getDependencies, removeDependency } = require('../models/taskDependencyModel');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const id = await addDependency(req.db, req.body);
    res.status(201).json({ message: 'Dependency added', id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:task_id', async (req, res) => {
  try {
    const deps = await getDependencies(req.db, req.params.task_id);
    res.json(deps);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const removed = await removeDependency(req.db, req.params.id);
    res.json({ message: 'Dependency removed' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
