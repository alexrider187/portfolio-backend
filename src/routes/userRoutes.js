import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/userController.js";

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register the admin (only allowed email from .env)
// @access  Public (but restricted by controller)
router.post("/register", registerAdmin);

// @route   POST /api/users/login
// @desc    Login admin and get JWT
// @access  Public (restricted to admin)
router.post("/login", loginAdmin);

export default router;
