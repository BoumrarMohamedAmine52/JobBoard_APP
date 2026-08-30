const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("the DB is connected successfully"))
  .catch((err) => console.log("Mongo DB connection error : ", err));

app.listen(port, () => {
  console.log(`this server is running from port : ${port}`);
});
