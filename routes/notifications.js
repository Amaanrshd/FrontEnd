const express = require('express');
const { addNotification, getNotifications, markRead } = require('../models/notificationModel');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const id = await addNotification(req.db, req.body);
    res.status(201).json({ message: 'Notification sent', id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:user_id', async (req, res) => {
  try {
    const notifications = await getNotifications(req.db, req.params.user_id);
    res.json(notifications);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.patch('/:id/read', async (req, res) => {
  try {
    const changed = await markRead(req.db, req.params.id);
    res.json({ message: 'Notification marked read' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
