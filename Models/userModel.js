const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
    required: [true, "the user must have a full name"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "the user must have an email."],
    unique: true,
    validator: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "The user must provide a password"],
    minlength: [8, "the password must have at least 8 characters."],
  },
  passwordConfirm: {
    type: String,
    requied: [true, "Please confirm ur password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "the passwords are not the same.",
    },
  },
  phoneNumber: {
    type: Number,
    //validator : [validator.isMobilePhone, "Please provide a valide phone number"]
  },
  location: {
    type: String,
  },
  CandidateProfile: {
    workExperience: [
      {
        jobTitle: "String",
        companyName: "String",
        dates: "String",
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

const User = mongoose.model("User", userSchema);

module.exports = user;
