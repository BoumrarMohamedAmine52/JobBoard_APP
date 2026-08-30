const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Sucess",
    data: {
      message: "hello from the / route.",
    },
  });
});

module.exports = app;
