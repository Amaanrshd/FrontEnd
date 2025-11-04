const express = require('express');
const multer = require('multer');
const { addAttachment, getAttachments, deleteAttachment } = require('../models/attachmentModel');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/:task_id', upload.single('file'), async (req, res) => {
  try {
    const { task_id } = req.params;
    const url = req.file.path;
    const filename = req.file.originalname;
    const uploaded_by = req.body.uploaded_by;
    const id = await addAttachment(req.db, { task_id, filename, url, uploaded_by });
    res.status(201).json({ message: 'Attachment uploaded', id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:task_id', async (req, res) => {
  try {
    const files = await getAttachments(req.db, req.params.task_id);
    res.json(files);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const del = await deleteAttachment(req.db, req.params.id);
    res.json({ message: 'Attachment deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
