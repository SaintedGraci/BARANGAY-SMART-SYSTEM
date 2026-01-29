import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Shield, Building2, AlertCircle } from 'lucide-react';
import { authAPI, apiUtils } from '../api';
import municipalityLogo from '../assets/alicia.jpg';

const BarangayLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authAPI.loginBarangay(formData);
      
      if (response.success) {
        // Save barangay data and token
        localStorage.setItem('token', response.token);
        localStorage.setItem('barangay', JSON.stringify(response.user)); // Save as 'barangay' for consistency
        
        // Navigate to barangay dashboard
        navigate('/barangay-dashboard');
        
        // Show welcome message
        setTimeout(() => {
          alert(`Welcome to ${response.user.name} Dashboard!`);
        }, 200);
      }
    } catch (err) {
      const errorMessage = apiUtils.handleError(err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      
      {/* Left Side: Barangay Branding */}
      <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-emerald-600 to-emerald-700 p-12 text-white relative overflow-hidden">
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 mb-16 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/20 p-1">
              <img 
                src={municipalityLogo} 
                alt="Municipality of Alicia Logo" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight">Municipality of Alicia</span>
              <span className="text-sm text-emerald-200">Barangay Portal</span>
            </div>
          </Link>

          <div className="max-w-md">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Barangay <br /> Access Portal
            </h1>
            <p className="text-emerald-100 text-lg leading-relaxed mb-8">
              Secure login for barangay entities to manage resident services, 
              process documents, and coordinate with the municipality.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="text-emerald-300" />
                <span>Authorized Barangay Access</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="text-emerald-300" />
                <span>Secure Entity Authentication</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="text-emerald-300" />
                <span>Municipality Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-400 rounded-full blur-3xl opacity-30"></div>

        <div className="relative z-10 text-sm text-emerald-200">
          <p>© 2024 Municipality of Alicia. Authorized Barangay Access.</p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 mb-8 transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-emerald-100 p-2">
                <img 
                  src={municipalityLogo} 
                  alt="Municipality of Alicia Logo" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Barangay Login</h2>
            <p className="text-slate-500">Enter your barangay entity credentials</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 flex items-start gap-3">
              <AlertCircle size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Login Failed</p>
                <p className="text-sm opacity-90">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Barangay Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-slate-400" size={20} />
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="barangaytabao@municipality.com"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                />
              </div>
              <p className="text-xs text-slate-500">Use your official barangay email address</p>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <button 
                  type="button"
                  className="text-xs font-bold text-emerald-600 hover:underline"
                  onClick={() => alert('Contact your municipality administrator for password reset')}
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-slate-400" size={20} />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter barangay password"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-12 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-bold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg shadow-emerald-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <Building2 size={20} />
                  Access Barangay System
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-start gap-3">
              <Shield size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-800">Authorized Access Only</p>
                <p className="text-xs text-amber-700 mt-1">
                  This portal is restricted to official barangay entities. Unauthorized access is prohibited.
                </p>
              </div>
            </div>
          </div>

          {/* Help Text */}
          <div className="text-center mt-6">
            <p className="text-xs text-slate-500">
              Need help? Contact your municipality administrator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarangayLogin;