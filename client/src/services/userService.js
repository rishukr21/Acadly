import api from './api';

export const userService = {
  // Update user profile and academic info
  updateProfile: async (profileData) => {
    return api.put('/users/profile', profileData);
  },

  // Update theme preference
  updateTheme: async (theme) => {
    return api.put('/users/theme', { theme });
  },
};
