const express = require("express");
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantRatingsReviews,
  addRestaurantByOwner,
} = require("../controller/restaurantController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById);
router.get("/:id/reviewsRatings", getRestaurantRatingsReviews);

router.post("/owner", protect, addRestaurantByOwner);

module.exports = router;
