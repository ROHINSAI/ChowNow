const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: String,
  rating: { type: Number, min: 1, max: 5, required: true },
  createdAt: { type: Date, default: Date.now },
});

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  rating: { type: Number, min: 1, max: 5, default: 0 },
  description: { type: String, required: true },
  picture: { type: String }, // URL of the image
  numberOfRatings: { type: Number, default: 0 },
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [MenuItemSchema],
});

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  location: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },
  numberOfRatings: { type: Number, default: 0 },
  pictures: [String], // Array of image URLs
  reviews: [ReviewSchema],
  rating: { type: Number, min: 1, max: 5, default: 0 },
  menu: [CategorySchema],
  contact: {
    address: String,
    contactNo: String,
    email: String,
  },
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
