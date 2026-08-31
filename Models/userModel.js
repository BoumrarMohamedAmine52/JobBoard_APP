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
  passwordChangedDate: {
    type: Date,
  },
  resetToken: {
    type: String,
  },
  expiredresetTokenDate: {
    type: Date,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  company: {
    type: String,
  },
});

// Pattern A: async, no next() call needed at all
// the next() become optional in async function .
//Since Mongoose 5+, when you pass an async function to pre('save', ...),
// Mongoose is smart enough to recognize it as an async function and waits for the returned Promise to resolve —
// completion is signaled automatically when the function finishes running, not by calling next().
// Calling next() becomes optional, not required.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return; //next();

  this.password = await bcrypt.hash(this.password, 10);

  this.passwordConfirm = undefined;

  //next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model("User", userSchema);

module.exports = User;
