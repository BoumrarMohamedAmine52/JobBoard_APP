const Job = require("../Models/jobModel");
const User = require("../Models/userModel");
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

exports.addJob = async (req, res, next) => {
  try {
    // check if the user posting the job offer is an employer and not a candidtae
    //const user = await User.findById(req.body.postedBy);

    // if (user.role !== "employer") {
    //   return next(new Error("the job must be posted only by an employer"));
    // }

    req.body.postedBy = req.user.id;

    // save the new job in the db
    const newJob = await Job.create(req.body);

    res.status(201).json({
      status: "Success",
      data: {
        newJob,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedJob) {
      return next(new Error("No job found with that id."));
    }
    res.status(200).json({
      status: "Success",
      data: {
        updatedJob,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      return next(new Error("No job found with that id."));
    }

    res.status(204).json({
      status: "Success",
      data: {
        deletedJob,
      },
    });
  } catch (error) {
    next(error);
  }
};
