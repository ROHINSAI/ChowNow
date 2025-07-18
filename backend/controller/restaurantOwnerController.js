const Order = require("../model/orderModel");
const User = require("../model/userModel");
const Restaurant = require("../model/restaurantModel");

const getOwnerDashboardData = async (req, res) => {
  try {
    const ownerId = req.user._id;
    const restaurant = await Restaurant.findById(req.user.restaurantOwned);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const orders = await Order.find({
      restaurant: restaurant._id,
    }).populate("user", "name email");

    const totalOrders = orders.length;
    let totalRevenue = 0;
    let itemCountMap = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        totalRevenue += item.price * item.quantity;
        itemCountMap[item.name] =
          (itemCountMap[item.name] || 0) + item.quantity;
      });
    });

    const totalItemsSold = Object.values(itemCountMap).reduce(
      (a, b) => a + b,
      0
    );
    const mostSoldItem = Object.entries(itemCountMap).reduce(
      (max, curr) => (curr[1] > max[1] ? curr : max),
      ["", 0]
    );

    res.json({
      restaurant: {
        name: restaurant.name,
        _id: restaurant._id,
      },
      totalOrders,
      totalRevenue,
      totalItemsSold,
      mostSoldItem: {
        name: mostSoldItem[0],
        quantity: mostSoldItem[1],
      },
      orders,
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
const deleteRestaurantByOwner = async (req, res) => {
  try {
    const restaurantId = req.user.restaurantOwned;

    if (!restaurantId) {
      return res.status(404).json({ message: "No restaurant linked to user" });
    }

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    await restaurant.deleteOne();

    req.user.restaurantOwned = null;
    await req.user.save();

    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (err) {
    console.error("Delete Restaurant Error:", err);
    res.status(500).json({ message: "Failed to delete restaurant" });
  }
};

module.exports = { getOwnerDashboardData, deleteRestaurantByOwner };
