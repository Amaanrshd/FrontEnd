const express = require('express');
const { createProject, getAllProjects, getProjectById, updateProject, deleteProject } = require('../models/projectModel');

const router = express.Router();

// Create Project
router.post('/', async (req, res) => {
  const { name, description, created_by, parent_id } = req.body;
  if (!name || !created_by) return res.status(400).json({ error: 'Name and created_by required' });
  try {
    const projectId = await createProject(req.db, name, description || '', created_by, parent_id || null);
    res.status(201).json({ message: 'Project created', projectId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Project creation failed' });
  }
});

// Get All Projects
router.get('/', async (req, res) => {
  try {
    const projects = await getAllProjects(req.db);
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Fetch failed' });
  }
});

// Get Project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await getProjectById(req.db, req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Fetch failed' });
  }
});

// Update Project
router.put('/:id', async (req, res) => {
  const { name, description, parent_id } = req.body;
  try {
    const changes = await updateProject(req.db, req.params.id, name, description, parent_id);
    if (!changes) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Update failed' });
  }
});

// Delete Project
router.delete('/:id', async (req, res) => {
  try {
    const changes = await deleteProject(req.db, req.params.id);
    if (!changes) return res.status(404).json({ error: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Delete failed' });
  }
});

module.exports = router;
