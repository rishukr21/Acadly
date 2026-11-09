import express from 'express';
import {
  register,
  login,
  googleAuth,
  getMe,
  logout,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import {
  registerValidator,
  loginValidator,
  validate,
} from '../validators/authValidators.js';

const router = express.Router();

router.post('/register', authLimiter, validate(registerValidator), register);
router.post('/login', authLimiter, validate(loginValidator), login);
router.post('/google', authLimiter, googleAuth);
router.get('/me', protect, getMe);
router.post('/logout', logout);

export default router;
