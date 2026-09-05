const User = require("../Models/userModel");
const Job = require("../Models/jobModel");
const Application = require("../Models/applicationModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("../utils/AppError");
const asyncHandler = require("express-async-handler");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = asyncHandler(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "Success",
    token,
    data: {
      newUser,
    },
  });
});

exports.logIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("wrong email or password", 401));
  }

  const token = signToken(user.id);
  res.status(200).json({
    status: "Success",
    token,
    data: {
      user,
    },
  });
});

exports.protect = asyncHandler(async (req, res, next) => {
  //1 . get the token and check if it's there.
  let token;

  //console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //console.log("token : ", token);
  if (!token) {
    return next(
      new AppError("u are not loged in , please log in to get access.", 401),
    );
  }

  // 2. verify the token
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //console.log(decode);
  // 3. verifie if the user still exists.
  const currentUser = await User.findById(decode.id);

  if (!currentUser) {
    return next(
      new AppError("the user belonging to this token no longer exists.", 401),
    );
  }

  // 4. verifie if the user didn't changed the password since the token being created.
  if (currentUser.passwordChanged(decode.iat)) {
    return next(
      new AppError("The user changed the password , please log in again.", 401),
    );
  }

  // grant access to the protected route.
  req.user = currentUser;
  //console.log(req.user);
  req.user.id = currentUser._id.toString();
  next();
});

exports.givePermissionTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "You do not have the permission to perform this action.",
          403,
        ),
      );
    }
    next();
  };
};

exports.restrictToOwnerOnly = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    //console.log({ ...Model });
    //console.log(Model.modelName);
    if (!doc) {
      return next(
        new AppError(`${Model.modelName} with that id do not exist.`, 404),
      );
    }

    console.log(req.user._id);
    console.log("doc : ", doc);
    // console.log(
    //   "ids : ",
    //   doc.postedBy.toString() !== req.user._id.toString(),
    // );

    const ownerId = doc.postedBy || doc.candidate;
    if (ownerId.toString() !== req.user._id.toString()) {
      return next(
        new AppError(
          "Only the user who posted this document can perform this action",
          403,
        ),
      );
    }

    next();
  });
};

exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError("wrong current Password", 401));
  }

  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;
  console.log(user);
  await user.save();
  res.status(201).json({
    status: "Success",
    data: {
      user,
    },
  });
});
