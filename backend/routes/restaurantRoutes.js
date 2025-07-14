const express = require("express");
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantRatingsReviews,
  addRestaurantByOwner,
  addFavoriteRestaurant,
  getFavoriteRestaurant,
} = require("../controller/restaurantController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getAllRestaurants);
router.get("/favorite", protect, getFavoriteRestaurant); // Add favorite restaurant
router.get("/:id", getRestaurantById); // Assuming you want to fetch a specific restaurant by ID
router.get("/:id/reviewsRatings", getRestaurantRatingsReviews); // Fetch ratings and reviews for a specific restaurant

router.post("/owner", protect, addRestaurantByOwner);
router.post("/favorite", protect, addFavoriteRestaurant); // Add favorite restaurant

module.exports = router;
