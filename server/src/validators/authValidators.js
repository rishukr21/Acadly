import { body, validationResult } from 'express-validator';
import { errorResponse } from '../utils/responseHandler.js';

export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    return errorResponse(res, 'Validation failed', 400, extractedErrors);
  };
};

export const registerValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number'),
];

export const loginValidator = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

export const profileUpdateValidator = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('college')
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage('College name cannot exceed 150 characters'),
  body('degree')
    .optional()
    .trim()
    .isIn(['B.Tech', 'B.E.', 'Dual Degree', 'Other'])
    .withMessage('Invalid degree selection'),
  body('branch')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Branch cannot exceed 100 characters'),
  body('semester')
    .optional()
    .isInt({ min: 1, max: 8 })
    .withMessage('Semester must be an integer between 1 and 8'),
  body('academicYear')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Academic year cannot exceed 50 characters'),
];
