import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import municipalityLogo from '../../assets/alicia.jpg';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 w-full">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand/About Section */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 text-white mb-6">
              <div className="w-10 h-10 rounded-lg overflow-hidden shadow-md">
                <img 
                  src={municipalityLogo} 
                  alt="Municipality of Alicia Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-white leading-tight">Municipality of Alicia</span>
                <span className="text-xs text-slate-400 leading-tight">Digital Portal</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Providing efficient, transparent, and accessible digital services to our 
              valued residents. Building a smarter community together.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="/learn-more" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Announcements</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Municipal Services */}
          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Barangay Clearance</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Certificate of Indigency</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Business Permits</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Incident Reports</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <span>Municipal Hall, <br />Alicia, Bohol, Philippines</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500 shrink-0" />
                <span>+63 (038) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <span>info@alicia.gov.ph</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider Line */}
        <hr className="border-slate-800 mb-8" />

        {/* Bottom Bar: Copyright & Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded overflow-hidden">
              <img 
                src={municipalityLogo} 
                alt="Municipality of Alicia Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs">
              © 2024 Municipality of Alicia. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Globe size={18} className="cursor-pointer hover:text-white transition-colors" />
            <a href="/barangay-login" className="text-xs text-slate-400 hover:text-white transition-colors font-medium">
              Barangay Portal
            </a>
            <a href="/login" className="text-xs text-slate-400 hover:text-white transition-colors font-medium">
              Resident Login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;