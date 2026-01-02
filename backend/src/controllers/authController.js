exports.employeeLogin = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const userRes = await pool.query(
      `SELECT u.*, r.role_name 
       FROM users u 
       JOIN roles r ON u.role_id = r.role_id
       WHERE phone = $1 AND is_active = true`,
      [phone]
    );

    if (userRes.rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = userRes.rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid password" });

    const token = generateToken({
      userId: user.user_id,
      role: user.role_name,
    });

    // ✅ SINGLE RESPONSE
    res.json({
      token,
      role: user.role_name, // ADMIN | EMPLOYEE | MANAGER
      name: user.name,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
