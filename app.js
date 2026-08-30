const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Sucess",
    data: {
      message: "hello from the / route.",
    },
  });
});

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `can't find URl : ${req.originalUrl}`,
  });
});

module.exports = app;
