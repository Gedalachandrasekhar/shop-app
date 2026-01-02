const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const adminController = require("../controllers/adminController");

// Admin-only routes
router.get(
  "/complaints",
  authenticate,
  authorizeRoles("ADMIN"),
  adminController.getAllComplaints
);

router.get(
  "/users",
  authenticate,
  authorizeRoles("ADMIN"),
  adminController.getAllUsers
);

router.get(
  "/inventory",
  authenticate,
  authorizeRoles("ADMIN"),
  adminController.getInventoryOverview
);

module.exports = router;
