const User = require("../model/userModel");
const Order = require("../model/orderModel");

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("name phone").lean();
  res.json(users);
};

const searchUsers = async (req, res) => {
  const { name } = req.query;
  const users = await User.find({
    role: "user",
    name: { $regex: name, $options: "i" },
  })
    .select("name phone")
    .lean();
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password").lean();
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

// Owners

const getAllOwners = async (req, res) => {
  const owners = await User.find({ role: "owner" }).select("name phone").lean();
  res.json(owners);
};

const searchOwners = async (req, res) => {
  const { name } = req.query;
  const owners = await User.find({
    role: "owner",
    name: { $regex: name, $options: "i" },
  })
    .select("name phone")
    .lean();
  res.json(owners);
};
const getOwnerById = async (req, res) => {
  try {
    const owner = await User.findById(req.params.id);
    console.log("Fetching owner ID:", req.params.id);
    console.log("Found user:", owner);
    if (!owner || owner.role !== "owner") {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.json(owner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteOwner = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Owner deleted" });
};

const getAdminAnalytics = async (req, res) => {
  try {
    const { range = "7" } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(range));

    const orders = await Order.find({ orderDate: { $gte: startDate } }).lean();

    let totalRevenue = 0;
    const restaurantMap = {};
    const itemMap = {};
    const userMap = {};

    for (const order of orders) {
      totalRevenue += order.items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );

      restaurantMap[order.restaurant] =
        (restaurantMap[order.restaurant] || 0) + 1;

      const userId = order.user?.toString();
      if (userId) {
        userMap[userId] = (userMap[userId] || 0) + 1;
      }

      for (const item of order.items) {
        itemMap[item.name] = (itemMap[item.name] || 0) + item.quantity;
      }
    }

    const highestOrderedRestaurant =
      Object.entries(restaurantMap).sort((a, b) => b[1] - a[1])[0] || null;
    const highestOrderedItem =
      Object.entries(itemMap).sort((a, b) => b[1] - a[1])[0] || null;
    const mostActiveUser =
      Object.entries(userMap).sort((a, b) => b[1] - a[1])[0] || null;

    res.status(200).json({
      totalRevenue,
      totalOrders: orders.length,
      highestOrderedRestaurant,
      highestOrderedItem,
      mostActiveUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch analytics", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  searchUsers,
  getAllOwners,
  getOwnerById,
  deleteOwner,
  searchOwners,
  getAdminAnalytics,
};
