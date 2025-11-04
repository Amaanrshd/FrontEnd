const createTeam = async (db, name, project_id) => {
  const [result] = await db.promise().query(
    'INSERT INTO teams (name, project_id) VALUES (?, ?)',
    [name, project_id]
  );
  return result.insertId;
};

const getAllTeams = async (db) => {
  const [rows] = await db.promise().query('SELECT * FROM teams');
  return rows;
};

const getTeamById = async (db, id) => {
  const [rows] = await db.promise().query('SELECT * FROM teams WHERE id = ?', [id]);
  return rows[0];
};

const updateTeam = async (db, id, name) => {
  const [result] = await db.promise().query(
    'UPDATE teams SET name = ? WHERE id = ?',
    [name, id]
  );
  return result.affectedRows;
};

const deleteTeam = async (db, id) => {
  const [result] = await db.promise().query('DELETE FROM teams WHERE id = ?', [id]);
  return result.affectedRows;
};

module.exports = { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam };
