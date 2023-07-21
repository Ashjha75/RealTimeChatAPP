const express = require("express");
const cors = require("cors");
const app = express();
const RotuterPath = require("./routes/authRoutes");
const connectDB = require("./config/Database");
require("dotenv").config();
const PORT = process.env.PORT;
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
app.use(express.json());
app.use("/api/v1/", RotuterPath);
app.listen(PORT, () => console.log("SERVER STARTED SUCCESSFULLY..."));
connectDB();
