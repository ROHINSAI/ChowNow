const mongoose = require("mongoose");

const restaurantReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  review: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const RestaurantReview = mongoose.model(
  "RestaurantReview",
  restaurantReviewSchema
);

module.exports = RestaurantReview;
