import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import validator from "validator";
import { passwordStrength } from "check-password-strength";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2. Normalize + validate email
    const normalizedEmail = email.toLowerCase();
    if (!validator.isEmail(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // 3. Check existing user
    const existingUser = await userModel.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Account already exists",
      });
    }

    // 4. Password strength
    const strength = passwordStrength(password);
    if (strength.id < 2) {
      return res.status(400).json({
        success: false,
        message: "Password is too weak",
      });
    }

    // 5. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Save user
    const user = await userModel.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    // 7. Generate token
    const token = createToken(user._id);

    // 8. Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 9. Send success response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { register };
