const express = require("express");

const Router = express.Router();

const applicationControllers = require("../Controllers/applicationController");
const authControllers = require("../Controllers/authController");

Router.route("/").get(applicationControllers.getApplications);

Router.route("/myApplications").get(
  authControllers.protect,
  authControllers.givePermissionTo("candidate"),
  applicationControllers.myApplications,
);

Router.route("/:id")
  .get(applicationControllers.getApplication)
  .patch(
    authControllers.protect,
    authControllers.givePermissionTo("candidate"),
    authControllers.restrictToOwnerOnly,
    applicationControllers.updateMyApplication,
  );

module.exports = Router;
