const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  autoLogin,
  addOrUpdateReview,
  getReview,
  getAllRestaurantStats,
} = require("../controller/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/autoLogin", autoLogin);
router.get("/restaurantStats", getAllRestaurantStats);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/review", protect, addOrUpdateReview);
router.get("/review/:restaurantId", protect, getReview);

module.exports = router;
