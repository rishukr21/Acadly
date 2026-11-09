import User from '../models/User.js';
import { generateToken, setTokenCookie, clearTokenCookie } from '../services/tokenService.js';
import { verifyGoogleIdToken } from '../services/googleAuthService.js';
import { successResponse, errorResponse } from '../utils/responseHandler.js';

/**
 * @route   POST /api/auth/register
 * @desc    Register a new student with email and password
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return errorResponse(res, 'An account with this email address already exists.', 400);
    }

    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      passwordHash: password,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name.trim())}&backgroundColor=7c3aed,6d28d9,4c1d95`,
      onboardingCompleted: false,
    });

    const token = generateToken(newUser._id);
    setTokenCookie(res, token);

    return successResponse(
      res,
      'Registration successful! Welcome to Acadly.',
      {
        user: newUser,
        token,
      },
      201
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & retrieve session
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Explicitly select passwordHash as it is excluded by default
    const user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash');
    if (!user) {
      return errorResponse(res, 'Invalid email or password.', 401);
    }

    if (!user.passwordHash && user.googleId) {
      return errorResponse(
        res,
        'This account was registered using Google. Please continue with Google Sign-In.',
        400
      );
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return errorResponse(res, 'Invalid email or password.', 401);
    }

    const token = generateToken(user._id);
    setTokenCookie(res, token);

    return successResponse(res, 'Login successful!', {
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/auth/google
 * @desc    Authenticate user via Google Identity Services ID Token
 * @access  Public
 */
export const googleAuth = async (req, res, next) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return errorResponse(res, 'Google credential token is required.', 400);
    }

    // Verify Google ID token
    const googlePayload = await verifyGoogleIdToken(credential);
    const { googleId, email, name, picture } = googlePayload;

    // 1. Check if user with googleId exists
    let user = await User.findOne({ googleId });

    // 2. If not found by googleId, check by email
    if (!user) {
      user = await User.findOne({ email });

      if (user) {
        // Link Google ID to existing account safely
        user.googleId = googleId;
        if (!user.avatar && picture) {
          user.avatar = picture;
        }
        await user.save();
      } else {
        // Create brand new Google user
        user = await User.create({
          name: name || 'Student',
          email,
          googleId,
          avatar: picture || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || 'Student')}&backgroundColor=7c3aed`,
          onboardingCompleted: false,
        });
      }
    } else {
      // Update avatar if provided
      if (picture && (!user.avatar || user.avatar.includes('dicebear'))) {
        user.avatar = picture;
        await user.save();
      }
    }

    const token = generateToken(user._id);
    setTokenCookie(res, token);

    return successResponse(res, 'Google authentication successful!', {
      user: user.toJSON(),
      token,
    });
  } catch (error) {
    if (error.message.includes('GOOGLE_CLIENT_ID is not configured')) {
      return errorResponse(res, error.message, 503);
    }
    return errorResponse(res, error.message || 'Google authentication failed', 400);
  }
};

/**
 * @route   GET /api/auth/me
 * @desc    Get currently authenticated user
 * @access  Protected
 */
export const getMe = async (req, res) => {
  return successResponse(res, 'Current user retrieved successfully', {
    user: req.user,
  });
};

/**
 * @route   POST /api/auth/logout
 * @desc    Clear authentication cookie & session
 * @access  Public
 */
export const logout = async (req, res) => {
  clearTokenCookie(res);
  return successResponse(res, 'Logged out successfully');
};
