const pool = require("../config/db");

// Get complaints not assigned yet
exports.getUnassignedComplaints = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT complaint_id, complaint_type, description, status, created_at
       FROM complaints
       WHERE assigned_employee_id IS NULL
       ORDER BY created_at DESC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("GET UNASSIGNED ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};
// Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.user_id, u.name
       FROM users u
       JOIN roles r ON u.role_id = r.role_id
       WHERE r.role_name = 'EMPLOYEE' AND u.is_active = true`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("GET EMPLOYEES ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};
// Assign complaint to employee
exports.assignComplaint = async (req, res) => {
  if (!checkManagerAccess(req, res)) return;

  const { complaintId } = req.params;
  const { employeeId } = req.body;

  if (!employeeId) {
    return res.status(400).json({ message: "Employee ID required" });
  }

  if (!["MANAGER", "ADMIN"].includes(req.user.role)) {
  return res.status(403).json({ message: "Unauthorized" });
}

  try {
    // Check employee exists
    const emp = await pool.query(
      `SELECT user_id FROM users WHERE user_id = $1 AND is_active = true`,
      [employeeId]
    );

    if (emp.rows.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Assign only if unassigned
    const result = await pool.query(
      `UPDATE complaints
       SET assigned_employee_id = $1,
           status = 'ASSIGNED',
           updated_at = CURRENT_TIMESTAMP
       WHERE complaint_id = $2
         AND assigned_employee_id IS NULL
       RETURNING *`,
      [employeeId, complaintId]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "Complaint already assigned or not found",
      });
    }

    res.json({ message: "Complaint assigned successfully" });
  } catch (err) {
    console.error("ASSIGN ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};
