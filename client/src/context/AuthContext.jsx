import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check existing session on application start
  const checkAuth = useCallback(async () => {
    try {
      const response = await authService.getCurrentUser();
      if (response.success && response.data?.user) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Standard Email/Password Login
  const login = async (credentials) => {
    const response = await authService.login(credentials);
    if (response.success && response.data?.user) {
      setUser(response.data.user);
      return response.data.user;
    }
    throw new Error(response.message || 'Login failed');
  };

  // Standard Email/Password Registration
  const register = async (userData) => {
    const response = await authService.register(userData);
    if (response.success && response.data?.user) {
      setUser(response.data.user);
      return response.data.user;
    }
    throw new Error(response.message || 'Registration failed');
  };

  // Google OAuth verification
  const googleLogin = async (credential) => {
    const response = await authService.googleLogin(credential);
    if (response.success && response.data?.user) {
      setUser(response.data.user);
      return response.data.user;
    }
    throw new Error(response.message || 'Google authentication failed');
  };

  // Update user state after profile edit or onboarding step
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  // Logout
  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        googleLogin,
        logout,
        updateUser,
        refreshUser: checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
