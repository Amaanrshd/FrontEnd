
const createProject = async (db, name, description, created_by, parent_id) => {
  const [result] = await db.promise().query(
    'INSERT INTO projects (name, description, created_by, parent_id) VALUES (?, ?, ?, ?)',
    [name, description, created_by, parent_id]
  );
  return result.insertId;
};

const getAllProjects = async (db) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM projects'
  );
  return rows;
};

const getProjectById = async (db, id) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM projects WHERE id = ?',
    [id]
  );
  return rows[0];
};

const updateProject = async (db, id, name, description, parent_id) => {
  const [result] = await db.promise().query(
    'UPDATE projects SET name = ?, description = ?, parent_id = ? WHERE id = ?',
    [name, description, parent_id, id]
  );
  return result.affectedRows;
};

const deleteProject = async (db, id) => {
  const [result] = await db.promise().query(
    'DELETE FROM projects WHERE id = ?',
    [id]
  );
  return result.affectedRows;
};

module.exports = { createProject, getAllProjects, getProjectById, updateProject, deleteProject };
