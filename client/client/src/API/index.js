// Main API exports
export { authAPI } from './auth';
export { residentsAPI } from './residents';
export { documentsAPI } from './documents';
export { barangayAPI } from './barangay';
export { announcementsAPI } from './announcements';
export { default as api } from './config';

// API utilities
export const apiUtils = {
  // Handle API errors consistently
  handleError: (error) => {
    if (error.response?.data?.message) {
      return error.response.data.message;
    } else if (error.response?.status === 401) {
      return 'Unauthorized access. Please login again.';
    } else if (error.response?.status === 403) {
      return 'Access forbidden. You do not have permission.';
    } else if (error.response?.status === 404) {
      return 'Resource not found.';
    } else if (error.response?.status >= 500) {
      return 'Server error. Please try again later.';
    } else if (error.code === 'NETWORK_ERROR') {
      return 'Network error. Please check your connection.';
    } else {
      return 'An unexpected error occurred.';
    }
  },

  // Format API response
  formatResponse: (response) => {
    return {
      success: response.success || true,
      data: response.data || response,
      message: response.message || 'Success'
    };
  },

  // Create form data for file uploads
  createFormData: (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] instanceof File) {
        formData.append(key, data[key]);
      } else if (Array.isArray(data[key])) {
        data[key].forEach((item, index) => {
          if (item instanceof File) {
            formData.append(`${key}[${index}]`, item);
          } else {
            formData.append(`${key}[${index}]`, JSON.stringify(item));
          }
        });
      } else {
        formData.append(key, JSON.stringify(data[key]));
      }
    });
    return formData;
  },

  // Download file from blob response
  downloadFile: (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
};