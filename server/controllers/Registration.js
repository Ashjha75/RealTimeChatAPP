const Register = require("../models/Registeration");
const Otp = require("../models/Otp");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const OtpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");

// otpSender
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
  } catch (err) {}
};

// signup conrollers
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
    // create and update in database
    const user = await Register.create({
      userName,
      email,
      password: hashedPassword,
      profileImage: images,
    });
    // send email
    await mailSender(
      email,
      "Account Created Successfully",
      `Hi ${userName} you hav successfully created your account on chat`
    );
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
    console.log("Req object:", req.headers);
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
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      existingUser.token = token;
      existingUser.password = undefined;
      const options = {
        maxAge: 3600000,
        httpOnly: true,
      };
      setTimeout(() => {
        console.log(`${req.cookies["auth-token"]}   ${"co"}`);
      }, 5000);
      return res.cookie("auth-token", token, options).status(200).json({
        success: true,
        token,
        existingUser,
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

// Logout controllers
exports.Logout = async (req, res) => {
  try {
    // Clear the token on the client-side by setting an expired cookie
    const options = {
      expires: new Date(Date.now() - 1),
      httpOnly: true,
    };
    res.cookie("token", "", options);
    return res.status(200).json({
      success: true,
      message: "Successfully logged out",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred during logout",
      error: err.message,
    });
  }
};
