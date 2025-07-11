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
router.get("/:id", getRestaurantById); // Assuming you want to fetch a specific restaurant by ID
router.get("/:id/reviewsRatings", getRestaurantRatingsReviews); // Fetch ratings and reviews for a specific restaurant

router.post("/owner", protect, addRestaurantByOwner);

module.exports = router;
