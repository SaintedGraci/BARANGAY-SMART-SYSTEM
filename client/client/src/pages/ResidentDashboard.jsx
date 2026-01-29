import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  User, 
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
  Minimize2,
  Megaphone,
  CreditCard,
  Heart,
  Award,
  Camera,
  Edit3,
  Send,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  MapPin as LocationIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authAPI, documentsAPI, announcementsAPI, apiUtils } from '../api';
import municipalityLogo from '../assets/alicia.jpg';

const ResidentDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Data states
  const [myRequests, setMyRequests] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    completed: 0,
    total: 0,
    thisMonth: 0,
    thisWeek: 0,
    today: 0
  });
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Get user info from localStorage and fetch data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    
    if (!user || !token) {
      navigate('/login');
    } else {
      if (user.userType === 'barangay') {
        navigate('/barangay-dashboard');
      } else {
        setUserData(user);
        fetchDashboardData();
      }
    }
  }, [navigate]);

  // Fetch all dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchMyRequests(),
        fetchAnnouncements(),
        fetchDocumentTypes(),
        fetchStatistics()
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's document requests
  const fetchMyRequests = async () => {
    try {
      const response = await documentsAPI.getMyRequests();
      setMyRequests(response.data || []);
      
      // Count pending requests for notifications
      const pendingCount = response.data?.filter(req => req.status === 'pending').length || 0;
      setNotifications(pendingCount);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setMyRequests([]);
    }
  };

  // Fetch recent announcements
  const fetchAnnouncements = async () => {
    try {
      const response = await announcementsAPI.getRecentAnnouncements(5);
      setAnnouncements(response.data || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setAnnouncements([]);
    }
  };

  // Fetch document types
  const fetchDocumentTypes = async () => {
    try {
      const response = await documentsAPI.getDocumentTypes();
      setDocumentTypes(response.data || []);
    } catch (error) {
      console.error('Error fetching document types:', error);
      setDocumentTypes([]);
    }
  };

  // Fetch statistics
  const fetchStatistics = async () => {
    try {
      const response = await documentsAPI.getStatistics();
      setStats(response.data || {});
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

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
    try {
      await fetchDashboardData();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    }
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
    { id: 'requests', label: 'My Requests', icon: FileText, badge: myRequests.length > 0 ? myRequests.length.toString() : null, color: 'bg-blue-500' },
    { id: 'services', label: 'Request Services', icon: Plus },
    { id: 'announcements', label: 'Announcements', icon: Megaphone, badge: announcements.length > 0 ? announcements.length.toString() : null, color: 'bg-green-500' },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'support', label: 'Help & Support', icon: MessageSquare },
  ];

  const quickStats = [
    {
      title: 'Pending Requests',
      value: stats.pending || 0,
      change: 'Awaiting processing',
      icon: Clock,
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      trend: 'neutral',
      percentage: '0%'
    },
    {
      title: 'Approved Documents',
      value: stats.approved || 0,
      change: `+${stats.thisMonth || 0} this month`,
      icon: CheckCircle,
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      trend: 'up',
      percentage: '+60%'
    },
    {
      title: 'Community Points',
      value: '245',
      change: '+15 this week',
      icon: Star,
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      trend: 'up',
      percentage: '+6%'
    },
    {
      title: 'Total Requests',
      value: stats.total || 0,
      change: `+${stats.thisWeek || 0} this week`,
      icon: Activity,
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      trend: 'up',
      percentage: '+25%'
    }
  ];

  // Handle document request
  const handleRequestDocument = async (documentType) => {
    try {
      const purpose = prompt(`Please enter the purpose for requesting ${documentType.type}:`);
      if (!purpose) return;

      const requestData = {
        documentType: documentType.type,
        purpose,
        priority: 'medium'
      };

      await documentsAPI.createRequest(requestData);
      alert('Document request submitted successfully!');
      
      // Refresh data
      await fetchMyRequests();
      await fetchStatistics();
    } catch (error) {
      const errorMessage = apiUtils.handleError(error);
      alert(`Error: ${errorMessage}`);
    }
  };

  // Handle view request details
  const handleViewRequest = async (requestId) => {
    try {
      const response = await documentsAPI.getRequestById(requestId);
      alert(`Request Details:\n\nTracking: ${response.data.trackingNumber}\nStatus: ${response.data.status}\nSubmitted: ${new Date(response.data.createdAt).toLocaleDateString()}`);
    } catch (error) {
      const errorMessage = apiUtils.handleError(error);
      alert(`Error: ${errorMessage}`);
    }
  };

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

  const getAnnouncementTypeColor = (type) => {
    switch (type) {
      case 'event': return 'bg-blue-500';
      case 'health': return 'bg-green-500';
      case 'notice': return 'bg-orange-500';
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
                  Resident Portal
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
              {userData?.firstName?.charAt(0) || userData?.name?.charAt(0) || 'R'}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-semibold truncate ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                {userData?.firstName || userData?.name || 'Resident'}
              </p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                Community Member
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
                    Welcome back, {userData?.firstName || userData?.name || 'Resident'}! 👋
                  </h1>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                    Manage your documents and stay connected with your community.
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
                    placeholder="Search services, requests..."
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
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw size={32} className="animate-spin text-blue-500" />
              <span className={`ml-3 text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Loading dashboard...
              </span>
            </div>
          ) : (
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
                            : stat.trend === 'down'
                            ? darkMode ? 'text-red-400 bg-red-400/10' : 'text-red-600 bg-red-50'
                            : darkMode ? 'text-gray-400 bg-gray-400/10' : 'text-gray-600 bg-gray-50'
                        }`}>
                          <TrendingUp size={12} className={stat.trend === 'down' ? 'rotate-180' : stat.trend === 'neutral' ? 'rotate-90' : ''} />
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
                {/* My Recent Requests */}
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
                          My Recent Requests
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className={`p-2 rounded-lg transition-colors ${
                          darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-slate-50 text-slate-400'
                        }`}>
                          <Filter size={16} />
                        </button>
                        <button 
                          onClick={() => setActiveTab('requests')}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105"
                        >
                          View All
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {myRequests.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText size={48} className={`mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                        <p className={`text-lg font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          No document requests yet
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          Start by requesting your first document
                        </p>
                        <button 
                          onClick={() => setActiveTab('services')}
                          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Request Document
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {myRequests.slice(0, 5).map((request) => (
                          <div key={request.id} className={`group flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                            darkMode ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-slate-50 hover:bg-slate-100'
                          }`}>
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                  <FileText size={20} />
                                </div>
                                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 ${
                                  darkMode ? 'border-gray-800' : 'border-white'
                                } ${getPriorityColor(request.priority)}`} />
                              </div>
                              <div>
                                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                                  {request.documentType}
                                </p>
                                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-slate-500'}`}>
                                  Tracking: {request.trackingNumber}
                                </p>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-400'}`}>
                                  Submitted: {new Date(request.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize border ${getStatusColor(request.status)}`}>
                                {request.status}
                              </span>
                              <button 
                                onClick={() => handleViewRequest(request.id)}
                                className={`p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100 ${
                                  darkMode ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-white text-slate-400'
                                } hover:scale-110`}
                              >
                                <Eye size={16} />
                              </button>
                              <button className={`p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100 ${
                                darkMode ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-white text-slate-400'
                              } hover:scale-110`}>
                                <Download size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Quick Services */}
                  <div className={`rounded-2xl transition-all duration-300 ${
                    darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/80 border border-white/20'
                  } backdrop-blur-xl shadow-lg hover:shadow-xl p-6`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-500/10 text-green-500 rounded-lg">
                        <Plus size={20} />
                      </div>
                      <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        Request Services
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {documentTypes.slice(0, 4).map((service, index) => (
                        <button 
                          key={index} 
                          onClick={() => handleRequestDocument(service)}
                          className={`p-3 rounded-xl transition-all duration-200 border hover:scale-105 hover:shadow-lg text-left ${
                            darkMode 
                              ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/30' 
                              : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <Shield className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} mb-2`} size={20} />
                          <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                            {service.type}
                          </p>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                            ₱{service.fee} • {service.processingTime}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recent Announcements */}
                  <div className={`rounded-2xl transition-all duration-300 ${
                    darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/80 border border-white/20'
                  } backdrop-blur-xl shadow-lg hover:shadow-xl p-6`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg">
                        <Megaphone size={20} />
                      </div>
                      <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                        Latest Announcements
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {announcements.length === 0 ? (
                        <div className="text-center py-4">
                          <Megaphone size={32} className={`mx-auto mb-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            No announcements available
                          </p>
                        </div>
                      ) : (
                        announcements.slice(0, 3).map((announcement) => (
                          <div key={announcement.id} className={`p-3 rounded-xl transition-all hover:scale-[1.02] ${
                            darkMode ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-slate-50 hover:bg-slate-100'
                          }`}>
                            <div className="flex items-start gap-3">
                              <div className={`w-3 h-3 rounded-full mt-1 ${getAnnouncementTypeColor(announcement.type)}`} />
                              <div className="flex-1">
                                <p className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                                  {announcement.title}
                                </p>
                                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-slate-600'} mt-1`}>
                                  {announcement.content.substring(0, 80)}...
                                </p>
                                <div className={`flex items-center gap-2 mt-2 text-xs ${darkMode ? 'text-gray-400' : 'text-slate-400'}`}>
                                  <CalendarIcon size={12} />
                                  <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                                  {announcement.location && (
                                    <>
                                      <LocationIcon size={12} />
                                      <span>{announcement.location}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <button 
                      onClick={() => setActiveTab('announcements')}
                      className={`w-full mt-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                        darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      View All Announcements
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResidentDashboard;