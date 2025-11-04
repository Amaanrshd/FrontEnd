const express = require('express');
const { addComment, getComments, deleteComment } = require('../models/commentModel');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const id = await addComment(req.db, req.body);
    res.status(201).json({ message: 'Comment added', id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:task_id', async (req, res) => {
  try {
    const comments = await getComments(req.db, req.params.task_id);
    res.json(comments);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteComment(req.db, req.params.id);
    res.json({ message: 'Comment deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
