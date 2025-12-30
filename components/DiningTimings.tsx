
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HOTEL_ASSETS } from '../constants';

export const DiningTimings: React.FC = () => {
  const [currentStatus, setCurrentStatus] = useState<{label: string, isOpen: boolean}>({ label: "Kitchen Closed", isOpen: false });

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const time = hours + minutes / 60;

      // Breakfast: 6:00 - 9:00
      if (time >= 6 && time < 9) {
        setCurrentStatus({ label: "Serving Breakfast", isOpen: true });
      } 
      // Lunch: 12:00 - 15:00
      else if (time >= 12 && time < 15) {
        setCurrentStatus({ label: "Serving Lunch", isOpen: true });
      }
      // Dinner: 19:00 - 22:00
      else if (time >= 19 && time < 22) {
        setCurrentStatus({ label: "Serving Dinner", isOpen: true });
      }
      else {
        setCurrentStatus({ label: "Kitchen Closed", isOpen: false });
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const schedule = [
    { title: 'Morning Breakfast', time: '6:00 AM — 9:00 AM', icon: 'fa-mug-hot', color: 'bg-orange-50 text-orange-500' },
    { title: 'Afternoon Lunch', time: '12:00 PM — 3:00 PM', icon: 'fa-utensils', color: 'bg-emerald-50 text-[#50C878]' },
    { title: 'Night Dinner', time: '7:00 PM — 10:00 PM', icon: 'fa-moon', color: 'bg-blue-50 text-blue-600' }
  ];

  return (
    <section id="dining" className="py-32 px-6 bg-[#FAFBFE]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#50C878] font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">
                Artisan Gastronomy
              </span>
              <h2 className="text-5xl lg:text-6xl font-serif text-[#002366] mb-8 leading-tight">
                Deccan Flavors <br/>
                <span className="text-[#50C878] italic">& Timings</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-lg">
                Our kitchen follows the rhythmic pulses of the day, offering fresh, locally-sourced ingredients prepared by master chefs in an ambiance of golden warmth.
              </p>

              <div className="flex items-center gap-4 mb-12 p-6 bg-white rounded-3xl butterfly-light border border-slate-100 max-w-sm">
                 <div className={`w-3 h-3 rounded-full animate-pulse ${currentStatus.isOpen ? 'bg-[#50C878]' : 'bg-rose-500'}`}></div>
                 <div>
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Current Status</p>
                    <p className="text-[#002366] font-bold text-lg">{currentStatus.label}</p>
                 </div>
              </div>

              <div className="space-y-6">
                {schedule.map((item, idx) => (
                  <div key={item.title} className="flex items-center gap-6 p-6 bg-white rounded-[2rem] border border-slate-50 hover:shadow-xl transition-all group">
                    <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <div>
                      <h4 className="text-[#002366] font-bold text-sm uppercase tracking-widest mb-1">{item.title}</h4>
                      <p className="text-slate-400 font-serif text-lg italic">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                   <img 
                      src={HOTEL_ASSETS.restaurant} 
                      className="rounded-[2.5rem] w-full h-64 lg:h-80 object-cover shadow-2xl hover:scale-[1.02] transition-transform duration-500" 
                      alt="Fine Dining with Gold Lamps" 
                   />
                   <div className="p-4 bg-white rounded-3xl shadow-lg border border-slate-50">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#002366]">Ambience</p>
                      <p className="text-xs text-slate-400">Warm & Sophisticated</p>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="p-4 bg-[#002366] rounded-3xl shadow-lg">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#50C878]">Cuisine</p>
                      <p className="text-xs text-white/70">Multi-cuisine Buffet</p>
                   </div>
                   <img 
                      src={HOTEL_ASSETS.buffet} 
                      className="rounded-[2.5rem] w-full h-64 lg:h-80 object-cover shadow-2xl hover:scale-[1.02] transition-transform duration-500" 
                      alt="Buffet Spread" 
                   />
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};
