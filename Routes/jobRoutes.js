const express = require("express");

const Router = express.Router();

const jobControllers = require("../Controllers/jobController");
const authControllers = require("../Controllers/authController");

Router.route("/")
  .get(jobControllers.getAllJobs)
  .post(
    authControllers.protect,
    authControllers.givePermissionTo("employer"),
    jobControllers.addJob,
  );

Router.route("/:id").get(jobControllers.getJob);
//.delete(jobControllers.deleteJob);

module.exports = Router;
