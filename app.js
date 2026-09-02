const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());

app.use(morgan("dev"));

const JobRouter = require("./Routes/jobRoutes");
const userRouter = require("./Routes/userRoutes");
const applicationRouter = require("./Routes/applicationRoutes");

app.use("/api/jb1/jobs", JobRouter);
app.use("/api/jb1/users", userRouter);
app.use("/api/jb1/applications", applicationRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `can't find URl : ${req.originalUrl}`,
  });
});

app.use((err, req, res, next) => {
  //console.error("Logged via custom handler:", err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: err.stack,
  });
});

module.exports = app;
