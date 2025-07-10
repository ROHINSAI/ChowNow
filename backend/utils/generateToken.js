const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  if (!process.env.JWT_SECRET) {
    console.warn("⚠️ JWT_SECRET is not set in environment variables!");
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use HTTPS-only in production
    sameSite: "lax", // CSRF protection
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token; // optional return for debug or logs
};

module.exports = generateToken;
