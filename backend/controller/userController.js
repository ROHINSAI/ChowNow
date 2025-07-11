const User = require("../model/userModel");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password, address, photo } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      address,
      photo,
    });

    if (user) {
      generateToken(res, user._id);
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        photo: user.displayPhotoUrl, // virtual fallback avatar if missing
      });
    } else {
      return res
        .status(400)
        .json({ message: "Invalid user data" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (user && passwordMatch) {
      generateToken(res, user._id);
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        photo: user.displayPhotoUrl, // virtual fallback avatar if missing
      });
    } else {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res
    .status(200)
    .json({ message: "Logged out successfully" });
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
    });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
