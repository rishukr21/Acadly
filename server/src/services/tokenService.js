import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

export const COOKIE_NAME = 'acadly_token';

/**
 * Generate a JWT token for a given user ID
 */
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN || '7d',
  });
};

/**
 * Set HTTP-only secure cookie on response object
 */
export const setTokenCookie = (res, token) => {
  const isProduction = ENV.NODE_ENV === 'production';
  
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction, // HTTPS in production
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    path: '/',
  });
};

/**
 * Clear the authentication cookie
 */
export const clearTokenCookie = (res) => {
  const isProduction = ENV.NODE_ENV === 'production';
  
  res.cookie(COOKIE_NAME, '', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    expires: new Date(0),
    path: '/',
  });
};
