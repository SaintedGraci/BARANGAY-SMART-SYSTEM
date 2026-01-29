import api from './config';

// Barangay API endpoints
export const barangayAPI = {
  // Get barangay dashboard data
  getDashboardData: async () => {
    try {
      const response = await api.get('/barangay/dashboard');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get barangay profile
  getProfile: async () => {
    try {
      const response = await api.get('/barangay/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update barangay profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/barangay/profile', profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get barangay statistics
  getStatistics: async (period = 'month') => {
    try {
      const response = await api.get('/barangay/statistics', {
        params: { period }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get recent activities
  getRecentActivities: async (limit = 10) => {
    try {
      const response = await api.get('/barangay/activities', {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get barangay officials
  getOfficials: async () => {
    try {
      const response = await api.get('/barangay/officials');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add barangay official
  addOfficial: async (officialData) => {
    try {
      const response = await api.post('/barangay/officials', officialData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update barangay official
  updateOfficial: async (id, officialData) => {
    try {
      const response = await api.put(`/barangay/officials/${id}`, officialData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Remove barangay official
  removeOfficial: async (id) => {
    try {
      const response = await api.delete(`/barangay/officials/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get barangay settings
  getSettings: async () => {
    try {
      const response = await api.get('/barangay/settings');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update barangay settings
  updateSettings: async (settings) => {
    try {
      const response = await api.put('/barangay/settings', settings);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Generate reports
  generateReport: async (reportType, params = {}) => {
    try {
      const response = await api.post('/barangay/reports/generate', {
        type: reportType,
        ...params
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get incident reports
  getIncidentReports: async (params = {}) => {
    try {
      const response = await api.get('/barangay/incidents', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create incident report
  createIncidentReport: async (incidentData) => {
    try {
      const response = await api.post('/barangay/incidents', incidentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update incident report
  updateIncidentReport: async (id, incidentData) => {
    try {
      const response = await api.put(`/barangay/incidents/${id}`, incidentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};