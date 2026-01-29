import api from './config';

// Authentication API endpoints
export const authAPI = {
  // Login for residents
  loginResident: async (credentials) => {
    try {
      const response = await api.post('/auth/login', {
        ...credentials,
        userType: 'resident'
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Login for barangay officials
  loginBarangay: async (credentials) => {
    try {
      const response = await api.post('/auth/login', {
        ...credentials,
        userType: 'barangay'
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Login for municipality officials
  loginMunicipality: async (credentials) => {
    try {
      const response = await api.post('/auth/login', {
        ...credentials,
        userType: 'municipality'
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Register new resident (only for barangay officials)
  registerResident: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('barangay');
      return response.data;
    } catch (error) {
      // Even if logout fails on server, clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('barangay');
      throw error;
    }
  },

  // Verify token
  verifyToken: async () => {
    try {
      const response = await api.get('/auth/verify');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await api.put('/auth/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Reset password
  resetPassword: async (resetData) => {
    try {
      const response = await api.post('/auth/reset-password', resetData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};