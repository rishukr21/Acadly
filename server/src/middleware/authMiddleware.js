import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
import User from '../models/User.js';
import { COOKIE_NAME } from '../services/tokenService.js';
import { errorResponse } from '../utils/responseHandler.js';

export const protect = async (req, res, next) => {
  try {
    let token = null;

    // 1. Try to read from HTTP-only cookie
    if (req.cookies && req.cookies[COOKIE_NAME]) {
      token = req.cookies[COOKIE_NAME];
    }
    // 2. Or fallback to Authorization Bearer header
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return errorResponse(res, 'Authentication required. Please log in.', 401);
    }

    // Verify token
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return errorResponse(res, 'Invalid token payload', 401);
    }

    // Find user in database
    const user = await User.findById(decoded.id);
    if (!user) {
      return errorResponse(res, 'User session no longer exists', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Session expired. Please log in again.', 401);
    }
    return errorResponse(res, 'Invalid token. Authorization failed.', 401);
  }
};
