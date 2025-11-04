const createMilestone = async (db, { name, project_id, due_date }) => {
  const [result] = await db.promise().query(
    'INSERT INTO milestones (name, project_id, due_date) VALUES (?, ?, ?)',
    [name, project_id, due_date]
  );
  return result.insertId;
};

const getMilestones = async (db, project_id) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM milestones WHERE project_id = ?', [project_id]
  );
  return rows;
};

const updateMilestone = async (db, id, { name, due_date, completed }) => {
  const [result] = await db.promise().query(
    'UPDATE milestones SET name=?, due_date=?, completed=? WHERE id=?',
    [name, due_date, completed, id]
  );
  return result.affectedRows;
};

const deleteMilestone = async (db, id) => {
  const [result] = await db.promise().query('DELETE FROM milestones WHERE id=?', [id]);
  return result.affectedRows;
};

module.exports = { createMilestone, getMilestones, updateMilestone, deleteMilestone };
