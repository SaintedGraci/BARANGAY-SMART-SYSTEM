import React from 'react';
import Header from '../components/common/header.jsx';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header called inside the page */}
      <Header />
      
      {/* Main Content Area */}
      <main className="pt-20 px-6 max-w-7xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to the Barangay System
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Manage residents, certificates, and community announcements all in one place.
          </p>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="font-bold text-blue-700">Total Residents</h3>
              <p className="text-2xl font-black">1,240</p>
            </div>
            {/* Add more stats cards here */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;