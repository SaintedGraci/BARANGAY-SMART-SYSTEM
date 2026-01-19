import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 w-full">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand/About Section */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 text-white mb-6">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <MapPin size={20} />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">BrgySmart</span>
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

          {/* Barangay Services */}
          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Barangay Clearance</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Certificate of Indigency</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Business Permits</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Blotter Report</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 shrink-0" />
                <span>123 Barangay Hall St., <br />Bacolod City, Philippines</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500 shrink-0" />
                <span>+63 (034) 432-1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <span>support@brgysmart.gov.ph</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider Line */}
        <hr className="border-slate-800 mb-8" />

        {/* Bottom Bar: Copyright & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500">
          <p className="text-xs">
            © 2026 BrgySmart Community Portal. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Facebook size={18} className="cursor-pointer hover:text-white transition-colors" />
            <Twitter size={18} className="cursor-pointer hover:text-white transition-colors" />
            <Globe size={18} className="cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;