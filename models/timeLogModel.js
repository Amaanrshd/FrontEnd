// SQL setup:
// CREATE TABLE time_logged (id INT PRIMARY KEY AUTO_INCREMENT, task_id INT, user_id INT, date DATE, hours FLOAT, FOREIGN KEY (task_id) REFERENCES tasks(id), FOREIGN KEY (user_id) REFERENCES users(id));

const addTimeLog = async (db, { task_id, user_id, date, hours }) => {
  const [result] = await db.promise().query(
    'INSERT INTO time_logged (task_id, user_id, date, hours) VALUES (?, ?, ?, ?)',
    [task_id, user_id, date, hours]
  );
  return result.insertId;
};

const getTimeLogs = async (db, task_id) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM time_logged WHERE task_id = ?', [task_id]
  );
  return rows;
};

const getUserTimeLogs = async (db, user_id) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM time_logged WHERE user_id = ?', [user_id]
  );
  return rows;
};

module.exports = { addTimeLog, getTimeLogs, getUserTimeLogs };
