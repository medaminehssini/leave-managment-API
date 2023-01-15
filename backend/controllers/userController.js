import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { sendEmail } from "../utils/emailConfig.js";

//@desc   Auth user & get token
//@routes POST api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc  get user profile
//@routes GET api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found ");
  }
});

//@desc   Register a new user
//@routes POST api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  let { name, email, password, gender, isAdmin, workingWeek } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    password = (+new Date() * Math.random()).toString(36).substring(0, 6);
    sendEmail(
      email,
      "Bienvenue dans notre plateforme",
      "Vote mot de passe est : " + password
    );

    const user = await User.create({
      name,
      email,
      password,
      gender,
      workingWeek,
      isAdmin,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        gender: user.gender,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

//@desc   Update user profile
//@routes PUT api/users/profile
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password, gender } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.gender = gender || user.gender || "Male";

    if (password) {
      user.password = password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found ");
  }
});

//@desc   Get all user
//@routes PUT api/users
//@access private /admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//@desc   Delete user
//@routes PUT api/users/:id
//@access private/admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed ! " });
  } else {
    res.status(404);
    throw new Error("User not found ");
  }
});

//@desc   get user by id
//@routes GET api/users/:id
//@access private/admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found ");
  }
});

//@desc   Update user
//@routes PUT api/users/:id
//@access private
const updateUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.gender = req.body.gender || user.gender;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    user.workingWeek = req.body.workingWeek || user.workingWeek;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      gender: updatedUser.gender,
      isAdmin: updatedUser.isAdmin,
      workingWeek: updatedUser.workingWeek,
    });
  } else {
    res.status(404);
    throw new Error("User not found ");
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  deleteUser,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
};
