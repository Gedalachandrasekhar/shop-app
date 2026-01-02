require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const app = express();
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const managerRoutes = require("./routes/managerRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const partUsageRoutes = require("./routes/partUsageRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/parts", partUsageRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Employee Service API running...");
});

// ✅ DATABASE CONNECTION TEST
app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "SUCCESS",
      message: "Database connected successfully",
      server_time: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      status: "FAILED",
      error: error.message,
    });
  }
});

module.exports = app;
