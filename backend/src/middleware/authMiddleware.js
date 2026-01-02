const { generateToken } = require("../utils/jwt");

exports.customerLogin = async (req, res) => {
  // after customer is fetched / created

  const token = generateToken({
    customerId: customer.customer_id, // 🔥 REQUIRED
    role: "CUSTOMER",
  });

  res.json({
    token,
    role: "CUSTOMER",
    name: customer.name,
  });
};
