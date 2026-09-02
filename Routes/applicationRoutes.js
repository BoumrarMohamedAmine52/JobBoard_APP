const express = require("express");

const Router = express.Router();

const applicationControllers = require("../Controllers/applicationController");
const authControllers = require("../Controllers/authController");
const Application = require("../Models/applicationModel");
const Job = require("../Models/jobModel");

Router.route("/")
  .get(applicationControllers.getApplications)
  .post(
    authControllers.protect,
    authControllers.givePermissionTo("candidate"),
    applicationControllers.setJobCandidateID,
    applicationControllers.addApplication,
  );

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
    authControllers.restrictToOwnerOnly(Application),
    applicationControllers.updateMyApplication,
  )
  .delete(
    authControllers.protect,
    authControllers.givePermissionTo("candidate"),
    authControllers.restrictToOwnerOnly(Application),
    applicationControllers.deleteMyApplication,
  );

Router.route("/getJobApplications/:id").get(
  authControllers.protect,
  authControllers.givePermissionTo("employer"),
  authControllers.restrictToOwnerOnly(Job),
  applicationControllers.getJobApplications,
);

module.exports = Router;
