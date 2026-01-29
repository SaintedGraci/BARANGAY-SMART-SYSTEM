import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Bell,
  Search,
  Calendar,
  TrendingUp,
  MapPin,
  Eye,
  Plus,
  Filter,
  MoreVertical,
  Home,
  Shield,
  Activity,
  Menu,
  X,
  Moon,
  Sun,
  ChevronDown,
  Zap,
  BarChart3,
  MessageSquare,
  Star,
  Bookmark,
  Download,
  Upload,
  RefreshCw,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authAPI, barangayAPI, apiUtils } from '../api';
import municipalityLogo from '../assets/alicia.jpg';
import ResidentManagement from '../components/ResidentManagement';
import AddResidentModal from '../components/modals/AddResidentModal';

const BarangayDashboard = () => {
  const navigate = useNavigate();
  const [barangayData, setBarangayData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(5);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showAddResidentModal, setShowAddResidentModal] = useState(false);

  // Get barangay info from localStorage
  useEffect(() => {
    const barangay = JSON.parse(localStorage.getItem('barangay')) || JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    
    if (!barangay || !token) {
      navigate('/barangay-login');
    } else {
      if (barangay.userType !== 'barangay') {
        navigate('/barangay-login');
      } else {
        setBarangayData(barangay);
      }
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/');
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, active: true },
    { id: 'documents', label: 'Document Requests', icon: FileText, badge: '12', color: 'bg-amber-500' },
    { id: 'residents', label: 'Resident Management', icon: Users },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'incidents', label: 'Incident Reports', icon: AlertTriangle, badge: '3', color: 'bg-red-500' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '7', color: 'bg-blue-500' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const quickStats = [
    {
      title: 'Pending Requests',
      value: '12',
      change: '+2 from yesterday',
      icon: Clock,
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      trend: 'up',
      percentage: '+15%'
    },
    {
      title: 'Processed Today',
      value: '8',
      change: '+15% from last week',
      icon: CheckCircle,
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      trend: 'up',
      percentage: '+23%'
    },
    {
      title: 'Active Residents',
      value: '1,247',
      change: '+23 new this month',
      icon: Users,
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      trend: 'up',
      percentage: '+8%'
    },
    {
      title: 'Urgent Issues',
      value: '3',
      change: '-2 from yesterday',
      icon: AlertTriangle,
      color: 'from-red-400 to-pink-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      trend: 'down',
      percentage: '-40%'
    }
  ];

  const recentRequests = [
    {
      id: 1,
      name: 'Juan Dela Cruz',
      document: 'Barangay Clearance',
      status: 'pending',
      time: '2 hours ago',
      avatar: 'JD',
      priority: 'high'
    },
    {
      id: 2,
      name: 'Maria Santos',
      document: 'Certificate of Indigency',
      status: 'approved',
      time: '4 hours ago',
      avatar: 'MS',
      priority: 'medium'
    },
    {
      id: 3,
      name: 'Roberto Perez',
      document: 'Business Permit',
      status: 'processing',
      time: '6 hours ago',
      avatar: 'RP',
      priority: 'low'
    },
    {
      id: 4,
      name: 'Ana Garcia',
      document: 'Residency Certificate',
      status: 'pending',
      time: '1 day ago',
      avatar: 'AG',
      priority: 'medium'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
    }`}>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-72 z-50 transition-all duration-300 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 ${
        darkMode 
          ? 'bg-gray-800/95 border-gray-700' 
          : 'bg-white/95 border-slate-200'
      } backdrop-blur-xl border-r shadow-2xl`}>
        
        {/* Logo Section */}
        <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-slate-100'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-blue-500/20">
                <img 
                  src={municipalityLogo} 
                  alt="Municipality Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  Barangay Portal
                </h2>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                  Municipality of Alicia
                </p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-200 group ${
                activeTab === item.id
                  ? darkMode
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200'
                  : darkMode
                    ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={`transition-transform duration-200 ${
                  activeTab === item.id ? 'scale-110' : 'group-hover:scale-105'
                }`} />
                {item.label}
              </div>
              {item.badge && (
                <span className={`px-2 py-1 text-xs rounded-full font-semibold flex items-center gap-1 ${
                  activeTab === item.id 
                    ? 'bg-white/20 text-white' 
                    : item.color ? `${item.color} text-white` : 'bg-red-100 text-red-600'
                }`}>
                  {item.badge}
                  <div className="w-1 h-1 bg-current rounded-full animate-pulse" />
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-slate-100'}`}>
          <div className={`flex items-center gap-3 p-3 rounded-xl mb-3 ${
            darkMode ? 'bg-gray-700/50' : 'bg-slate-50'
          }`}>
            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold ring-2 ring-blue-500/20">
              {barangayData?.name?.charAt(0) || barangayData?.barangayCode?.charAt(0) || 'B'}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-semibold truncate ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                {barangayData?.name || barangayData?.barangayCode || 'Barangay'}
              </p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                Barangay Official
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              darkMode 
                ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300' 
                : 'text-red-500 hover:bg-red-50'
            }`}
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-72'} min-h-screen`}>
        
        {/* Top Header */}
        <header className={`sticky top-0 z-30 backdrop-blur-xl border-b transition-colors ${
          darkMode 
            ? 'bg-gray-800/95 border-gray-700' 
            : 'bg-white/95 border-slate-200'
        } shadow-sm`}>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`lg:hidden p-2 rounded-xl transition-colors ${
                    darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <Menu size={20} />
                </button>
                
                <div>
                  <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    Good morning, {barangayData?.name || barangayData?.barangayCode || 'Barangay'}! 👋
                  </h1>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                    Here's what's happening in your barangay today.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative hidden md:block">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    darkMode ? 'text-gray-400' : 'text-slate-400'
                  }`} size={18} />
                  <input
                    type="text"
                    placeholder="Search residents, documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 pr-4 py-2 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64 transition-all ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>

                {/* Action Buttons */}
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className={`p-2 rounded-xl transition-all ${
                    darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-slate-100 text-slate-600'
                  } ${refreshing ? 'animate-spin' : 'hover:scale-105'}`}
                >
                  <RefreshCw size={18} />
                </button>

                <button
                  onClick={toggleFullscreen}
                  className={`p-2 rounded-xl transition-all ${
                    darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-slate-100 text-slate-600'
                  } hover:scale-105`}
                >
                  {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>

                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-xl transition-all ${
                    darkMode ? 'hover:bg-gray-700 text-yellow-400' : 'hover:bg-slate-100 text-slate-600'
                  } hover:scale-105`}
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                {/* Notifications */}
                <button className={`relative p-2 rounded-xl transition-all ${
                  darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-slate-100 text-slate-600'
                } hover:scale-105`}>
                  <Bell size={18} />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                      {notifications}
                    </span>
                  )}
                </button>

                {/* Date */}
                <div className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-slate-50 text-slate-600'
                }`}>
                  <Calendar size={16} />
                  <span className="text-sm font-medium">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Render different content based on active tab */}
          {activeTab === 'dashboard' && (
            <>
              {/* Quick Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {quickStats.map((stat, index) => (
                  <div key={index} className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/80 border border-white/20'
                  } backdrop-blur-xl shadow-lg hover:shadow-2xl`}>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl ${stat.bgColor} ${stat.textColor} group-hover:scale-110 transition-transform`}>
                          <stat.icon size={24} />
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                          stat.trend === 'up' 
                            ? darkMode ? 'text-green-400 bg-green-400/10' : 'text-green-600 bg-green-50'
                            : darkMode ? 'text-red-400 bg-red-400/10' : 'text-red-600 bg-red-50'
                        }`}>
                          <TrendingUp size={12} className={stat.trend === 'down' ? 'rotate-180' : ''} />
                          {stat.percentage}
                        </div>
                      </div>
                      <div>
                        <h3 className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                          {stat.value}
                        </h3>
                        <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                          {stat.title}
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-400'}`}>
                          {stat.change}
                        </p>
                      </div>
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  </div>
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Recent Document Requests */}
            <div className={`xl:col-span-2 rounded-2xl transition-all duration-300 ${
              darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/80 border border-white/20'
            } backdrop-blur-xl shadow-lg hover:shadow-xl`}>
              <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-slate-100'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                      <FileText size={20} />
                    </div>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      Recent Document Requests
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-slate-50 text-slate-400'
                    }`}>
                      <Filter size={16} />
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105">
                      View All
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {recentRequests.map((request) => (
                    <div key={request.id} className={`group flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                      darkMode ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-slate-50 hover:bg-slate-100'
                    }`}>
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                            {request.avatar}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 ${
                            darkMode ? 'border-gray-800' : 'border-white'
                          } ${getPriorityColor(request.priority)}`} />
                        </div>
                        <div>
                          <p className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                            {request.name}
                          </p>
                          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-slate-500'}`}>
                            {request.document}
                          </p>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-400'}`}>
                            {request.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize border ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                        <button className={`p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100 ${
                          darkMode ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-white text-slate-400'
                        } hover:scale-110`}>
                          <Eye size={16} />
                        </button>
                        <button className={`p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100 ${
                          darkMode ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-white text-slate-400'
                        } hover:scale-110`}>
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className={`rounded-2xl transition-all duration-300 ${
                darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/80 border border-white/20'
              } backdrop-blur-xl shadow-lg hover:shadow-xl p-6`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
                    <Zap size={20} />
                  </div>
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    Quick Actions
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: Plus, label: 'Add New Resident', desc: 'Register new community member', color: 'blue', action: () => setShowAddResidentModal(true) },
                    { icon: FileText, label: 'Process Documents', desc: 'Review pending requests', color: 'green' },
                    { icon: BarChart3, label: 'Generate Report', desc: 'Monthly activity summary', color: 'purple' },
                    { icon: Upload, label: 'Bulk Import', desc: 'Import resident data', color: 'orange' }
                  ].map((action, index) => (
                    <button 
                      key={index} 
                      onClick={action.action}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 border hover:scale-105 hover:shadow-lg ${
                      darkMode 
                        ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/30' 
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                    }`}>
                      <div className={`p-2 rounded-lg bg-${action.color}-50 text-${action.color}-600`}>
                        <action.icon size={18} />
                      </div>
                      <div className="text-left">
                        <p className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                          {action.label}
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                          {action.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Barangay Info */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg text-white p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <Home size={20} />
                    </div>
                    <h3 className="text-lg font-bold">Barangay Information</h3>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    {[
                      { icon: MapPin, text: 'Municipality of Alicia, Isabela' },
                      { icon: Users, text: '1,247 Registered Residents' },
                      { icon: Shield, text: `Barangay Code: ${barangayData?.barangayCode || 'BRG-001'}` },
                      { icon: Activity, text: 'Status: Active & Operational' }
                    ].map((info, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <info.icon size={16} className="text-blue-200" />
                        <span>{info.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg transition-all text-sm font-medium backdrop-blur-sm hover:scale-105">
                    Update Information
                  </button>
                </div>
              </div>
            </div>
          </div>
            </>
          )}

          {/* Resident Management Tab */}
          {activeTab === 'residents' && (
            <ResidentManagement darkMode={darkMode} />
          )}

          {/* Other tabs can be added here */}
          {activeTab === 'documents' && (
            <div className="text-center py-12">
              <FileText size={48} className={`mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Document Management
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Document management functionality coming soon...
              </p>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="text-center py-12">
              <BarChart3 size={48} className={`mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Reports & Analytics
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Reports and analytics functionality coming soon...
              </p>
            </div>
          )}

          {activeTab === 'incidents' && (
            <div className="text-center py-12">
              <AlertTriangle size={48} className={`mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Incident Reports
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Incident reporting functionality coming soon...
              </p>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="text-center py-12">
              <MessageSquare size={48} className={`mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Messages
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Messaging functionality coming soon...
              </p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="text-center py-12">
              <Settings size={48} className={`mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Barangay Settings
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Settings functionality coming soon...
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Add Resident Modal */}
      <AddResidentModal
        show={showAddResidentModal}
        onClose={() => setShowAddResidentModal(false)}
        onSuccess={() => {
          // Refresh data if we're on the residents tab
          if (activeTab === 'residents') {
            window.location.reload(); // Simple refresh for now
          }
        }}
        darkMode={darkMode}
      />
    </div>
  );
};

export default BarangayDashboard;