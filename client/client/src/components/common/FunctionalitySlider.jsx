import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FileText, ShieldCheck, Megaphone, Users, CreditCard, Clock } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const functionalities = [
  {
    title: "Request Documents",
    desc: "Apply for Barangay Clearance, Indigency, and Residency certificates online.",
    icon: <FileText size={32} />,
    color: "bg-blue-500"
  },
  {
    title: "Blotter Reports",
    desc: "Securely file and track incident reports and community concerns.",
    icon: <ShieldCheck size={32} />,
    color: "bg-red-500"
  },
  {
    title: "Announcements",
    desc: "Get real-time updates on community events and emergency alerts.",
    icon: <Megaphone size={32} />,
    color: "bg-amber-500"
  },
  {
    title: "Resident Portal",
    desc: "Manage your household profile and view your transaction history.",
    icon: <Users size={32} />,
    color: "bg-emerald-500"
  },
  {
    title: "Online Payment",
    desc: "Pay for document fees and permits through integrated payment gateways.",
    icon: <CreditCard size={32} />,
    color: "bg-purple-500"
  },
  {
    title: "Appointment System",
    desc: "Schedule your visit to the Barangay Hall to avoid long queues.",
    icon: <Clock size={32} />,
    color: "bg-indigo-500"
  }
];

const FunctionalitySlider = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Everything you need from your Barangay, simplified and accessible in one digital platform.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16"
        >
          {functionalities.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl h-full transition-all hover:shadow-xl hover:-translate-y-2 group">
                <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
                <button className="mt-6 text-sm font-bold text-blue-600 flex items-center gap-2 hover:gap-3 transition-all">
                  Learn more <span>→</span>
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FunctionalitySlider;