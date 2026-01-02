const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const inventoryController = require("../controllers/inventoryController");

router.post(
  "/",
  authenticate,
  authorizeRoles("ADMIN", "MANAGER"),
  inventoryController.addInventory
);

router.get(
  "/",
  authenticate,
  authorizeRoles("ADMIN", "MANAGER", "EMPLOYEE"),
  inventoryController.getInventory
);

module.exports = router;
