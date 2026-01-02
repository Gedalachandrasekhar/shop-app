const pool = require("../config/db"); // ✅ ADD THIS LINE
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

exports.employeeLogin = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT u.user_id, u.name, u.password_hash, r.role_name
       FROM users u
       JOIN roles r ON u.role_id = r.role_id
       WHERE u.phone = $1 AND u.is_active = true`,
      [phone]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken({
      userId: user.user_id,
      role: user.role_name,
    });

    res.json({
      token,
      role: user.role_name,
      name: user.name,
    });
  } catch (err) {
    console.error("EMPLOYEE LOGIN ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
};
