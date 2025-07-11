const express = require("express");
const router = express.Router();
const {
  getAllRestaurants,
  getRestaurantById,
} = require("../controller/restaurantController");

router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById); // Assuming you want to fetch a specific restaurant by ID

module.exports = router;
