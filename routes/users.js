const express = require('express');
const bcrypt = require('bcryptjs');
const { createUser, findUserByEmail } = require('../models/userModel');

const router = express.Router();

// Registration endpoint
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role)
    return res.status(400).json({ error: 'All fields required' });
  try {
    const existing = await findUserByEmail(req.db, email);
    if (existing) return res.status(409).json({ error: 'Email already in use' });
    const userId = await createUser(req.db, name, email, password, role);
    res.status(201).json({ message: 'User registered', userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Registration failed' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'All fields required' });
  try {
    const user = await findUserByEmail(req.db, email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ message: 'Login successful', userId: user.id, name: user.name, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Login failed' });
  }
});

module.exports = router;
