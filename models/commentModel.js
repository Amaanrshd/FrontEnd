const addComment = async (db, { task_id, user_id, parent_id, text }) => {
  const [result] = await db.promise().query(
    'INSERT INTO comments (task_id, user_id, parent_id, text) VALUES (?, ?, ?, ?)',
    [task_id, user_id, parent_id, text]
  );
  return result.insertId;
};

const getComments = async (db, task_id) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM comments WHERE task_id=? ORDER BY created_at', [task_id]
  );
  return rows;
};

const deleteComment = async (db, id) => {
  const [result] = await db.promise().query('DELETE FROM comments WHERE id=?', [id]);
  return result.affectedRows;
};

module.exports = { addComment, getComments, deleteComment };
