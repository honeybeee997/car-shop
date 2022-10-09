const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./.config.env" });

const app = require("./app");

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("db success");
  app.listen(process.env.PORT || 5000, () => {
    console.log("server started");
  });
});
