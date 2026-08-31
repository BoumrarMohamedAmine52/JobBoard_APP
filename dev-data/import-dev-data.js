const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const Job = require("../Models/jobModel");
const User = require("../Models/userModel");
const Application = require("../Models/applicationModel");

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connection succesfully."))
  .catch((err) => console.log("Mongo DB connection error : ", err));

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/data/users.json`, "UTF-8"),
);
const jobs = JSON.parse(
  fs.readFileSync(`${__dirname}/data/jobs.json`, "UTF-8"),
);
const applications = JSON.parse(
  fs.readFileSync(`${__dirname}/data/applications.json`, "UTF-8"),
);

const importData = async () => {
  try {
    await Job.create(jobs);
    await User.create(users, { validateBeforeSave: false });
    await Application.create(applications);
    console.log("DATA uploaded succesfully");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await Job.deleteMany();
    await User.deleteMany();
    await Application.deleteMany();
    console.log("DB is Deleted");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
