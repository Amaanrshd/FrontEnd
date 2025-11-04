const express = require('express');
const {
  getProjectProgress,
  getOverdueTasks,
  getTeamProductivity,
  getBurndownData,
  getEffortSummary
} = require('../models/analyticsModel');

const router = express.Router();

// Project progress (% done)
router.get('/progress/:project_id', async (req, res) => {
  try {
    const progress = await getProjectProgress(req.db, req.params.project_id);
    res.json(progress);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Overdue tasks summary
router.get('/overdue/:project_id', async (req, res) => {
  try {
    const overdue = await getOverdueTasks(req.db, req.params.project_id);
    res.json(overdue);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Team productivity stats
router.get('/teamproductivity/:project_id', async (req, res) => {
  try {
    const stats = await getTeamProductivity(req.db, req.params.project_id);
    res.json(stats);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Burndown chart data
router.get('/burndown/:project_id', async (req, res) => {
  try {
    const burndown = await getBurndownData(req.db, req.params.project_id);
    res.json(burndown);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Effort summary per user
router.get('/effort/:project_id', async (req, res) => {
  try {
    const summary = await getEffortSummary(req.db, req.params.project_id);
    res.json(summary);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
