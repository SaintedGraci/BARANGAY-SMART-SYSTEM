import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, Megaphone, User, LogOut, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResidentDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // Get user info from localStorage (saved during login)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/'); // Redirect to home if not logged in
    } else {
      setUserData(user);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-100 font-bold text-xl text-blue-600 flex items-center gap-2">
          <LayoutDashboard /> BrgySmart
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
            <FileText size={20} /> My Requests
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
            <Megaphone size={20} /> Announcements
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
            <User size={20} /> Profile
          </button>
        </nav>
        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome, {userData?.name || 'Resident'}!</h1>
            <p className="text-slate-500">Here is what's happening in your barangay today.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">{userData?.name}</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider">{userData?.role}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
              {userData?.name?.charAt(0)}
            </div>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Clock /></div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Pending Requests</p>
                <h3 className="text-2xl font-bold text-slate-900">2</h3>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl"><CheckCircle /></div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Approved Permits</p>
                <h3 className="text-2xl font-bold text-slate-900">5</h3>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Megaphone /></div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Active Events</p>
                <h3 className="text-2xl font-bold text-slate-900">1</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Services & Announcements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Section */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Request Services</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-slate-100 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all text-left">
                <FileText className="text-blue-600 mb-2" />
                <p className="font-semibold text-slate-800">Clearance</p>
                <p className="text-xs text-slate-500">Barangay Clearance</p>
              </button>
              <button className="p-4 border border-slate-100 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all text-left">
                <FileText className="text-blue-600 mb-2" />
                <p className="font-semibold text-slate-800">Indigency</p>
                <p className="text-xs text-slate-500">Certificate of Indigency</p>
              </button>
              <button className="p-4 border border-slate-100 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all text-left">
                <FileText className="text-blue-600 mb-2" />
                <p className="font-semibold text-slate-800">Residency</p>
                <p className="text-xs text-slate-500">Proof of Residency</p>
              </button>
              <button className="p-4 border border-slate-100 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all text-left">
                <FileText className="text-blue-600 mb-2" />
                <p className="font-semibold text-slate-800">Business</p>
                <p className="text-xs text-slate-500">Barangay Permit</p>
              </button>
            </div>
          </div>

          {/* Announcement Feed */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Latest Announcements</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 ring-4 ring-blue-50"></div>
                <div>
                  <p className="font-bold text-slate-800">Community Clean-up Drive</p>
                  <p className="text-sm text-slate-500 leading-relaxed">Join us this Saturday, Jan 24th, for our monthly environmental campaign.</p>
                  <p className="text-xs text-slate-400 mt-2">Posted 2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-2 w-2 bg-slate-300 rounded-full mt-2 ring-4 ring-slate-50"></div>
                <div>
                  <p className="font-bold text-slate-800">Free Vaccination Clinic</p>
                  <p className="text-sm text-slate-500 leading-relaxed">The Brgy. Health Center will be offering free booster shots starting tomorrow.</p>
                  <p className="text-xs text-slate-400 mt-2">Posted Yesterday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResidentDashboard;