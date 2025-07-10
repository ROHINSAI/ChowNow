const Order = require("../model/orderModel");

const createOrder = async (req, res) => {
  try {
    const { restaurant, items } = req.body;

    if (!restaurant || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const order = await Order.create({
      restaurant,
      user: req.user._id, // requires auth middleware to be working
      items,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error); // 👈 See what fails
    res.status(500).json({ message: "Server error creating order" });
  }
};

// controllers/orderController.js
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "restaurant",
      "name"
    );
    res.json(orders);
  } catch (err) {
    console.error("Error in getMyOrders:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

module.exports = { createOrder, getMyOrders };
