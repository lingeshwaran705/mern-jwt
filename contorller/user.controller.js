const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/users.model");
const generateToken = require("../config/generateJWT");

// @desc     register user
// @route    POST /api/user/register
// @access   Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //check user exists

  const userExists = await User.findOne({ email });

  console.log(userExists);

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hashing and encrypting password

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(403).json({ status: "Invalid credentials" });
  }
});

// @desc     login user
// @route    POST /api/user/login
// @access   Public
const loginUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //check whether the user is in the db or not
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not found ");
    res.send();
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);

  if (user && isCorrectPassword) {
    res.json({
      message: `logged in as ${user.email}`,
      email: user.email,
      _id: user.id,
      name: user.name,
      token: generateToken(user.id),
    });
  } else {
    res.status(403).json({ message: "invalid credentials" });
  }
});

// @desc    register user
// @route   get /api/user/getUser
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.json({ _id, name, email });
});

module.exports = { registerUser, getUser, loginUser };
