const pool = require("../config/db");
const STATUS = require("../constants/complaintStatus");

exports.updateStatus = async (req, res) => {
  const { complaintId } = req.params;
  const { status } = req.body;
  const userId = req.user.userId || req.user.customerId;

  try {
    // Update main complaint table
    await pool.query(
      `UPDATE complaints
       SET status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE complaint_id = $2`,
      [status, complaintId]
    );

    // Insert history
    await pool.query(
      `INSERT INTO complaint_status_history
       (complaint_id, status, updated_by)
       VALUES ($1, $2, $3)`,
      [complaintId, status, userId]
    );

    res.json({ message: "Status updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
