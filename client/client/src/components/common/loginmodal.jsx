import { useState } from 'react';
import { X, Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { authAPI, apiUtils } from '../../api';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errorMessage) setErrorMessage('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await authAPI.loginResident(formData);

      if (response.success) {
        // Save user data and token
        localStorage.setItem('token', response.token);
        
        // Save user data with appropriate key based on user type
        if (response.user.userType === 'barangay') {
          localStorage.setItem('barangay', JSON.stringify(response.user));
        } else {
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        
        // Success feedback
        const userName = response.user.firstName || 'User';
        
        // Close modal first
        onClose();
        
        // Navigate based on user type
        setTimeout(() => {
          if (response.user.userType === 'barangay') {
            navigate('/barangay-dashboard');
          } else {
            navigate('/resident-dashboard');
          }
        }, 100);

        // Show success message
        setTimeout(() => {
          alert(`Welcome back, ${userName}!`);
        }, 200);
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = apiUtils.handleError(err);
      setErrorMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative transform transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-8 py-10 text-white">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <LogIn size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
          <p className="text-blue-100 text-center text-sm">Sign in to your account</p>
        </div>

        {/* Form */}
        <div className="p-8">
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 flex items-start gap-3">
              <AlertCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Login Failed</p>
                <p className="text-sm opacity-90">{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-800 text-center">
              <strong>Note:</strong> Barangay officials should use the dedicated barangay login portal.
            </p>
          </div>

          {/* Forgot Password Link */}
          <div className="text-center mt-6">
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
              Forgot your password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;