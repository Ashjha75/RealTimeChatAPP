const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expiresin: 5 * 60,
    required: true,
  },
});

async function sendVerificationMail() {
  try {
    await mailSender(email, "Verifcation mail from chat ", otp);
  } catch (err) {
    console.log(
      "error occurs while sending the otp verification mail ::  ",
      err
    );
    throw err;
  }
}

otpSchema.pre("save", async function (next) {
  await sendVerificationMail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("Otp", otpSchema);
