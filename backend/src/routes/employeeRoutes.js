const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const employeeController = require("../controllers/employeeController");

router.get(
  "/complaints",
  authenticate,
  authorizeRoles("EMPLOYEE"),
  employeeController.getAssignedComplaints
);

module.exports = router;
