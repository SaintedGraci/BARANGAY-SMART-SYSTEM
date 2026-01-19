import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, User, Mail, Lock, ArrowLeft, ShieldCheck } from 'lucide-react';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'resident'
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const response = await axios.post('http://localhost:8081/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      
      if (response.data.success) {
        alert("Account created! Please login.");
        navigate('/'); // Redirect back to home/login
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      
      {/* Left Side: Branding & Info (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-between bg-blue-600 p-12 text-white relative overflow-hidden">
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-16 hover:opacity-80 transition-opacity">
            <div className="bg-white p-2 rounded-lg text-blue-600">
              <MapPin size={24} />
            </div>
            <span className="font-bold text-2xl tracking-tight">BrgySmart</span>
          </Link>

          <div className="max-w-md">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Join your digital <br /> community hall.
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed mb-8">
              Access barangay certificates, track blotter reports, and stay updated with official announcements—all in one secure place.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-blue-300" />
                <span>Secure Data Encryption</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-blue-300" />
                <span>Verified Resident Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-30"></div>
        
        <p className="relative z-10 text-sm text-blue-200">
          © 2026 BrgySmart System. Government Official Portal.
        </p>
      </div>

      {/* Right Side: Registration Form */}
      <div className="flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h2>
          <p className="text-slate-500 mb-8">Please fill in your details to get started.</p>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm border border-red-100 animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-slate-400" size={20} />
                <input 
                  type="text" required
                  placeholder="Juan Dela Cruz"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-slate-400" size={20} />
                <input 
                  type="email" required
                  placeholder="juan@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-slate-400" size={20} />
                  <input 
                    type="password" required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Confirm</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-slate-400" size={20} />
                  <input 
                    type="password" required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 mt-6 active:scale-[0.98]">
              Create My Account
            </button>
          </form>

          <p className="mt-8 text-center text-slate-600">
            Already have an account? {' '}
            <Link to="/" className="text-blue-600 font-bold hover:underline">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;