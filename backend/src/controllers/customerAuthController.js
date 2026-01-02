const pool = require("../config/db");
const { generateToken } = require("../utils/jwt");

exports.customerLogin = async (req, res) => {
  const { name, phone, address } = req.body;

  try {
    // Find or create customer
    let result = await pool.query(
      `SELECT * FROM customers WHERE phone = $1`,
      [phone]
    );

    let customer;

    if (result.rows.length === 0) {
      const insert = await pool.query(
        `INSERT INTO customers (name, phone, address)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [name, phone, address]
      );
      customer = insert.rows[0];
    } else {
      customer = result.rows[0];
    }

    // ✅ GENERATE TOKEN ONCE, WITH customerId
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
