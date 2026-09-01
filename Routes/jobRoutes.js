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

Router.route("/:id")
  .get(jobControllers.getJob)
  .patch(
    authControllers.protect,
    authControllers.givePermissionTo("employer"),
    authControllers.restrictToOwnerOnly,
    jobControllers.updateJob,
  )
  .delete(
    authControllers.protect,
    authControllers.givePermissionTo("employer"),
    authControllers.restrictToOwnerOnly,
    jobControllers.deleteJob,
  );

module.exports = Router;
