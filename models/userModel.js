const bcrypt = require('bcryptjs');

const createUser = async (db, name, email, password, role) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const [result] = await db.promise().query(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [name, email, passwordHash, role]
  );
  return result.insertId;
};

const findUserByEmail = async (db, email) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0];
};

module.exports = { createUser, findUserByEmail };
