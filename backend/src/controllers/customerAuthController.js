const pool = require("../config/db");
const { generateToken } = require("../utils/jwt");
const { v4: uuidv4 } = require("uuid"); // ✅ REQUIRED

exports.customerLogin = async (req, res) => {
  const { name, phone, address } = req.body;

  try {
    // Check existing customer
    let result = await pool.query(
      `SELECT * FROM customers WHERE phone = $1`,
      [phone]
    );

    let customer;

    if (result.rows.length === 0) {
      // ✅ FIX: provide customer_id
      const insert = await pool.query(
        `INSERT INTO customers (customer_id, name, phone, address)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [uuidv4(), name, phone, address]
      );
      customer = insert.rows[0];
    } else {
      customer = result.rows[0];
    }

    const token = generateToken({
      customerId: customer.customer_id,
      role: "CUSTOMER",
    });

    res.json({
      token,
      role: "CUSTOMER",
      name: customer.name,
    });
  } catch (err) {
    console.error("CUSTOMER LOGIN ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};
