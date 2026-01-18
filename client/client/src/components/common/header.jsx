import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bell } from 'lucide-react';
import LoginModal from './loginmodal'// Import here

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className="fixed w-full z-[90] top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <MapPin size={20} />
            </div>
            <span className="font-bold text-xl text-slate-800">BrgySmart</span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Bell className="text-gray-400 cursor-pointer hover:text-blue-600 transition-colors" size={20} />
            <button 
              onClick={() => setIsModalOpen(true)} // Open modal on click
              className="bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-all cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Show Modal if state is true */}
      {isModalOpen && <LoginModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Header;