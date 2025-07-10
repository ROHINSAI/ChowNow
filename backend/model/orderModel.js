const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  restaurant: {
    type: String, // or mongoose.Schema.Types.ObjectId if you switch back later
    ref: "Restaurant",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      _id: { type: String }, // keep as string if you're using custom IDs
      name: String,
      photo: String,
      quantity: Number,
      price: Number,
    },
  ],
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
