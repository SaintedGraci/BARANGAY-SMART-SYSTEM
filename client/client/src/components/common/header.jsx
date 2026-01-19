import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bell } from 'lucide-react';
import LoginModal from './loginmodal';
import RegisterModal from './RegisterModal'; // Import the new register modal

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <nav className="fixed w-full z-[90] top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <MapPin size={20} />
            </div>
            <span className="font-bold text-xl text-slate-800">BrgySmart</span>
          </Link>

          <div className="flex items-center gap-3">
            <Bell className="text-gray-400 cursor-pointer hover:text-blue-600 mr-2" size={20} />
            
            {/* Login Button */}
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="text-slate-600 px-4 py-2 font-semibold hover:text-blue-600 transition-all"
            >
              Login
            </button>

            {/* Register Button */}
            <button 
              onClick={() => setIsRegisterOpen(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
            >
              Join Community
            </button>
          </div>
        </div>
      </nav>

      {/* Modals */}
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
      {isRegisterOpen && <RegisterModal onClose={() => setIsRegisterOpen(false)} />}
    </>
  );
};

export default Header;