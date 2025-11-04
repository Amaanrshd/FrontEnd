// SQL setup:
// CREATE TABLE attachments (id INT PRIMARY KEY AUTO_INCREMENT, task_id INT, filename VARCHAR(255), url VARCHAR(255), uploaded_by INT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(task_id) REFERENCES tasks(id));

const addAttachment = async (db, { task_id, filename, url, uploaded_by }) => {
  const [result] = await db.promise().query(
    'INSERT INTO attachments (task_id, filename, url, uploaded_by) VALUES (?, ?, ?, ?)',
    [task_id, filename, url, uploaded_by]
  );
  return result.insertId;
};

const getAttachments = async (db, task_id) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM attachments WHERE task_id = ?', [task_id]
  );
  return rows;
};

const deleteAttachment = async (db, id) => {
  const [result] = await db.promise().query('DELETE FROM attachments WHERE id=?', [id]);
  return result.affectedRows;
};

module.exports = { addAttachment, getAttachments, deleteAttachment };
