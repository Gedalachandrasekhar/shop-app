const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const managerController = require("../controllers/managerController");

// Unassigned complaints
router.get(
  "/complaints/unassigned",
  authenticate,
  authorizeRoles("MANAGER", "ADMIN"),
  managerController.getUnassignedComplaints
);

// Employee list
router.get(
  "/employees",
  authenticate,
  authorizeRoles("MANAGER", "ADMIN"),
  managerController.getEmployees
);

// Assign complaint
router.put(
  "/complaints/:complaintId/assign",
  authenticate,
  authorizeRoles("MANAGER", "ADMIN"),
  managerController.assignComplaint
);

module.exports = router;
