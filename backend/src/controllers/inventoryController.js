const pool = require("../config/db");
const { v4: uuidv4 } = require("uuid");

// Add inventory (Admin / Manager)
exports.addInventory = async (req, res) => {
  const { part_name, category, quantity, unit_price } = req.body;

  try {
    await pool.query(
      `INSERT INTO inventory
       (part_id, part_name, category, quantity, unit_price)
       VALUES ($1, $2, $3, $4, $5)`,
      [uuidv4(), part_name, category, quantity, unit_price]
    );

    res.json({ message: "Inventory added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get inventory list
exports.getInventory = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM inventory ORDER BY part_name`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
