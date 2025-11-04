const express = require('express');
const {
  createTask, getTasks, getTask, updateTask, deleteTask, assignUsersToTask, getAssigneesForTask
} = require('../models/taskModel');

const router = express.Router();

// Create new task
router.post('/', async (req, res) => {
  try {
    const id = await createTask(req.db, req.body);
    res.status(201).json({ message: 'Task created', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Task creation failed' });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await getTasks(req.db);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Fetch failed' });
  }
});

// Get one task
router.get('/:id', async (req, res) => {
  try {
    const task = await getTask(req.db, req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Fetch failed' });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const changes = await updateTask(req.db, req.params.id, req.body);
    if (!changes) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task updated' });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Update failed' });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteTask(req.db, req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Delete failed' });
  }
});

// Assign users to task
router.post('/:id/assign', async (req, res) => {
  try {
    if (!Array.isArray(req.body.user_ids)) {
      return res.status(400).json({ error: 'user_ids must be an array' });
    }
    await assignUsersToTask(req.db, req.params.id, req.body.user_ids);
    res.json({ message: 'Users assigned to task' });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Assignment failed' });
  }
});

// Get task assignees
router.get('/:id/assignees', async (req, res) => {
  try {
    const assignees = await getAssigneesForTask(req.db, req.params.id);
    res.json(assignees);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Fetch assignees failed' });
  }
});

module.exports = router;
