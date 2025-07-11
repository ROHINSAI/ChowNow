const express = require("express");
const router = express.Router();
const {
  getOwnerDashboardData,
} = require("../controller/restaurantOwnerController");
const { protect } = require("../middleware/authMiddleware");

router.get("/dashboard", protect, getOwnerDashboardData);

module.exports = router;
