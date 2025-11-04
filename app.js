// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

// Setup DB connection
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'taskflow',
  waitForConnections: true,
  connectionLimit: 10,
});

// Middleware: inject db to every request
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Basic API status route
app.get('/', (req, res) => {
  res.json({ message: 'TaskFlow API running' });
});

// ROUTES: (import and use all required modules)
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

const projectRoutes = require('./routes/projects');
app.use('/projects', projectRoutes);

const teamRoutes = require('./routes/teams');
app.use('/teams', teamRoutes);

const teamMemberRoutes = require('./routes/teamMembers');
app.use('/team-members', teamMemberRoutes);

const taskRoutes = require('./routes/tasks');
app.use('/tasks', taskRoutes);

const milestoneRoutes = require('./routes/milestones');
app.use('/milestones', milestoneRoutes);

const dependencyRoutes = require('./routes/taskDependencies');
app.use('/dependencies', dependencyRoutes);

const commentRoutes = require('./routes/comments');
app.use('/comments', commentRoutes);

const attachmentRoutes = require('./routes/attachments');
app.use('/attachments', attachmentRoutes);

const activityRoutes = require('./routes/activity');
app.use('/activity', activityRoutes);

const notificationRoutes = require('./routes/notifications');
app.use('/notifications', notificationRoutes);

const timelogRoutes = require('./routes/timelogs');
app.use('/timelogs', timelogRoutes);

const analyticsRoutes = require('./routes/analytics');
app.use('/analytics', analyticsRoutes);

// 404 handler for missing routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
