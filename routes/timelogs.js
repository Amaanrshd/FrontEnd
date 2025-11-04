const express = require('express');
const { addTimeLog, getTimeLogs, getUserTimeLogs } = require('../models/timeLogModel');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const id = await addTimeLog(req.db, req.body);
    res.status(201).json({ message: 'Time logged', id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/task/:task_id', async (req, res) => {
  try {
    const logs = await getTimeLogs(req.db, req.params.task_id);
    res.json(logs);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/user/:user_id', async (req, res) => {
  try {
    const logs = await getUserTimeLogs(req.db, req.params.user_id);
    res.json(logs);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
