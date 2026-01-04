const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const reportController = require("../controllers/reportController");

router.get(
  "/complaints/csv",
  authenticate,
  authorizeRoles("ADMIN", "MANAGER"),
  reportController.complaintsCSV
);

router.get(
  "/complaints/pdf",
  authenticate,
  authorizeRoles("ADMIN", "MANAGER"),
  reportController.complaintsPDF
);

router.get(
  "/inventory/csv",
  authenticate,
  authorizeRoles("ADMIN", "MANAGER"),
  reportController.inventoryCSV
);

module.exports = router;
