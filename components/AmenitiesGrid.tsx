
import React from 'react';
import { motion } from 'framer-motion';
import { HOTEL_AMENITIES } from '../constants';

export const AmenitiesGrid: React.FC = () => {
  return (
    <section id="amenities" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#50C878] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block"
          >
            Signature Comforts
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-serif text-[#002366]"
          >
            The Serai <span className="text-[#50C878] italic">Standard</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
          {HOTEL_AMENITIES.map((amenity, idx) => (
            <motion.div
              key={amenity.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="group p-8 rounded-[2.5rem] bg-[#FAFBFE] border border-slate-50 flex flex-col items-center text-center hover:bg-white hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500"
            >
              <div className={`w-20 h-20 rounded-3xl ${amenity.color} flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                <i className={`fas ${amenity.icon}`}></i>
              </div>
              <h4 className="text-[#002366] font-bold text-sm uppercase tracking-widest leading-tight">
                {amenity.name}
              </h4>
              <div className="mt-4 w-6 h-0.5 bg-[#50C878]/20 group-hover:w-12 group-hover:bg-[#50C878] transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-10 bg-[#002366] rounded-[3rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#50C878]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center md:text-left">
              <h3 className="text-3xl font-serif text-white mb-2">Need something extra?</h3>
              <p className="text-white/60 text-sm">Our 24/7 concierge is just a butterfly-light touch away on your in-room telephone.</p>
            </div>
            <button className="px-10 py-5 bg-[#50C878] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-500/20">
              Request Early Check-in
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
