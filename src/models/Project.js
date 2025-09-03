import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    image: {
      type: String, // URL to image
    },
    githubLink: {
      type: String,
    },
    liveDemo: {
      type: String,
    },
    techStack: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
