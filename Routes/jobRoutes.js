const express = require("express");

const Router = express.Router();

const jobControllers = require("../Controllers/jobController");

Router.route("/").get(jobControllers.getAllJobs);

module.exports = Router;
