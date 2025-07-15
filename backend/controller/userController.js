const User = require("../model/userModel");
const RestaurantRating = require("../model/restaurantRatingModel");
const RestaurantReview = require("../model/restaurantReviewModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password, address, photo, role, latitude, longitude } =
    req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      address,
      photo,
      role: role || "user",
      location:
        latitude && longitude
          ? {
              lat: latitude,
              long: longitude,
            }
          : undefined,
    });

    if (user) {
      generateToken(res, user._id);
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        role: user.role,
        restaurantOwned: user.restaurantOwned || null,
        photo: user.displayPhotoUrl, // virtual fallback avatar
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    generateToken(res, user._id);

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      photo: user.displayPhotoUrl,
      phone: user.phone,
      role: user.role,
      restaurantOwned: user.restaurantOwned || null,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Login Error:", error.message); // log actual error
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });
  return res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = req.user;

  if (user) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
      role: user.role,
      photo: user.displayPhotoUrl, // Use the virtual
      restaurantOwned: user.restaurantOwned || null,
      createdAt: user.createdAt,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();

    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      address: updatedUser.address,
      photo: updatedUser.photo,
      role: updatedUser.role,
      restaurantOwned: updatedUser.restaurantOwned || null,
      createdAt: updatedUser.createdAt,
    });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};

const autoLogin = async (req, res) => {
  if (!req.cookies.jwt) {
    return res.json({ message: "No Token" });
  }
  const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

  const user = await User.findById(decoded.userId).select("-password");

  if (user) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      favoriteRestaurants: user.favoriteRestaurants,
      phone: user.phone,
      ordersHistory: user.ordersHistory,
      role: user.role,
      restaurantOwned: user.restaurantOwned || null,
      createdAt: user.createdAt,
      photo: user.displayPhotoUrl, // virtual fallback avatar if missing
    });
  } else {
    return res.json({ message: "User Not Found" });
  }
};

const addOrUpdateReview = async (req, res) => {
  const { restaurant, rating, review } = req.body;
  const user = req.user._id;

  try {
    // Check for existing rating and review
    let existingRating = await RestaurantRating.findOne({
      user,
      restaurant,
    });
    let existingReview = await RestaurantReview.findOne({
      user,
      restaurant,
    });

    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
    } else if (rating) {
      await RestaurantRating.create({
        user,
        restaurant,
        rating,
      });
    }

    if (existingReview) {
      existingReview.review = review;
      await existingReview.save();
    } else if (review) {
      await RestaurantReview.create({
        user,
        restaurant,
        review,
      });
    }

    res.status(201).json({ message: "Review added/updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getReview = async (req, res) => {
  const { restaurantId } = req.params;
  const user = req.user._id;

  try {
    const rating = await RestaurantRating.findOne({
      user,
      restaurant: restaurantId,
    });
    const review = await RestaurantReview.findOne({
      user,
      restaurant: restaurantId,
    });

    res.status(200).json({
      rating: rating ? rating.rating : 0,
      review: review ? review.review : "",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllRestaurantStats = async (req, res) => {
  try {
    // Aggregate ratings
    const ratingStats = await RestaurantRating.aggregate([
      {
        $group: {
          _id: "$restaurant",
          averageRating: { $avg: "$rating" },
          totalRatings: { $sum: 1 },
        },
      },
    ]);

    // Aggregate review counts
    const reviewStats = await RestaurantReview.aggregate([
      {
        $group: {
          _id: "$restaurant",
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    // Merge both stats by restaurant _id
    const statsMap = {};

    ratingStats.forEach((r) => {
      statsMap[r._id.toString()] = {
        restaurant: r._id,
        averageRating: r.averageRating,
        totalRatings: r.totalRatings,
        totalReviews: 0,
      };
    });

    reviewStats.forEach((r) => {
      const id = r._id.toString();
      if (statsMap[id]) {
        statsMap[id].totalReviews = r.totalReviews;
      } else {
        statsMap[id] = {
          restaurant: r._id,
          averageRating: 0,
          totalRatings: 0,
          totalReviews: r.totalReviews,
        };
      }
    });

    const stats = Object.values(statsMap);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch restaurant stats" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  autoLogin,
  addOrUpdateReview,
  getReview,
  getAllRestaurantStats,
};
