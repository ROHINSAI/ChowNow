const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: {
    type: [
      {
        name: String,
        picture: String,
        quantity: Number,
        price: Number,
      },
    ],
    required: true,
  },
  status: {
    type: String,
    enum: ["cooking", "out for delivery", "delivered"],
    default: "cooking",
  },
  orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
