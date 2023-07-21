const Register = require("../models/Registeration");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.Register = async (req, res) => {
  try {
    // get values from body
    const { userName, email, password } = req.body;
    // validate
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill required fields.",
      });
    }
    // check for existing user
    const existingUser = await Register.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this Email.",
      });
    }
    // hashed password
    hashedPassword = await bcrypt.hash(password, 10);
    const images = `https://api.dicebear.com/6.x/initials/svg?seed=${userName}`;
    console.log(images);
    // create and update in database
    const user = await Register.create({
      userName,
      email,
      password: hashedPassword,
      profileImage: images,
    });
    // send response
    res.status(200).json({
      success: true,
      message: "User  registerd  successfully",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "User can't be registerd Please try again ",
      error: err.message,
    });
  }
};

// Login controllers
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill required fields.",
      });
    }
    const existingUser = await Register.findOne({ email });

    if (
      existingUser &&
      (await bcrypt.compare(password, existingUser.password))
    ) {
      const payload = {
        userName: existingUser.userName,
        email: existingUser.email,
        id: existingUser._id,
      };
      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({
        success: true,
        message: "Successfully logged in ",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Wrong email or password",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User can't be signned in  ",
      error: err.message,
    });
  }
};
