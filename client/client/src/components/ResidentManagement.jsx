import React, { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  CheckCircle,
  Loader,
  ChevronLeft,
  ChevronRight,
  X,
  Calendar
} from 'lucide-react';
import { residentsAPI, apiUtils } from '../api';
import AddResidentModal from './modals/AddResidentModal';

const ResidentManagement = ({ darkMode }) => {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0
  });
  const [stats, setStats] = useState({
    total: 0,
    thisMonth: 0,
    thisWeek: 0,
    today: 0
  });

  // Form state for editing residents only
  const [editFormData, setEditFormData] = useState({
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

  // Fetch residents data
  const fetchResidents = async (page = 1, search = '') => {
    try {
      setLoading(true);
      const response = await residentsAPI.getAllResidents({
        page,
        limit: 10,
        search
      });
      
      setResidents(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Error fetching residents:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch resident statistics
  const fetchStats = async () => {
    try {
      const response = await residentsAPI.getResidentStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchResidents();
    fetchStats();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      fetchResidents(1, query);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    fetchResidents(page, searchQuery);
  };

  // Validate form for editing
  const validateEditForm = () => {
    const errors = {};
    
    if (!editFormData.firstName.trim()) errors.firstName = 'First name is required';
    if (!editFormData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!editFormData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(editFormData.email)) errors.email = 'Email is invalid';
    
    if (editFormData.password && editFormData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEditForm()) return;

    setSubmitting(true);
    try {
      await residentsAPI.updateResident(selectedResident.id, editFormData);
      alert('Resident updated successfully!');
      
      // Reset form and close modal
      resetEditForm();
      setShowEditModal(false);
      
      // Refresh data
      fetchResidents(pagination.currentPage, searchQuery);
      fetchStats();
    } catch (error) {
      const errorMessage = apiUtils.handleError(error);
      alert(`Error: ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Reset edit form
  const resetEditForm = () => {
    setEditFormData({
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
    setSelectedResident(null);
  };

  // Handle edit
  const handleEdit = (resident) => {
    const [firstName, ...lastNameParts] = resident.name.split(' ');
    setEditFormData({
      firstName: firstName || '',
      lastName: lastNameParts.join(' ') || '',
      email: resident.email || '',
      password: '',
      phone: resident.phone || '',
      address: resident.address || '',
      dateOfBirth: resident.dateOfBirth || '',
      gender: resident.gender || '',
      civilStatus: resident.civilStatus || '',
      occupation: resident.occupation || ''
    });
    setSelectedResident(resident);
    setShowEditModal(true);
  };

  // Handle successful resident creation
  const handleAddSuccess = () => {
    fetchResidents(pagination.currentPage, searchQuery);
    fetchStats();
  };

  // Handle delete
  const handleDelete = async (resident) => {
    if (!confirm(`Are you sure you want to delete ${resident.name}?`)) return;

    try {
      await residentsAPI.deleteResident(resident.id);
      alert('Resident deleted successfully!');
      fetchResidents(pagination.currentPage, searchQuery);
      fetchStats();
    } catch (error) {
      const errorMessage = apiUtils.handleError(error);
      alert(`Error: ${errorMessage}`);
    }
  };

  // EditResidentModal Component
  const EditResidentModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className={`w-full max-w-2xl rounded-2xl shadow-2xl ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        } max-h-[90vh] overflow-y-auto`}>
          <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Edit Resident
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

          <form onSubmit={handleEditSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  First Name *
                </label>
                <input
                  type="text"
                  value={editFormData.firstName}
                  onChange={(e) => setEditFormData({...editFormData, firstName: e.target.value})}
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
                  value={editFormData.lastName}
                  onChange={(e) => setEditFormData({...editFormData, lastName: e.target.value})}
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
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
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
                  Password
                </label>
                <input
                  type="password"
                  value={editFormData.password}
                  onChange={(e) => setEditFormData({...editFormData, password: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border transition-colors ${
                    formErrors.password 
                      ? 'border-red-500 focus:ring-red-500' 
                      : darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                        : 'bg-gray-50 border-gray-200 focus:ring-blue-500'
                  } focus:ring-2 focus:border-transparent outline-none`}
                  placeholder="Leave blank to keep current password"
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
                  value={editFormData.phone}
                  onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
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
                  value={editFormData.gender}
                  onChange={(e) => setEditFormData({...editFormData, gender: e.target.value})}
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
                  value={editFormData.dateOfBirth}
                  onChange={(e) => setEditFormData({...editFormData, dateOfBirth: e.target.value})}
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
                  value={editFormData.civilStatus}
                  onChange={(e) => setEditFormData({...editFormData, civilStatus: e.target.value})}
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
                  value={editFormData.occupation}
                  onChange={(e) => setEditFormData({...editFormData, occupation: e.target.value})}
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
                value={editFormData.address}
                onChange={(e) => setEditFormData({...editFormData, address: e.target.value})}
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
                    Updating...
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} />
                    Update Resident
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
            <Users size={24} />
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Resident Management
            </h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage resident accounts and information
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
        >
          <Plus size={20} />
          Add Resident
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Residents', value: stats.total, icon: Users, color: 'blue' },
          { label: 'This Month', value: stats.thisMonth, icon: Calendar, color: 'green' },
          { label: 'This Week', value: stats.thisWeek, icon: Calendar, color: 'purple' },
          { label: 'Today', value: stats.today, icon: Calendar, color: 'orange' }
        ].map((stat, index) => (
          <div key={index} className={`p-6 rounded-2xl transition-all duration-300 hover:scale-105 ${
            darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/80 border border-white/20'
          } backdrop-blur-xl shadow-lg hover:shadow-xl`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className={`p-6 rounded-2xl ${
        darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/80 border border-white/20'
      } backdrop-blur-xl shadow-lg`}>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} size={20} />
            <input
              type="text"
              placeholder="Search residents by name or email..."
              value={searchQuery}
              onChange={handleSearch}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500' 
                  : 'bg-gray-50 border-gray-200 placeholder-gray-500 focus:ring-blue-500'
              } focus:ring-2 focus:border-transparent outline-none`}
            />
          </div>
          <button className={`p-3 rounded-xl transition-colors ${
            darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
          }`}>
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Residents Table */}
      <div className={`rounded-2xl overflow-hidden ${
        darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/80 border border-white/20'
      } backdrop-blur-xl shadow-lg`}>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader size={32} className="animate-spin text-blue-500" />
          </div>
        ) : residents.length === 0 ? (
          <div className="text-center py-12">
            <Users size={48} className={`mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <p className={`text-lg font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No residents found
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              {searchQuery ? 'Try adjusting your search criteria' : 'Start by adding your first resident'}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                  <tr>
                    <th className={`px-6 py-4 text-left text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Resident
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Joined
                    </th>
                    <th className={`px-6 py-4 text-right text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {residents.map((resident) => (
                    <tr key={resident.id} className={`transition-colors ${
                      darkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'
                    }`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            {resident.name.charAt(0)}
                          </div>
                          <div>
                            <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {resident.name}
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              ID: {resident.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className={`px-6 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {resident.email}
                      </td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(resident.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(resident)}
                            className={`p-2 rounded-lg transition-colors ${
                              darkMode ? 'hover:bg-gray-700 text-gray-400 hover:text-blue-400' : 'hover:bg-blue-50 text-gray-600 hover:text-blue-600'
                            }`}
                            title="Edit resident"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(resident)}
                            className={`p-2 rounded-lg transition-colors ${
                              darkMode ? 'hover:bg-gray-700 text-gray-400 hover:text-red-400' : 'hover:bg-red-50 text-gray-600 hover:text-red-600'
                            }`}
                            title="Delete resident"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className={`px-6 py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Showing {residents.length} of {pagination.totalRecords} residents
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={!pagination.hasPrev}
                      className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className={`px-3 py-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {pagination.currentPage} of {pagination.totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={!pagination.hasNext}
                      className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <AddResidentModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddSuccess}
        darkMode={darkMode}
      />
      
      <EditResidentModal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          resetEditForm();
        }}
      />
    </div>
  );
};

export default ResidentManagement;