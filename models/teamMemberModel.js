const addTeamMember = async (db, team_id, user_id) => {
  const [result] = await db.promise().query(
    'INSERT INTO team_members (team_id, user_id) VALUES (?, ?)',
    [team_id, user_id]
  );
  return result.insertId;
};

const getTeamMembers = async (db, team_id) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM team_members WHERE team_id = ?',
    [team_id]
  );
  return rows;
};

const removeTeamMember = async (db, team_id, user_id) => {
  const [result] = await db.promise().query(
    'DELETE FROM team_members WHERE team_id = ? AND user_id = ?',
    [team_id, user_id]
  );
  return result.affectedRows;
};

module.exports = { addTeamMember, getTeamMembers, removeTeamMember };
