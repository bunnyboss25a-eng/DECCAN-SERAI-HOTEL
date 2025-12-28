
import React from 'react';
import { motion } from 'framer-motion';
import { PROXIMITY_GUIDE } from '../constants';

export const ProximityGuide: React.FC = () => {
  return (
    <section id="guide" className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/3">
            <h2 className="text-4xl font-serif text-[#002366] mb-6">At the Pulse of <br/><span className="text-[#50C878]">HITEC City</span></h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Deccan Serai is strategically nestled in the golden triangle of Hyderabad's IT corridor. Whether it's meetings at Google or shopping at Inorbit, you're always minutes away.
            </p>
            
            {/* Weather/Traffic Widget */}
            <div className="bg-white p-6 rounded-2xl butterfly-light border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-50 text-[#50C878] rounded-xl flex items-center justify-center text-xl">
                    <i className="fas fa-sun"></i>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#002366]">28°C</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Hyderabad Clear</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold">MODERATE TRAFFIC</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">To RGIA Airport</span>
                  <span className="font-bold">42 mins</span>
                </div>
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-3/5 h-full bg-amber-400"></div>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">To Cyber Towers</span>
                  <span className="font-bold">5 mins</span>
                </div>
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-1/5 h-full bg-[#50C878]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {PROXIMITY_GUIDE.map((point, idx) => (
              <motion.div 
                key={point.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group flex items-center justify-between p-6 bg-white rounded-2xl hover:bg-[#002366] hover:text-white transition-all duration-300 butterfly-light border border-slate-100"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${point.type === 'business' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-[#50C878]'} group-hover:bg-white/10 group-hover:text-white`}>
                    <i className={`fas ${point.type === 'business' ? 'fa-briefcase' : 'fa-umbrella-beach'}`}></i>
                  </div>
                  <div>
                    <p className="font-bold">{point.name}</p>
                    <p className="text-xs opacity-60 uppercase tracking-widest">{point.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-serif">{point.distance}</p>
                  <p className="text-[10px] opacity-40">Away</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
