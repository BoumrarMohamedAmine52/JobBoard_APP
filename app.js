const express = require("express");

const app = express();

app.use(express.json());

const port = 3000;

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Sucess",
    data: {
      message: "hello from the / route.",
    },
  });
});

app.listen(port, () => {
  console.log(`this server is running from port : ${port}`);
});
