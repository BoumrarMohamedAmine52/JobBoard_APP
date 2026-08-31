const express = require("express");

const Router = express.Router();

const authControllers = require("../Controllers/authController");

Router.route("/signUp").post(authControllers.signUp);

module.exports = Router;
