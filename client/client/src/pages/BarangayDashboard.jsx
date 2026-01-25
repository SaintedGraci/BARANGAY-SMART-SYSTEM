import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, Users, Settings, LogOut, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BarangayDashboard = () => {
  const navigate = useNavigate();
  const [barangayData, setBarangayData] = useState(null);

  // Get barangay info from localStorage
  useEffect(() => {
    const barangay = JSON.parse(localStorage.getItem('barangay'));
    if (!barangay) {
      navigate('/barangay-login'); // Redirect to barangay login if not logged in
    } else {
      setBarangayData(barangay);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('barangay');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-100 font-bold text-xl text-emerald-600 flex items-center gap-2">
          <LayoutDashboard /> Barangay Portal
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-emerald-50 text-emerald-600 rounded-xl font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
            <FileText size={20} /> Document Requests
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
            <Users size={20} /> Resident Management
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
            <Settings size={20} /> Barangay Settings
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
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome, {barangayData?.name || barangayData?.barangayCode || 'Barangay'}!
            </h1>
            <p className="text-slate-500">Manage your barangay operations and resident services.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">{barangayData?.name || barangayData?.barangayCode}</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Barangay Unit</p>
            </div>
            <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
              {barangayData?.name?.charAt(0) || barangayData?.barangayCode?.charAt(0) || 'B'}
            </div>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Clock /></div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Pending Requests</p>
                <h3 className="text-2xl font-bold text-slate-900">12</h3>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl"><CheckCircle /></div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Processed Today</p>
                <h3 className="text-2xl font-bold text-slate-900">8</h3>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Users /></div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Active Residents</p>
                <h3 className="text-2xl font-bold text-slate-900">1,247</h3>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-50 text-red-600 rounded-xl"><AlertTriangle /></div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Urgent Issues</p>
                <h3 className="text-2xl font-bold text-slate-900">3</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Document Requests */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Document Requests</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                    JD
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Juan Dela Cruz</p>
                    <p className="text-sm text-slate-500">Barangay Clearance</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                  Pending
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">
                    MS
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Maria Santos</p>
                    <p className="text-sm text-slate-500">Certificate of Indigency</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Approved
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">
                    RP
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Roberto Perez</p>
                    <p className="text-sm text-slate-500">Business Permit</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  Processing
                </span>
              </div>
            </div>
            <button className="w-full mt-6 text-emerald-600 font-semibold hover:bg-emerald-50 py-2 rounded-xl transition-colors">
              View All Requests
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-slate-100 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left">
                <FileText className="text-emerald-600 mb-2" />
                <p className="font-semibold text-slate-800">Process Documents</p>
                <p className="text-xs text-slate-500">Review & approve requests</p>
              </button>
              <button className="p-4 border border-slate-100 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left">
                <Users className="text-emerald-600 mb-2" />
                <p className="font-semibold text-slate-800">Resident Records</p>
                <p className="text-xs text-slate-500">Manage resident data</p>
              </button>
              <button className="p-4 border border-slate-100 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left">
                <AlertTriangle className="text-emerald-600 mb-2" />
                <p className="font-semibold text-slate-800">Incident Reports</p>
                <p className="text-xs text-slate-500">Handle community issues</p>
              </button>
              <button className="p-4 border border-slate-100 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left">
                <Settings className="text-emerald-600 mb-2" />
                <p className="font-semibold text-slate-800">Settings</p>
                <p className="text-xs text-slate-500">Configure barangay info</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BarangayDashboard;