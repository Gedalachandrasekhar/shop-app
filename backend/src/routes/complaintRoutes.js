const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const complaintController = require("../controllers/complaintController");

// Customer creates complaint
router.post(
  "/",
  authenticate,
  authorizeRoles("CUSTOMER"),
  complaintController.createComplaint
);

// Customer views own complaints
router.get(
  "/my",
  authenticate,
  authorizeRoles("CUSTOMER"),
  complaintController.getMyComplaints
);

// Get complaint by ID (tracking)
router.get(
  "/:id",
  authenticate,
  complaintController.getComplaintById
);

const statusController = require("../controllers/complaintStatusController");

// Update status (Manager / Employee / Customer)
router.put(
  "/:complaintId/status",
  authenticate,
  statusController.updateStatus
);

// Get status history (Customer tracking)
router.get(
  "/:id/status-history",
  authenticate,
  statusController.getStatusHistory
);

module.exports = router;
