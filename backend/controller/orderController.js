const Order = require("../model/orderModel");

// POST /api/orders
// Create a new order
const createOrder = async (req, res) => {
  try {
    const { restaurant, items } = req.body;

    if (!restaurant || !items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid order data" });
    }

    const order = await Order.create({
      restaurant,
      user: req.user._id, // requires auth middleware to be working
      items,
    });

    return res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error); // 👈 See what fails
    return res
      .status(500)
      .json({ message: "Server error creating order" });
  }
};

// controllers/orderController.js
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate(
        "restaurant",
        "name location description pictures contact"
      )
      .lean();
    return res.status(200).json(orders);
  } catch (err) {
    console.error("Error in getMyOrders:", err);
    return res
      .status(500)
      .json({ message: "Failed to fetch orders" });
  }
};

// GET /api/orders/analytics
const getOrderAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId });

    const numberOfOrders = orders.length;
    const moneySpent = orders.reduce((sum, order) => {
      const total = order.items.reduce(
        (acc, item) =>
          acc + (item.price || 0) * (item.quantity || 1), // ✅ fallback
        0
      );
      return sum + total + numberOfOrders * 30;
    }, 0);
    const uniqueRestaurants = new Set(
      orders.map((o) => o.restaurant)
    ).size;

    return res.json({
      numberOfOrders,
      moneySpent,
      uniqueRestaurants,
    });
  } catch (err) {
    console.error("Analytics fetch error:", err);
    return res
      .status(500)
      .json({ message: "Failed to fetch analytics" });
  }
};

module.exports = { createOrder, getMyOrders, getOrderAnalytics };
