const express = require("express");
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantRatingsReviews,
} = require("../controller/restaurantController");

router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById); // Assuming you want to fetch a specific restaurant by ID
router.get("/:id/reviewsRatings", getRestaurantRatingsReviews); // Fetch ratings and reviews for a specific restaurant

module.exports = router;
