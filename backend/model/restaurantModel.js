const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  location: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },
  pictures: [String],
  contact: {
    address: String,
    phone: String,
    email: String,
  },
  menu: [
    {
      cuisine: { type: String, required: true },
      items: [
        {
          name: { type: String, required: true },
          price: { type: Number, required: true },
          discount: { type: Number, default: 0 },
          description: { type: String, required: true },
          picture: { type: String },
        },
      ],
    },
  ],
});

const Restaurant = mongoose.model(
  "Restaurant",
  RestaurantSchema
);

module.exports = Restaurant;
