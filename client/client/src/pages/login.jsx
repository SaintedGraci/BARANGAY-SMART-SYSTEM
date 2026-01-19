import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Mail, Lock, ArrowLeft, LogIn } from 'lucide-react';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Note: We are only checking email and password. 
      // The backend will verify if this user is a 'resident'.
      const response = await axios.post('http://localhost:8081/login', {
        email: formData.email,
        password: formData.password,
        role: 'resident' // Hardcoded here so residents only can enter
      });
      
      if (response.data.success) {
        // Save user data to local storage or state
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/dashboard'); // Direct them to their portal
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      
      {/* Left Side: Resident Welcome Branding */}
      <div className="hidden lg:flex flex-col justify-between bg-slate-900 p-12 text-white relative overflow-hidden">
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-16">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <MapPin size={24} />
            </div>
            <span className="font-bold text-2xl tracking-tight">BrgySmart</span>
          </Link>

          <div className="max-w-md">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Welcome Back, <br /> Neighbor.
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Login to access your resident dashboard, check request statuses, 
               and view the latest community updates.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1"><LogIn size={14}/> Secure Resident Portal</span>
        </div>

        {/* Abstract background shape */}
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-sm">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <h2 className="text-3xl font-bold text-slate-900 mb-2">Resident Login</h2>
          <p className="text-slate-500 mb-8">Enter your credentials to access your account.</p>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-slate-400" size={20} />
                <input 
                  type="email" required
                  placeholder="name@email.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-xs font-bold text-blue-600 hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-slate-400" size={20} />
                <input 
                  type="password" required
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 mt-2 active:scale-[0.98]">
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-slate-600">
            Don't have an account? {' '}
            <Link to="/register" className="text-blue-600 font-bold hover:underline">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;