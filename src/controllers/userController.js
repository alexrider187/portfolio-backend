import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN } // 👈 now reads from .env
  );
};

// 🔑 Register admin (only if email matches .env)
export const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // ✅ Only allow registration with your email from .env
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ error: "Unauthorized to register" });
    }

    // Check if admin already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "admin",
    });

    res.status(201).json({
      message: "Admin registered successfully ✅",
      token: generateToken(user),
    });
  } catch (err) {
    next(err);
  }
};

// 🔑 Login (admin only)
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Must match .env email
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ error: "Access denied, not an admin" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful ✅",
      token: generateToken(user),
    });
  } catch (err) {
    next(err);
  }
};
