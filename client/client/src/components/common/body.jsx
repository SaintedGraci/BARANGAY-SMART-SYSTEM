import React from 'react';
import barangayImg from '../../assets/barangay.jpg';
import { Link } from 'react-router-dom';
const Body = () => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img 
          src={barangayImg} 
          alt="Barangay Hall" 
          className="w-full h-full object-cover scale-105 animate-pulse-slow"
        />
        {/* Modern Multi-layer Overlay */}
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/90"></div>
      </div>

      {/* Hero Content Area */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 rounded-full backdrop-blur-md">
            Official Community Portal
          </span>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
            Welcome to the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Barangay System
            </span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl font-light">
            Empowering our community through digital innovation. Access public records, 
            request documents, and stay informed with real-time updates.
          </p>

          
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/register">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95">
              Get Started
            </button>
  </Link>

            <Link to="/learnmore">
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-bold backdrop-blur-md transition-all active:scale-95">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900 to-transparent z-10"></div>
    </main>
  );
};

export default Body;