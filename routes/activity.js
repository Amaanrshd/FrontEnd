const express = require('express');
const { addLog, getLogs } = require('../models/activityLogModel');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const id = await addLog(req.db, req.body);
    res.status(201).json({ message: 'Activity logged', id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:project_id', async (req, res) => {
  try {
    const logs = await getLogs(req.db, req.params.project_id);
    res.json(logs);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
