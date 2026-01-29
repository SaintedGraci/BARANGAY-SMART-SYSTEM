import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authAPI, apiUtils } from '../api';
import municipalityLogo from '../assets/alicia.jpg';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear message when user starts typing
    if (message) {
      setMessage('');
      setMessageType('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const response = await authAPI.loginResident(formData);

      if (response.success) {
        // Save user data and token
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        setMessage('Login successful! Redirecting...');
        setMessageType('success');
        
        // Redirect after a short delay
        setTimeout(() => {
          navigate('/resident-dashboard');
        }, 1500);
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = apiUtils.handleError(err);
      setMessage(errorMessage);
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-8 py-10 text-white text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white/20 p-1">
                <img 
                  src={municipalityLogo} 
                  alt="Municipality of Alicia Logo" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-blue-100">Sign in to your resident account</p>
          </div>

          {/* Form */}
          <div className="p-8">
            {message && (
              <div className={`p-4 rounded-xl mb-6 flex items-start gap-3 ${
                messageType === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-700' 
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                <AlertCircle size={20} className={`mt-0.5 flex-shrink-0 ${
                  messageType === 'success' ? 'text-green-500' : 'text-red-500'
                }`} />
                <div>
                  <p className="font-medium text-sm">
                    {messageType === 'success' ? 'Success!' : 'Login Failed'}
                  </p>
                  <p className="text-sm opacity-90">{message}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-12 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg"
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
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
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

            {/* Additional Links */}
            <div className="mt-8 space-y-4">
              <div className="text-center">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                  Forgot your password?
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2024 Municipality of Alicia. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;