import express from "express";
import {
  register,
  login,
  logout,
  sendVerifyOtp,
  verifyEmail,
  isAuthenticated,
  sendResetOtp,
  resetPassword,
} from "../controllers/authcontroller.js";
import userAuth from "../middleware/userAuth.js";
import {
  loginLimiter,
  verifyLimiter,
  sendOtpLimiter,
} from "../middleware/rateLimiter.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", loginLimiter, login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, sendOtpLimiter, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyLimiter, verifyEmail);
authRouter.post("/is-auth", userAuth, isAuthenticated);
authRouter.post("/send-reset-otp", sendOtpLimiter, sendResetOtp);
authRouter.post("/reset-password", verifyLimiter, resetPassword);

export default authRouter;
