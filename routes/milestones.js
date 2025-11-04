const express = require('express');
const { createMilestone, getMilestones, updateMilestone, deleteMilestone } = require('../models/milestoneModel');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const id = await createMilestone(req.db, req.body);
    res.status(201).json({ message: 'Milestone created', id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:project_id', async (req, res) => {
  try {
    const milestones = await getMilestones(req.db, req.params.project_id);
    res.json(milestones);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const changes = await updateMilestone(req.db, req.params.id, req.body);
    res.json({ message: 'Milestone updated' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteMilestone(req.db, req.params.id);
    res.json({ message: 'Milestone deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
