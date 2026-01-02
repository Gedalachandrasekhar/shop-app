const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const customerAuth = require("../controllers/customerAuthController");

router.post("/employee/login", authController.employeeLogin);
router.post("/customer/login", customerAuth.customerLogin);

module.exports = router;
