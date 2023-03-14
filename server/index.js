const Config = require("./config");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const user = require("./routes/user.route");

const port = Config.PORT;

const mongoString = Config.MONGO_URL;

mongoose.set("strictQuery", true);
mongoose
  .connect(mongoString)
  .then(() => console.log("connection successfull"))
  .catch(() => console.log("error"));
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", user);

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
