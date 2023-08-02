const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression"); // Add this line
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

// Add compression middleware and exclude the /api/v1/login route
app.use(compression({ filter: shouldCompress }));

function shouldCompress(req, res) {
  if (req.path === "/api/v1/login") {
    return false; // Disable compression for the login route
  }
  return compression.filter(req, res);
}

app.use(cookieParser());
app.use("/api/v1/", RotuterPath);
app.listen(PORT, () => console.log("SERVER STARTED SUCCESSFULLY..."));
connectDB();
