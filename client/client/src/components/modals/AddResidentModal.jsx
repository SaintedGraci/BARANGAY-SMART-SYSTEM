import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Users,
  CheckCircle,
  Loader
} from 'lucide-react';
import { residentsAPI, apiUtils } from '../../api';

const AddResidentModal = ({ show, onClose, onSuccess, darkMode }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    civilStatus: '',
    occupation: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.password.trim()) errors.password = 'Password is required';
    else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await residentsAPI.createResident(formData);
      alert('Resident created successfully!');
      
      // Reset form and close modal
      resetForm();
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      const errorMessage = apiUtils.handleError(error);
      alert(`Error: ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      dateOfBirth: '',
      gender: '',
      civilStatus: '',
      occupation: ''
    });
    setFormErrors({});
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`w-full max-w-2xl rounded-2xl shadow-2xl ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      } max-h-[90vh] overflow-y-auto`}>
        <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Add New Resident
            </h3>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                First Name *
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                  formErrors.firstName 
                    ? 'border-red-500 focus:ring-red-500' 
                    : darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                      : 'bg-gray-50 border-gray-200 focus:ring-blue-500'
                } focus:ring-2 focus:border-transparent outline-none`}
                placeholder="Enter first name"
              />
              {formErrors.firstName && (
                <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Last Name *
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                  formErrors.lastName 
                    ? 'border-red-500 focus:ring-red-500' 
                    : darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                      : 'bg-gray-50 border-gray-200 focus:ring-blue-500'
                } focus:ring-2 focus:border-transparent outline-none`}
                placeholder="Enter last name"
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                  formErrors.email 
                    ? 'border-red-500 focus:ring-red-500' 
                    : darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                      : 'bg-gray-50 border-gray-200 focus:ring-blue-500'
                } focus:ring-2 focus:border-transparent outline-none`}
                placeholder="Enter email address"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Password *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                  formErrors.password 
                    ? 'border-red-500 focus:ring-red-500' 
                    : darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                      : 'bg-gray-50 border-gray-200 focus:ring-blue-500'
                } focus:ring-2 focus:border-transparent outline-none`}
                placeholder="Enter password"
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                    : 'bg-gray-50 border-gray-200 focus:ring-blue-500'
                } focus:ring-2 focus:border-transparent outline-none`}
                placeholder="Enter phone number"
              />
            </div>

            {/* Gender */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                    : 'bg-gray-50 border-gray-200 focus:ring-blue-500'
                } focus:ring-2 focus:border-transparent outline-none`}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                    : 'bg-gray-50 border-gray-200 focus:ring-blue-500'
                } focus:ring-2 focus:border-transparent outline-none`}
              />
            </div>

            {/* Civil Status */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Civil Status
              </label>
              <select
                value={formData.civilStatus}
                onChange={(e) => setFormData({...formData, civilStatus: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                    : 'bg-gray-50 border-gray-200 focus:ring-blue-500'
                } focus:ring-2 focus:border-transparent outline-none`}
              >
                <option value="">Select civil status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
              </select>
            </div>

            {/* Occupation */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Occupation
              </label>
              <input
                type="text"
                value={formData.occupation}
                onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                    : 'bg-gray-50 border-gray-200 focus:ring-blue-500'
                } focus:ring-2 focus:border-transparent outline-none`}
                placeholder="Enter occupation"
              />
            </div>
          </div>

          {/* Address */}
          <div className="mt-4">
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Address
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              rows={3}
              className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                  : 'bg-gray-50 border-gray-200 focus:ring-blue-500'
              } focus:ring-2 focus:border-transparent outline-none resize-none`}
              placeholder="Enter complete address"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <CheckCircle size={16} />
                  Create Resident
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResidentModal;