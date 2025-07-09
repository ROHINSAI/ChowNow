const jwt = require("jsonwebtoken");
const User = require("../model/userModel.js");

const protect = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select(
        "-password"
      );

      next();
    } catch (error) {
      console.error(error);
      res
        .status(401)
        .json({ message: "Not authorized, token failed" });
    }
  } else {
    res
      .status(401)
      .json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
