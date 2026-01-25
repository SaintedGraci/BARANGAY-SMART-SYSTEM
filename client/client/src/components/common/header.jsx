import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, X, ChevronDown, Home, Users, FileText, Phone, MapPin } from 'lucide-react';
import municipalityLogo from '../../assets/alicia.jpg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { name: 'Resident Services', icon: Users, href: '/services/resident' },
    { name: 'Document Requests', icon: FileText, href: '/services/documents' },
    { name: 'Community Programs', icon: Home, href: '/services/programs' },
    { name: 'Contact Officials', icon: Phone, href: '/services/contact' },
  ];

  return (
    <nav className={`fixed w-full z-[100] top-0 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg' 
        : 'bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-18">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
              <img 
                src={municipalityLogo} 
                alt="Municipality of Alicia Logo" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg lg:text-xl text-slate-800 tracking-tight leading-tight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text">
                MUNICIPALITY OF ALICIA
              </span>
              <span className="text-xs text-slate-500 leading-tight font-medium">Digital Portal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors duration-200">
              <Home size={18} />
              Home
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Services
                <ChevronDown size={16} className={`transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in slide-in-from-top-2 duration-200">
                  {services.map((service) => (
                    <Link
                      key={service.name}
                      to={service.href}
                      className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      <service.icon size={18} />
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/about" className="text-slate-600 hover:text-blue-600 font-medium transition-colors duration-200">
              About
            </Link>
            
            <Link to="/contact" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors duration-200">
              <MapPin size={18} />
              Contact
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            
            <Link to="/login">
              <button className="text-slate-600 px-4 py-2 font-semibold hover:text-blue-600 transition-all duration-200 hover:bg-blue-50 rounded-lg">
                Login
              </button>
            </Link>

            <Link to="/register">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-100 hover:shadow-blue-200 active:scale-95 transform">
                Join Community
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-6 space-y-4">
              <Link 
                to="/" 
                className="flex items-center gap-3 text-slate-600 hover:text-blue-600 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={20} />
                Home
              </Link>
              
              <div className="space-y-2">
                <div className="text-slate-800 font-semibold py-2">Services</div>
                {services.map((service) => (
                  <Link
                    key={service.name}
                    to={service.href}
                    className="flex items-center gap-3 text-slate-600 hover:text-blue-600 py-2 pl-4 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <service.icon size={18} />
                    {service.name}
                  </Link>
                ))}
              </div>
              
              <Link 
                to="/about" 
                className="block text-slate-600 hover:text-blue-600 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              <Link 
                to="/contact" 
                className="flex items-center gap-3 text-slate-600 hover:text-blue-600 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <MapPin size={18} />
                Contact
              </Link>
              
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full text-slate-600 px-4 py-3 font-semibold hover:text-blue-600 transition-all duration-200 hover:bg-blue-50 rounded-lg text-left">
                    Login
                  </button>
                </Link>
                
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg">
                    Join Community
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;