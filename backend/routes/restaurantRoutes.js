const express = require("express");
const router = express.Router();
const {
  getAllRestaurants,
} = require("../controller/restaurantController");

router.get("/", getAllRestaurants);

module.exports = router;
