const express = require("express");
const app = express();
const dotenv = require("dotenv");
const PORT = process.env.PORT;

app.listen(PORT, () => console.log("SERVER STARTED SUCCESSFULLY..."));
