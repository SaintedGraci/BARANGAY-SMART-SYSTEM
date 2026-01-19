import React from 'react';
import Header from '../components/common/header';
import Footer from '../components/common/footer';
import { CheckCircle, Shield, Zap, Globe } from 'lucide-react';

const LearnMore = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-slate-50 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">
            Bridging the Gap Between <span className="text-blue-600">Public Service</span> and Technology
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            BrgySmart is designed to modernize barangay operations by providing a seamless, 
            paperless, and transparent platform for every resident.
          </p>
        </div>
      </section>

      {/* Details Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why we went Digital?</h2>
            <div className="space-y-6">
              {[
                { title: "Efficiency", desc: "No more long queues. Request documents from your phone.", icon: <Zap className="text-blue-600"/> },
                { title: "Security", desc: "Your personal data is protected with modern encryption.", icon: <Shield className="text-blue-600"/> },
                { title: "Availability", desc: "Access announcements and services 24/7, anywhere.", icon: <Globe className="text-blue-600"/> },
                { title: "Transparency", desc: "Track the status of your requests in real-time.", icon: <CheckCircle className="text-blue-600"/> }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-slate-800">{item.title}</h4>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-200 aspect-video rounded-3xl overflow-hidden shadow-2xl">
            {/* Placeholder for an explainer video or another community photo */}
            <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white font-bold italic">
              [System Demo Video Placeholder]
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LearnMore;