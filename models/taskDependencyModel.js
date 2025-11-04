const addDependency = async (db, { task_id, depends_on_task_id }) => {
  const [result] = await db.promise().query(
    'INSERT INTO task_dependencies (task_id, depends_on_task_id) VALUES (?, ?)',
    [task_id, depends_on_task_id]
  );
  return result.insertId;
};

const getDependencies = async (db, task_id) => {
  const [rows] = await db.promise().query(
    'SELECT depends_on_task_id FROM task_dependencies WHERE task_id=?', [task_id]
  );
  return rows;
};

const removeDependency = async (db, id) => {
  const [result] = await db.promise().query('DELETE FROM task_dependencies WHERE id=?', [id]);
  return result.affectedRows;
};

module.exports = { addDependency, getDependencies, removeDependency };
