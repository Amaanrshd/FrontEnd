const addLog = async (db, { project_id, type, message, user_id }) => {
  const [result] = await db.promise().query(
    'INSERT INTO activity_log (project_id, type, message, user_id) VALUES (?, ?, ?, ?)',
    [project_id, type, message, user_id]
  );
  return result.insertId;
};

const getLogs = async (db, project_id) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM activity_log WHERE project_id = ? ORDER BY created_at DESC', [project_id]
  );
  return rows;
};

module.exports = { addLog, getLogs };
