import express from 'express';
import { updateProfile, updateTheme } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { profileUpdateValidator, validate } from '../validators/authValidators.js';

const router = express.Router();

router.put('/profile', protect, validate(profileUpdateValidator), updateProfile);
router.put('/theme', protect, updateTheme);

export default router;
