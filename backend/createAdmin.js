const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./model/userModel"); // update path if needed

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const adminExists = await User.findOne({ email: "admin@example.com" });

    if (adminExists) {
      console.log("Admin already exists.");
      process.exit();
    }

    const admin = await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: "rohin123",
      address: "Admin Block, System Lane, Control City",
      role: "admin",
      phone: "9999999999",
    });

    console.log("✅ Admin created:", admin);
    process.exit();
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
};

createAdmin();
