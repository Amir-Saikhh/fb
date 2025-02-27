import { userModel } from "../Models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
import crypto from "crypto";
import HtmlTemplate from "../utils/ForgetPasswordTemplate.js";

export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(404).json({
        message: "All fields are required",
        success: false,
        error: false,
      });
    }
    // Check if username already exists
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "Email already exists",
        success: false,
        error: true,
      });
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to  Facebook project",
      html: `<h1>Welcome to our website, ${username}.</h1>
        <p> You have successfully registered with email id:${email}</p>`,
    };
    await transporter
      .sendMail(mailOptions)
      .then(() => {
        console.log("Email sent successfully");
      })
      .catch((error) => {
        console.log("Error sending email", error);
      });

    return res.status(200).json({
      message: "User registered successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    

    return res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }
    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect password",
        success: false,
        error: true,
      });
    }
    const TokenData = {
      id: user._id,
    };
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };
    const token = await jwt.sign(TokenData, process.env.TOKEN, {
      expiresIn: "1d",
    });
    return res.status(200).cookie("token", token, cookieOptions).json({
      message: "User logged in successfully",
      success: true,
      error: false,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

export const LogoutController = async (req, res) => {
  return res
    .status(200)
    .clearCookie(
      "token",
      "",
      { expiresIn: new Date(Date.now()) },
      { httpOnly: true }
    )
    .json({
      message: "User logged out successfullys",
      success: true,
      error: false,
    });
};

export const ForgetPasswordOtpController = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "Email is required",
      success: false,
      error: true,
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    // const expireTimeOtp = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    //  Set OTP and expiry
    user.forgetPasswordOtp = otp;
    user.forgetPasswordOtpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    // Send OTP via Email
    const mailOptions = {
      from: `"Facebook-project" ${process.env.SENDER_EMAIL}`,
      to: user.email,
      subject: "Password Reset OTP",
      html: HtmlTemplate({
        username: user.username,
        otp: otp,
        
      })
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "OTP sent to your email",
      success: true,
      error: false,
    
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

export const VerifyOtpController = async (req, res) => {
  const { forgetPasswordOtp } = req.body;
  try {
    if (!forgetPasswordOtp) {
      return res.status(400).json({
        message: "OTP is required",
        success: false,
        error: true,
      });
    }

    const user = await userModel.findOne({ forgetPasswordOtp });
    // if (!user) {
    //   return res.status(404).json({
    //     message: "User not found",
    //     success: false,
    //     error: true,
    //   });
    // }


    if (!user.forgetPasswordOtp) {
      return res.status(400).json({
        message: "OTP is invalid ",
        success: false,
        error: true,
      });
    }
    if (!user.forgetPasswordOtp || !user.forgetPasswordOtpExpire || user.forgetPasswordOtpExpire < Date.now()) {
      return res.status(400).json({
        message: "OTP is invalid or has expired",
        success: false,
        error: true,
      });
    }

    // const isOtpMatch = await bcryptjs.compare(otp, user.forgetPasswordOtp);
    // if (!isOtpMatch) {
    //   return res.status(400).json({
    //     message: "Invalid OTP",
    //     success: false,
    //     error: true,
    //   });
    // }

    return res.status(200).json({
      message: "OTP verified successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

export const UpdatePasswordController = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  try {
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
        success: false,
        error: true,
      });
    }
 // ✅ Hash and update password
 const hashPassword = await bcryptjs.hash(newPassword, 10);
 newPassword = hashPassword;

 // ✅ Reset OTP values in DB
 forgetPasswordOtp = null;
 forgetPasswordOtpExpire = null;
 

    return res.status(200).json({
      message: "Password reset successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};
