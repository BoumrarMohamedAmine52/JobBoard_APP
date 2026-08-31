const express = require("express");

const Router = express.Router();

const jobControllers = require("../Controllers/jobController");

Router.route("/").get(jobControllers.getAllJobs);

Router.route("/:id").get(jobControllers.getJob);

module.exports = Router;
