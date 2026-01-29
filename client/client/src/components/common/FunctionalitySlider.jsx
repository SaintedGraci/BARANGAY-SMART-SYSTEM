import { useState } from 'react';
import { FileText, ShieldCheck, Megaphone, Users, CreditCard, Clock, ArrowRight, Sparkles } from 'lucide-react';

const functionalities = [
  {
    title: "Request Documents",
    desc: "Apply for Municipal Clearance, Indigency, and Residency certificates online with instant tracking.",
    icon: <FileText size={28} />,
    gradient: "from-blue-500 to-blue-600",
    shadowColor: "shadow-blue-500/25",
    badge: "Most Popular"
  },
  {
    title: "Incident Reports",
    desc: "Securely file and track incident reports with real-time updates and community safety alerts.",
    icon: <ShieldCheck size={28} />,
    gradient: "from-red-500 to-red-600",
    shadowColor: "shadow-red-500/25",
    badge: "24/7 Available"
  },
  {
    title: "Announcements",
    desc: "Get instant notifications on community events, emergency alerts, and municipal updates.",
    icon: <Megaphone size={28} />,
    gradient: "from-amber-500 to-orange-500",
    shadowColor: "shadow-amber-500/25",
    badge: "Real-time"
  },
  {
    title: "Resident Portal",
    desc: "Comprehensive dashboard to manage your household profile and view complete transaction history.",
    icon: <Users size={28} />,
    gradient: "from-emerald-500 to-green-600",
    shadowColor: "shadow-emerald-500/25",
    badge: "Personalized"
  },
  {
    title: "Online Payment",
    desc: "Secure payment gateway for document fees, permits, and municipal services with multiple options.",
    icon: <CreditCard size={28} />,
    gradient: "from-purple-500 to-purple-600",
    shadowColor: "shadow-purple-500/25",
    badge: "Secure"
  },
  {
    title: "Appointment System",
    desc: "Smart scheduling system to book your Municipal Hall visits and avoid long waiting queues.",
    icon: <Clock size={28} />,
    gradient: "from-indigo-500 to-indigo-600",
    shadowColor: "shadow-indigo-500/25",
    badge: "Time-saving"
  }
];

const FunctionalitySlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(functionalities.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(functionalities.length / 3)) % Math.ceil(functionalities.length / 3));
  };

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles size={16} />
            Digital Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-base sm:text-lg lg:text-xl leading-relaxed">
            Everything you need from your Municipality, simplified and accessible in one comprehensive digital platform designed for modern citizens.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {functionalities.map((item, index) => (
            <div key={index} className={`relative bg-white/80 backdrop-blur-sm border border-white/50 p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 group cursor-pointer ${item.shadowColor} hover:border-white/80`}>
              
              {/* Badge */}
              <div className="absolute -top-3 left-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                {item.badge}
              </div>

              {/* Icon */}
              <div className={`bg-gradient-to-br ${item.gradient} w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${item.shadowColor}`}>
                {item.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-6">
                {item.desc}
              </p>

              {/* CTA Button */}
              <button className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 group-hover:gap-3 transition-all duration-300 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg">
                Learn more 
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FunctionalitySlider;