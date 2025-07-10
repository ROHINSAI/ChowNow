const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createOrder,
  getMyOrders,
  getOrderAnalytics,
} = require("../controller/orderController");

router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/analytics", protect, getOrderAnalytics);
module.exports = router;
