import api from './api';

export const authService = {
  // Register new account
  register: async (userData) => {
    return api.post('/auth/register', userData);
  },

  // Login with email and password
  login: async (credentials) => {
    return api.post('/auth/login', credentials);
  },

  // Google OAuth verification
  googleLogin: async (credential) => {
    return api.post('/auth/google', { credential });
  },

  // Fetch current authenticated user
  getCurrentUser: async () => {
    return api.get('/auth/me');
  },

  // Logout session
  logout: async () => {
    return api.post('/auth/logout');
  },
};
