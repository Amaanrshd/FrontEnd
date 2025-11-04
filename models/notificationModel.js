// SQL setup:
// CREATE TABLE notifications (id INT PRIMARY KEY AUTO_INCREMENT, user_id INT, type VARCHAR(50), message TEXT, is_read BOOL DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY(user_id) REFERENCES users(id));

const addNotification = async (db, { user_id, type, message }) => {
  const [result] = await db.promise().query(
    'INSERT INTO notifications (user_id, type, message) VALUES (?, ?, ?)',
    [user_id, type, message]
  );
  return result.insertId;
};

const getNotifications = async (db, user_id) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM notifications WHERE user_id = ?', [user_id]
  );
  return rows;
};

const markRead = async (db, id) => {
  const [result] = await db.promise().query('UPDATE notifications SET is_read=1 WHERE id=?', [id]);
  return result.affectedRows;
};

module.exports = { addNotification, getNotifications, markRead };
