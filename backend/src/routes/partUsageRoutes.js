const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const partUsageController = require("../controllers/partUsageController");

router.post(
  "/:complaintId/use",
  authenticate,
  authorizeRoles("EMPLOYEE"),
  partUsageController.usePart
);

module.exports = router;