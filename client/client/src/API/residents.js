import api from './config';

// Residents API endpoints
export const residentsAPI = {
  // Get all residents (for barangay officials)
  getAllResidents: async (params = {}) => {
    try {
      const response = await api.get('/residents', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new resident (for barangay officials)
  createResident: async (residentData) => {
    try {
      const response = await api.post('/residents', residentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get resident by ID
  getResidentById: async (id) => {
    try {
      const response = await api.get(`/residents/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update resident information
  updateResident: async (id, residentData) => {
    try {
      const response = await api.put(`/residents/${id}`, residentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete resident account
  deleteResident: async (id) => {
    try {
      const response = await api.delete(`/residents/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get resident statistics
  getResidentStats: async () => {
    try {
      const response = await api.get('/residents/stats/summary');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get current resident profile
  getProfile: async () => {
    try {
      const response = await api.get('/residents/profile');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update resident profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/residents/profile', profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Search residents
  searchResidents: async (query) => {
    try {
      const response = await api.get('/residents', { 
        params: { search: query } 
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Upload resident photo
  uploadPhoto: async (id, photoFile) => {
    try {
      const formData = new FormData();
      formData.append('photo', photoFile);
      
      const response = await api.post(`/residents/${id}/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};