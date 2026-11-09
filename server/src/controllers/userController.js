import User from '../models/User.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile & academic onboarding information
 * @access  Protected
 */
export const updateProfile = async (req, res, next) => {
  try {
    const {
      name,
      college,
      degree,
      branch,
      semester,
      academicYear,
      avatar,
      onboardingCompleted,
      themePreference,
    } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    if (name !== undefined) user.name = name.trim();
    if (college !== undefined) user.college = college.trim();
    if (degree !== undefined) user.degree = degree;
    if (branch !== undefined) user.branch = branch.trim();
    if (semester !== undefined) user.semester = Number(semester);
    if (academicYear !== undefined) user.academicYear = academicYear.trim();
    if (avatar !== undefined) user.avatar = avatar;
    if (onboardingCompleted !== undefined) user.onboardingCompleted = Boolean(onboardingCompleted);
    if (themePreference !== undefined) user.themePreference = themePreference;

    const updatedUser = await user.save();

    return successResponse(res, 'Profile updated successfully', {
      user: updatedUser.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/users/theme
 * @desc    Quickly update user theme preference
 * @access  Protected
 */
export const updateTheme = async (req, res, next) => {
  try {
    const { theme } = req.body;
    if (!['light', 'dark', 'system'].includes(theme)) {
      return errorResponse(res, 'Invalid theme preference. Must be light, dark, or system.', 400);
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { themePreference: theme },
      { new: true }
    );

    return successResponse(res, 'Theme preference updated', {
      themePreference: user.themePreference,
    });
  } catch (error) {
    next(error);
  }
};
