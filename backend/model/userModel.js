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
  favoriteRestaurants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  ],
  phone: { type: String, default: null },
  addressList: {
    type: [
      {
        label: { type: String, default: "Home" },
        fullAddress: { type: String, required: true },
      },
    ],
    validate: [(arr) => arr.length <= 5, "Maximum 5 addresses allowed"],
    default: [],
  },
  location: {
    lat: { type: Number },
    long: { type: Number },
  },
  ordersHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.virtual("displayPhotoUrl").get(function () {
  return this.photo
    ? this.photo
    : `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
        this.name || "User"
      )}`;
});

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
