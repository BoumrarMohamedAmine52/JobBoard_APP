const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    required: [true, "the user must have a full name"],
  },
  email: {
    type: String,
    required: [true, "the user must have an email."],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "The user must provide a password"],
    minlength: [8, "the password must have at least 8 characters."],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm ur password"],
    validate: {
      // this works only on .create() / .save()
      validator: function (el) {
        return el === this.password;
      },
      message: "the passwords are not the same.",
    },
    select: false,
  },
  phoneNumber: {
    type: String,
    //validator : [validator.isMobilePhone, "Please provide a valide phone number"]
  },
  location: {
    type: String,
  },
  CandidateProfile: {
    workExperience: [
      {
        jobTitle: { type: String },
        companyName: { type: String },
        dates: { type: String },
      },
    ],
    coreSkills: {
      type: [String],
    },
    education: {
      type: [String],
    },
    portfolioLinks: {
      type: [String],
    },
  },
  role: {
    type: String,
    enum: {
      values: ["employer", "candidate"],
      message: "the user role must be either employer candidate",
    },
    default: "candidate",
  },
  profilePicture: { type: String },
  active: {
    type: Boolean,
    default: true,
  },
  company: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
