const Job = require("../Models/jobModel");
exports.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find();

    res.status(200).json({
      status: "Success",
      data: {
        jobs,
      },
    });
  } catch (error) {
    return next(new Error("Error displaying the jobs."));
  }
};
