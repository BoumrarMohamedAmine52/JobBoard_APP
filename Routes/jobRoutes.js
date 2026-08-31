const express = require("express");

const Router = express.Router();

const jobControllers = require("../Controllers/jobController");

Router.route("/").get(jobControllers.getAllJobs).post(jobControllers.addJob);

Router.route("/:id").get(jobControllers.getJob);

module.exports = Router;
