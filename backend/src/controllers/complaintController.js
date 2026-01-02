const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// CREATE COMPLAINT
exports.createComplaint = async (req, res) => {
  const { complaintType, description } = req.body;
  const customerId = req.user.customerId;

  if (!customerId) {
    return res.status(400).json({
      error: "Customer ID missing in token. Please login again.",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO complaints
       (complaint_id, customer_id, complaint_type, description, status)
       VALUES ($1, $2, $3, $4, 'REGISTERED')
       RETURNING *`,
      [uuidv4(), customerId, complaintType, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("CREATE COMPLAINT ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// GET MY COMPLAINTS
exports.getMyComplaints = async (req, res) => {
  const customerId = req.user.customerId;

  try {
    const result = await pool.query(
      `SELECT complaint_id, complaint_type, status, created_at
       FROM complaints
       WHERE customer_id = $1
       ORDER BY created_at DESC`,
      [customerId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("GET MY COMPLAINTS ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// GET COMPLAINT BY ID
exports.getComplaintById = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM complaints WHERE complaint_id = $1`,
      [req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("GET COMPLAINT ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// GET STATUS HISTORY
exports.getStatusHistory = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT status, updated_at
       FROM complaint_status_history
       WHERE complaint_id = $1
       ORDER BY updated_at ASC`,
      [req.params.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("GET STATUS HISTORY ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};
