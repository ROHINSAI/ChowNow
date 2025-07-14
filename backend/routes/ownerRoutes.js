const express = require("express");
const router = express.Router();
const {
  getOwnerDashboardData,
  deleteRestaurantByOwner,
} = require("../controller/restaurantOwnerController");
const {
  getMyRestaurant,
  updateMyRestaurant,
} = require("../controller/restaurantController");
const { protect } = require("../middleware/authMiddleware");

router.get("/dashboard", protect, getOwnerDashboardData);
router.get("/myrestaurant", protect, getMyRestaurant);

router.put("/myrestaurant", protect, updateMyRestaurant);
router.delete("/myrestaurant", protect, deleteRestaurantByOwner);

module.exports = router;
