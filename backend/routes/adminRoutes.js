const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  deleteUser,
  searchUsers,
  getAllOwners,
  getOwnerById,
  deleteOwner,
  searchOwners,
  getAdminAnalytics,
} = require("../controller/adminController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.use(protect, isAdmin);

router.get("/users", getAllUsers);
router.get("/users/search", searchUsers);
router.get(
  "/user/:id",
  (req, res, next) => {
    console.log("🛠️ Route matched for user:", req.params.id);
    next();
  },
  getUserById
);
router.delete(
  "/user/:id",
  (req, res, next) => {
    console.log("🗑️ Delete user route matched:", req.params.id);
    next();
  },
  deleteUser
);

router.get("/owners", getAllOwners);
router.get("/owners/search", searchOwners);
router.get(
  "/owner/:id",
  (req, res, next) => {
    console.log("🛠️ Route matched:", req.params.id);
    next();
  },
  getOwnerById
);
router.delete(
  "/owner/:id",
  (req, res, next) => {
    console.log("🗑️ Delete owner route matched:", req.params.id);
    next();
  },
  deleteOwner
);

router.get("/analytics", getAdminAnalytics);

module.exports = router;
