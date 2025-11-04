const createTask = async (db, { title, description, priority, category, status, project_id, workflow_state, due_date }) => {
  const [result] = await db.promise().query(
    'INSERT INTO tasks (title, description, priority, category, status, project_id, workflow_state, due_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [title, description, priority, category, status, project_id, workflow_state, due_date]
  );
  return result.insertId;
};


const getTasks = async (db) => {
  const [rows] = await db.promise().query('SELECT * FROM tasks');
  return rows;
};

const getTask = async (db, id) => {
  const [rows] = await db.promise().query('SELECT * FROM tasks WHERE id = ?', [id]);
  return rows[0];
};

const updateTask = async (db, id, data) => {
  const { title, description, priority, category, status, project_id } = data;
  const [result] = await db.promise().query(
    'UPDATE tasks SET title=?, description=?, priority=?, category=?, status=?, project_id=? WHERE id=?',
    [title, description, priority, category, status, project_id, id]
  );
  return result.affectedRows;
};

const deleteTask = async (db, id) => {
  const [result] = await db.promise().query('DELETE FROM tasks WHERE id=?', [id]);
  return result.affectedRows;
};

// Assignee handling
const assignUsersToTask = async (db, task_id, user_ids) => {
  const promises = user_ids.map(user_id =>
    db.promise().query(
      'INSERT IGNORE INTO task_assignees (task_id, user_id) VALUES (?, ?)', [task_id, user_id]
    )
  );
  await Promise.all(promises);
  return true;
};

const getAssigneesForTask = async (db, task_id) => {
  const [rows] = await db.promise().query(
    `SELECT users.* FROM users
     JOIN task_assignees ON users.id = task_assignees.user_id
     WHERE task_assignees.task_id = ?`, [task_id]
  );
  return rows;
};

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask, assignUsersToTask, getAssigneesForTask };
