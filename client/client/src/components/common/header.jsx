import React from 'react';
import { Link } from 'react-router-dom'; // Crucial for routing
import { MapPin, Bell, UserCircle } from 'lucide-react';

const Header = () => {
  return (
    <nav className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <MapPin size={20} />
          </div>
          <span className="font-bold text-xl text-gray-800">BrgySmart</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
          <Link to="/services" className="text-gray-600 hover:text-blue-600 font-medium">Services</Link>
          <Link to="/clearance" className="text-gray-600 hover:text-blue-600 font-medium">Clearance</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Bell className="text-gray-500 cursor-pointer" size={20} />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;