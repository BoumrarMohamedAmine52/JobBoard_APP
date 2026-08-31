const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "Success",
      token,
      data: {
        newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new Error("Please provide email and password"));
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new Error("wrong email or password"));
    }

    const token = signToken(user.id);
    res.status(201).json({
      status: "Success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
