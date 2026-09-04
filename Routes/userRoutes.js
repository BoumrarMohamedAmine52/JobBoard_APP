const express = require("express");

const Router = express.Router();

const authControllers = require("../Controllers/authController");

Router.route("/signUp").post(authControllers.signUp);
Router.route("/logIn").post(authControllers.logIn);

Router.route("/updateMyPassword").patch(
  authControllers.protect,
  authControllers.updatePassword,
);
module.exports = Router;
