import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// @route   GET /api/projects
// @desc    Get all projects (public)
router.get("/", getProjects);

// @route   GET /api/projects/:id
// @desc    Get single project by ID (public)
router.get("/:id", getProjectById);

// @route   POST /api/projects
// @desc    Create a new project (admin only)
router.post("/", protect, upload.single('image'), createProject);

// @route   PUT /api/projects/:id
// @desc    Update a project (admin only)
router.put("/:id", protect, upload.single('image'), updateProject);

// @route   DELETE /api/projects/:id
// @desc    Delete a project (admin only)
router.delete("/:id", protect, deleteProject);

export default router;
