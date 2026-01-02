exports.createComplaint = async (req, res) => {
  const { complaintType, description } = req.body;
  const customerId = req.user.customerId;

  // 🔴 HARD CHECK (VERY IMPORTANT)
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
