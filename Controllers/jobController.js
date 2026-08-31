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
    console.log("eroor : ", error);
  }
};

exports.getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return next(new Error("Job not found"));
    }

    res.status(200).json({
      status: "Success",
      data: {
        job,
      },
    });
  } catch (error) {
    return next(error);
  }
};
