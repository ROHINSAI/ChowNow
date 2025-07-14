const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  favoriteRestaurants: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
      },
    ],
    default: [],
  },
  phone: { type: String, default: null },
  address: { type: String, default: null },
  location: {
    lat: { type: Number },
    long: { type: Number },
  },
  ordersHistory: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    default: [],
  },
  role: {
    type: String,
    enum: ["user", "admin", "owner"],
    default: "user",
  },
  restaurantOwned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Virtual getter for profile image (fallback to initials if no custom photo)
userSchema.virtual("displayPhotoUrl").get(function () {
  if (this.photo) {
    return this.photo;
  }

  const name = this.name || "User";
  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
    name
  )}`;
});

// Enable virtuals in JSON output (important!)
userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
