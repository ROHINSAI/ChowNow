const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createOrder,
  getMyOrders,
  getOrderAnalytics,
  getOrdersForOwner,
  updateOrderStatus,
} = require("../controller/orderController");

router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/analytics", protect, getOrderAnalytics);
router.get("/allorders", protect, getOrdersForOwner);
router.put("/:orderId/status", protect, updateOrderStatus);
module.exports = router;
