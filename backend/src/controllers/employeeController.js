const pool = require("../config/db");

exports.getAssignedComplaints = async (req, res) => {
  const employeeId = req.user.userId;

  try {
    const result = await pool.query(
      `SELECT complaint_id,
              complaint_type,
              description,
              status,
              created_at
       FROM complaints
       WHERE assigned_employee_id = $1
       ORDER BY created_at DESC`,
      [employeeId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("EMPLOYEE DASHBOARD ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};
