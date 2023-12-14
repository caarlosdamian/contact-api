const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

//@desc Register a user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  if (!username | !password | !email) {
    res.status(400);
    throw new Error('All fileds are mandatory');
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error('User already register');
  }
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword, email });
  if (user) {
    console.log(user);
    res.status(201).json({ _id: user._id, email: user.email });
  } else {
    res.status(400);
    throw new Error('User data is not valid');
  }
});

//@desc Login a user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email | !password) {
    res.status(400);
    throw new Error('All fileds are mandatory');
  }

  const user = await User.findOne({ email });
  // compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '20m' }
    );
    res.status(200).json({
      accessToken,
    });
  } else {
    res.status(401);
    throw new Error('Data is not valid');
  }
});

//@desc Get current user
//@route  Post /api/users/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  loginUser,
  currentUser,
  registerUser,
};
