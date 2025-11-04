const getProjectProgress = async (db, project_id) => {
  const [all] = await db.promise().query(
    'SELECT COUNT(*) AS total FROM tasks WHERE project_id = ?', [project_id]
  );
  const [done] = await db.promise().query(
    'SELECT COUNT(*) AS completed FROM tasks WHERE project_id = ? AND status = "done"', [project_id]
  );
  return {
    total: all[0].total,
    completed: done[0].completed,
    percent: all[0].total > 0 ? Math.round((done[0].completed / all[0].total) * 100) : 0
  };
};

// 1. Overdue tasks for a project
const getOverdueTasks = async (db, project_id) => {
  const [rows] = await db.promise().query(
    'SELECT * FROM tasks WHERE project_id = ? AND due_date < CURDATE() AND status != "done"', [project_id]
  );
  return rows;
};

// 2. Team member productivity
const getTeamProductivity = async (db, project_id) => {
  const [rows] = await db.promise().query(
    `SELECT a.user_id, u.name,
      COUNT(t.id) AS assigned,
      SUM(CASE WHEN t.status = "done" THEN 1 ELSE 0 END) AS completed
     FROM task_assignees a
     JOIN users u ON a.user_id = u.id
     JOIN tasks t ON a.task_id = t.id
     WHERE t.project_id = ?
     GROUP BY a.user_id, u.name`, [project_id]
  );
  return rows;
};

// 3. Burndown data for project (tasks closed per day)
const getBurndownData = async (db, project_id) => {
  const [rows] = await db.promise().query(
    `SELECT DATE(updated_at) AS day,
      COUNT(*) AS closed
     FROM tasks
     WHERE project_id = ? AND status = "done"
     GROUP BY day
     ORDER BY day`, [project_id]
  );
  return rows;
};

// 4. Effort log summary for project (total hours by user)
const getEffortSummary = async (db, project_id) => {
  const [rows] = await db.promise().query(
    `SELECT tl.user_id, u.name, SUM(tl.hours) AS total_hours
     FROM time_logged tl
     JOIN users u ON tl.user_id = u.id
     JOIN tasks t ON tl.task_id = t.id
     WHERE t.project_id = ?
     GROUP BY tl.user_id, u.name`, [project_id]
  );
  return rows;
};

module.exports = {
  getProjectProgress,
  getOverdueTasks,
  getTeamProductivity,
  getBurndownData,
  getEffortSummary
};