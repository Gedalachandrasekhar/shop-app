const pool = require("../config/db");
const STATUS = require("../constants/complaintStatus");

// UPDATE STATUS (Employee / Manager / Admin)
exports.updateStatus = async (req, res) => {
  const { complaintId } = req.params;
  const { status } = req.body;
  const userId = req.user.userId || req.user.customerId;

  try {
    // Role check
    if (!["EMPLOYEE", "MANAGER", "ADMIN"].includes(req.user.role)) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Update main complaint
    await pool.query(
      `UPDATE complaints
       SET status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE complaint_id = $2`,
      [status, complaintId]
    );

    // Insert status history
    await pool.query(
      `INSERT INTO complaint_status_history
       (complaint_id, status, updated_by)
       VALUES ($1, $2, $3)`,
      [complaintId, status, userId]
    );

    res.json({ message: "Status updated successfully" });
  } catch (err) {
    console.error("UPDATE STATUS ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET STATUS HISTORY (THIS WAS MISSING)
exports.getStatusHistory = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT status, updated_at
       FROM complaint_status_history
       WHERE complaint_id = $1
       ORDER BY updated_at ASC`,
      [id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("GET STATUS HISTORY ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};
