const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database is connected successfully.."))
    .catch((err) => {
      console.log("Error while connecting to database");
      console.log(error.message);
      process.exit(1);
    });
};
module.exports = connectDB;
