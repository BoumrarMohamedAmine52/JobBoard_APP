const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());

app.use(morgan("dev"));

const JobRouter = require("./Routes/jobRoutes");
const userRouter = require("./Routes/userRoutes");
const applicationRouter = require("./Routes/applicationRoutes");
const globalErrorHandler = require("./Controllers/errorController");

app.use("/api/jb1/jobs", JobRouter);
app.use("/api/jb1/users", userRouter);
app.use("/api/jb1/applications", applicationRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `can't find URl : ${req.originalUrl}`,
  });
});

app.use(globalErrorHandler);

module.exports = app;
