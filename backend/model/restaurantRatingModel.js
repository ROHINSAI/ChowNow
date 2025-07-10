const mongoose = require("mongoose");

const restaurantRatingSchema = new mongoose.Schema({
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
  rating: { type: Number, min: 1, max: 5, required: true },
  createdAt: { type: Date, default: Date.now },
});

const restaurantRating = mongoose.model(
  "restaurantRating",
  restaurantRatingSchema
);

module.exports = restaurantRating;
