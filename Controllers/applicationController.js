const Application = require("../Models/applicationModel");
const Job = require("../Models/jobModel");

exports.getApplications = async (req, res, next) => {
  try {
    const applications = await Application.find();

    res.status(200).json({
      status: "Success",
      data: {
        applications,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return next(new Error("No application found with that id."));
    }

    res.status(200).json({
      status: "Success",
      data: {
        application,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.myApplications = async (req, res, next) => {
  try {
    const myApps = await Application.find({ candidate: req.user.id });

    if (!myApps) {
      return next(new Error("U didn't apply to any job offer yet."));
    }

    res.status(200).json({
      status: "Success",
      data: {
        myApps,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateMyApplication = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
