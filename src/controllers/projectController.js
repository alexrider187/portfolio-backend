import Project from "../models/Project.js";
import { projectSchema } from "../validators/projectValidator.js";

// @desc    Create a new project (admin only)
export const createProject = async (req, res, next) => {
  try {
    // ✅ Validate request body (excluding image, handled separately)
    const { error } = projectSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.details.map((d) => d.message),
      });
    }

    // Include uploaded image if exists
    const projectData = { ...req.body };
    if (req.file) {
      projectData.image = `/uploads/${req.file.filename}`;
    }

    const project = await Project.create(projectData);

    res.status(201).json({
      message: "Project created successfully ✅",
      project,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all projects (public)
export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
};

// @desc    Get single project by ID (public)
export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(project);
  } catch (err) {
    next(err);
  }
};

// @desc    Update a project (admin only)
export const updateProject = async (req, res, next) => {
  try {
    // ✅ Validate request body
    const { error } = projectSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.details.map((d) => d.message),
      });
    }

    // Include new uploaded image if exists
    const projectData = { ...req.body };
    if (req.file) {
      projectData.image = `/uploads/${req.file.filename}`;
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      projectData,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({
      message: "Project updated successfully ✅",
      project,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a project (admin only)
export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully ❌" });
  } catch (err) {
    next(err);
  }
};
