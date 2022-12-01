import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "ABC123");
      req.user = await User.findById(decoded.id).select("-password");
    } catch (error) {
      res.status(401);
      throw new Error(error.message);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("not authorized!  no token");
  }
  next();
});

const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("not authorized! as in admin");
  }
});

export { protect, admin };
