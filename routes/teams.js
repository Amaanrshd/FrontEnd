const express = require('express');
const { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam } = require('../models/teamModel');

const router = express.Router();

// Create Team
router.post('/', async (req, res) => {
  const { name, project_id } = req.body;
  if (!name || !project_id) return res.status(400).json({ error: 'Name and project_id required' });
  try {
    const teamId = await createTeam(req.db, name, project_id);
    res.status(201).json({ message: 'Team created', teamId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Team creation failed' });
  }
});

// Get All Teams
router.get('/', async (req, res) => {
  try {
    const teams = await getAllTeams(req.db);
    res.json(teams);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Fetch failed' });
  }
});

// Get Team by ID
router.get('/:id', async (req, res) => {
  try {
    const team = await getTeamById(req.db, req.params.id);
    if (!team) return res.status(404).json({ error: 'Team not found' });
    res.json(team);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Fetch failed' });
  }
});

// Update Team
router.put('/:id', async (req, res) => {
  const { name } = req.body;
  try {
    const changes = await updateTeam(req.db, req.params.id, name);
    if (!changes) return res.status(404).json({ error: 'Team not found' });
    res.json({ message: 'Team updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Update failed' });
  }
});

// Delete Team
router.delete('/:id', async (req, res) => {
  try {
    const changes = await deleteTeam(req.db, req.params.id);
    if (!changes) return res.status(404).json({ error: 'Team not found' });
    res.json({ message: 'Team deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Delete failed' });
  }
});

module.exports = router;
