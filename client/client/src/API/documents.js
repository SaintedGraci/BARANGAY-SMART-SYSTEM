import api from './config';

// Documents API endpoints
export const documentsAPI = {
  // Get all document requests
  getAllRequests: async (params = {}) => {
    try {
      const response = await api.get('/documents/requests', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get document request by ID
  getRequestById: async (id) => {
    try {
      const response = await api.get(`/documents/requests/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new document request
  createRequest: async (requestData) => {
    try {
      const response = await api.post('/documents/requests', requestData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update document request status
  updateRequestStatus: async (id, status, remarks = '') => {
    try {
      const response = await api.put(`/documents/requests/${id}/status`, {
        status,
        remarks
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user's document requests
  getMyRequests: async () => {
    try {
      const response = await api.get('/documents/my-requests');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get pending requests (for barangay officials)
  getPendingRequests: async () => {
    try {
      const response = await api.get('/documents/requests/pending');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Approve document request
  approveRequest: async (id, approvalData) => {
    try {
      const response = await api.put(`/documents/requests/${id}/approve`, approvalData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Reject document request
  rejectRequest: async (id, rejectionReason) => {
    try {
      const response = await api.put(`/documents/requests/${id}/reject`, {
        reason: rejectionReason
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Download document
  downloadDocument: async (id) => {
    try {
      const response = await api.get(`/documents/requests/${id}/download`, {
        responseType: 'blob'
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get document types
  getDocumentTypes: async () => {
    try {
      const response = await api.get('/documents/types');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Upload supporting documents
  uploadSupportingDocs: async (requestId, files) => {
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`documents`, file);
      });
      
      const response = await api.post(`/documents/requests/${requestId}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get document statistics
  getStatistics: async () => {
    try {
      const response = await api.get('/documents/statistics');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};