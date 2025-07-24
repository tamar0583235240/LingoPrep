import Joi from 'joi';

export const createUserSchema = Joi.object({
  firstName: Joi.string().required().messages({
    'string.empty': 'Required field',
  }),
  lastName: Joi.string().required().messages({
    'string.empty': 'Required field',
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    'string.email': 'Invalid email',
    'string.empty': 'Required field',
  }),
  phone: Joi.string()
    .pattern(/^\d+$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must contain only digits',
      'string.empty': 'Required field',
    }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z\u0590-\u05FF])(?=.*\d)[A-Za-z\u0590-\u05FF\d]{6,}$/)
    .required()
    .messages({
      'string.pattern.base': 'Password must include letters (English or Hebrew) and numbers, at least 6 characters',
      'string.empty': 'Required field',
    }),
  role: Joi.string()
    .valid('student', 'manager', 'admin')
    .required()
    .messages({
      'any.only': 'Invalid role',
      'string.empty': 'Required field',
    }),
});

export const updateUserSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  email: Joi.string().email({ tlds: false }).optional().messages({
    'string.email': 'Invalid email',
  }),
  phone: Joi.string()
    .pattern(/^\d+$/)
    .optional()
    .messages({
      'string.pattern.base': 'Phone number must contain only digits',
    }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
    .optional()
    .messages({
      'string.pattern.base': 'Password must contain letters and numbers',
    }),
  role: Joi.string()
    .valid('student', 'manager', 'admin')
    .optional()
    .messages({
      'any.only': 'Invalid role',
    }),
});
