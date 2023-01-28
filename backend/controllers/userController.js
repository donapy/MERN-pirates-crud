const asyncHandler = require("express-async-handler");
const ObjectIdVal = require("mongoose").Types.ObjectId;
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc    Get User
// @route   GET /api/user/getUser/
// @access  Public
const getUser = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}, { _id: 1, fullname: 1, email: 1 }).sort({
      $natural: -1,
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error, try again" });
  }
});

// @desc    Get User by Id
// @route   GET /api/user/getUser/:id
// @access  Public
const getUserById = asyncHandler(async (req, res) => {
  try {
    // console.log(`Entro: ${JSON.stringify(req.params._id)}`);
    const user = await User.findOne(
      { _id: req.params._id },
      { _id: 0, fullname: 1, email: 1 }
    );
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error, try again" });
  }
});

// @desc    Login
// @route   POST /api/user/loginUser/
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, {});

    //check password
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await generateToken(user.id);
      // res.cookie("token", token, { httpOnly: true });
      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 14400),
        })
        .json({
          // success: true,
          token,
          // _id: user._id,
          // fullname: user.fullname,
          // email: user.email,
        });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error, try again" });
  }
});

// @desc    Create User
// @route   POST /api/user/newUser
// @access  Public
const newUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  if (
    !fullname ||
    fullname.length < 4 ||
    email.length < 5 ||
    !email ||
    !password ||
    password.lenght < 4
  ) {
    return res.status(400).json({
      message: "Error, invalid inputs to create a new User",
    });
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({
      message: "Error, the User/email already exists",
    });
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });

  if (user) {
    return res.status(201).json({
      success: true,
      _id: user.id,
      fullname: user.fullname,
      email: user.email,
    });
  } else {
    return res
      .status(400)
      .send({ message: "Error creating the user, try again" });
  }
});

// @desc    Update User
// @route   PUT /api/user/updateUser/:id
// @access  Public
const updateUser = asyncHandler(async (req, res) => {
  let id = req.params._id;
  if (!ObjectIdVal.isValid(id) && id !== undefined) {
    return res.status(404).send({ message: "User not found" });
  }
  const user = await User.findById(id);

  if (!user || user.length === 0) {
    return res
      .status(400)
      .send({ message: "Error, cant find a user with that id" });
  }

  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    id,
  });
});

// @desc    Delete User
// @route   DELETE /api/user/deleteUser/:id
// @access  Public
const deleteUser = asyncHandler(async (req, res) => {
  let id = req.params._id;
  if (!ObjectIdVal.isValid(id) && id !== undefined) {
    return res.status(404).send({ message: "User not found" });
  }
  const user = await User.findById(id);

  if (!user || user.length === 0) {
    return res
      .status(400)
      .send({ message: "Error, cant find a user with that id" });
  }

  await user.remove();

  return res.status(200).json({
    success: true,
    id,
  });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = {
  getUser,
  newUser,
  updateUser,
  deleteUser,
  getUserById,
  loginUser,
};
