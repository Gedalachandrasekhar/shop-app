const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

exports.usePart = async (req, res) => {
  const { complaintId } = req.params;
  const { partId, quantity } = req.body;
  const employeeId = req.user.userId;

  try {
    // Check stock
    const stock = await pool.query(
      `SELECT quantity FROM inventory WHERE part_id = $1`,
      [partId]
    );

    if (stock.rows[0].quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    // Deduct stock
    await pool.query(
      `UPDATE inventory SET quantity = quantity - $1 WHERE part_id = $2`,
      [quantity, partId]
    );

    // Log usage
    await pool.query(
      `INSERT INTO complaint_parts
       (usage_id, complaint_id, part_id, quantity_used, used_by)
       VALUES ($1, $2, $3, $4, $5)`,
      [uuidv4(), complaintId, partId, quantity, employeeId]
    );

    res.json({ message: "Part used successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
