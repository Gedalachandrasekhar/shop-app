const { generateToken } = require("../utils/jwt");

exports.customerLogin = async (req, res) => {
  // after customer is fetched or created

  generateToken({
  customerId: customer.customer_id,
  role: "CUSTOMER",
  });

  generateToken({
  userId: user.user_id,
  role: user.role_name,
  });

  res.json({
    token,
    role: "CUSTOMER",
    name: customer.name,
  });
};
