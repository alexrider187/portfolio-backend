import Joi from "joi";

export const projectSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  image: Joi.string().uri().optional(),
  githubLink: Joi.string().uri().optional(),
  liveDemo: Joi.string().uri().optional(),
  techStack: Joi.array().items(Joi.string()).optional(),
});
