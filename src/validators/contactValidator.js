import joi from 'joi';

export const contactSchema =  joi.object({
  name: joi.string().max(50).required(),
  email: joi.string().email().required(),
  message: joi.string().max(500).required(),
});