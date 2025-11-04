const express = require('express');
const { addTeamMember, getTeamMembers, removeTeamMember } = require('../models/teamMemberModel');
const router = express.Router();
router.get('/test', (req, res) => res.send('TeamMembers route active'));


// Add a user to a team
router.post('/', async (req, res) => {
  const { team_id, user_id } = req.body;
  if (!team_id || !user_id) return res.status(400).json({ error: 'team_id and user_id required' });
  try {
    const id = await addTeamMember(req.db, team_id, user_id);
    res.status(201).json({ message: 'Member added to team', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Add member failed' });
  }
});


// Get all members of a team
router.get('/:team_id', async (req, res) => {
  try {
    const members = await getTeamMembers(req.db, req.params.team_id);
    res.json(members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Fetch failed' });
  }
});

// Remove a user from a team
router.delete('/', async (req, res) => {
  const { team_id, user_id } = req.body;
  if (!team_id || !user_id) return res.status(400).json({ error: 'team_id and user_id required' });
  try {
    const changes = await removeTeamMember(req.db, team_id, user_id);
    if (!changes) return res.status(404).json({ error: 'Member not found in team' });
    res.json({ message: 'Member removed from team' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Remove member failed' });
  }
});

module.exports = router;
