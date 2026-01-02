const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ ROLE-AWARE USER OBJECT (MATCHES CONTROLLERS)
    req.user = {
      userId: decoded.id || decoded.userId || null,       // EMPLOYEE / MANAGER / ADMIN
      customerId: decoded.customerId || null,             // CUSTOMER
      role: decoded.role,
    };

    // At least one ID must exist
    if (!req.user.userId && !req.user.customerId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticate;
