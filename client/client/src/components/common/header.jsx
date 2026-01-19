import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bell } from 'lucide-react';

const Header = () => {
  return (
    <nav className="fixed w-full z-[90] top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <MapPin size={20} />
          </div>
          <span className="font-bold text-xl text-slate-800 tracking-tight">BrgySmart</span>
        </Link>

        {/* Navigation Actions */}
        <div className="flex items-center gap-3">
          <Bell className="hidden sm:block text-gray-400 cursor-pointer hover:text-blue-600 mr-2" size={20} />
          
          {/* Login Link - Navigates to /login page */}
          <Link to="/login">
            <button className="text-slate-600 px-4 py-2 font-semibold hover:text-blue-600 transition-all">
              Login
            </button>
          </Link>

          {/* Join Community Link - Navigates to /register page */}
          <Link to="/register">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-100 active:scale-95">
              Join Community
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;