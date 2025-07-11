const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors");
require("dotenv").config(); // Add this at the very top

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Database connection
const DB_URI = process.env.MONGO_URI; // Update with your MongoDB URI
mongoose
  .connect(DB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) =>
    console.error("MongoDB connection error:", err)
  );

// Routes
app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
