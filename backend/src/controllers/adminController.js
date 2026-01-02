const pool = require("../config/db");

// 1. All complaints
exports.getAllComplaints = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.complaint_id,
              c.complaint_type,
              c.status,
              c.created_at,
              u.name AS customer_name,
              emp.name AS employee_name
       FROM complaints c
       LEFT JOIN customers u ON c.customer_id = u.customer_id
       LEFT JOIN users emp ON c.assigned_employee_id = emp.user_id
       ORDER BY c.created_at DESC`
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. All users
exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.user_id, u.name, u.phone, r.role_name, u.is_active
       FROM users u
       JOIN roles r ON u.role_id = r.role_id
       ORDER BY r.role_name`
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Inventory overview
exports.getInventoryOverview = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT part_name, category, quantity, unit_price
       FROM inventory
       ORDER BY part_name`
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
