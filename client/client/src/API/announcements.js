import api from './config';

// Announcements API endpoints
export const announcementsAPI = {
  // Get all announcements
  getAllAnnouncements: async (params = {}) => {
    try {
      const response = await api.get('/announcements', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get recent announcements
  getRecentAnnouncements: async (limit = 5) => {
    try {
      const response = await api.get('/announcements/recent', { 
        params: { limit } 
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get announcement by ID
  getAnnouncementById: async (id) => {
    try {
      const response = await api.get(`/announcements/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new announcement (admin only)
  createAnnouncement: async (announcementData) => {
    try {
      const response = await api.post('/announcements', announcementData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update announcement (admin only)
  updateAnnouncement: async (id, updateData) => {
    try {
      const response = await api.put(`/announcements/${id}`, updateData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete announcement (admin only)
  deleteAnnouncement: async (id) => {
    try {
      const response = await api.delete(`/announcements/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};