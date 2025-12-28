
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { LoadingScreen } from './components/LoadingScreen';
import { QuickBook } from './components/QuickBook';
import { ProximityGuide } from './components/ProximityGuide';
import { SuiteExplorer } from './components/SuiteExplorer';
import { AmenitiesGrid } from './components/AmenitiesGrid';
import { DiningTimings } from './components/DiningTimings';
import { ROOM_DETAILS, HOTEL_ASSETS } from './constants';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [businessMode, setBusinessMode] = useState(false);
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`min-h-screen bg-[#FAFBFE] overflow-x-hidden ${businessMode ? 'selection:bg-[#002366]' : 'selection:bg-[#50C878]'}`}>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      <Header businessMode={businessMode} setBusinessMode={setBusinessMode} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] lg:h-[95vh] flex items-center px-6 pt-32 pb-40 lg:pb-48">
        <div className="absolute inset-0 z-0 overflow-hidden bg-slate-900">
          <motion.img 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 10, ease: "linear" }}
            src={HOTEL_ASSETS.exterior}
            alt="Deccan Serai Exterior" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30"></div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
            <svg width="800" height="800" viewBox="0 0 100 100" fill="white">
               <path d="M50 50 C20 10 0 40 50 90 C100 40 80 10 50 50" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 1, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <p className="text-[#C5A059] font-black uppercase tracking-[0.4em] text-[10px] mb-6 flex items-center gap-4">
              <span className="w-10 h-[1px] bg-[#C5A059]/50"></span>
              The Gold Standard of Hospitality
            </p>
            <h1 className="text-5xl lg:text-[7.5rem] font-serif text-white leading-[1.1] mb-8 tracking-tighter">
              Where <span className="italic font-light text-[#C5A059]">Tradition</span><br/>
              Meets Modernity.
            </h1>
            <p className="text-white/70 max-w-2xl text-lg lg:text-xl mb-12 leading-relaxed font-light">
              Redefining comfort in the heart of HITEC City. 
              {businessMode ? " Engineered for executives with ultra high-speed connectivity and gold-standard service." : " A serene cocoon designed for your ultimate relaxation and artisan living."}
            </p>
            
            <div className="flex flex-wrap gap-6">
               <button 
                onClick={() => setIsExplorerOpen(true)}
                className="px-10 py-5 bg-white text-[#002366] rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#C5A059] hover:text-white transition-all shadow-2xl"
               >
                 Explore Suites
               </button>
               <button className="px-10 py-5 border border-white/20 text-white backdrop-blur-md rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-white/10 transition-all">
                 Our Story
               </button>
            </div>
          </motion.div>
        </div>
      </section>

      <QuickBook />

      <section id="rooms" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-5xl lg:text-7xl font-serif text-[#002366] mb-6">Curated Stays</h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Every room is a cocoon of tranquility, offering sweeping views of the HITEC City skyline and bespoke gold-standard touches.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-[#C5A059] hover:border-[#C5A059] hover:text-white transition-all shadow-sm">
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-[#C5A059] hover:border-[#C5A059] hover:text-white transition-all shadow-sm">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ROOM_DETAILS.map((room, idx) => (
            <motion.div 
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-[2.5rem] overflow-hidden butterfly-light border border-slate-50 flex flex-col h-full hover:border-[#C5A059]/30 transition-all duration-500"
            >
              <div className="relative h-72 overflow-hidden bg-slate-100">
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 bg-[#C5A059] text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-[#C5A059]/30">
                    Recommended
                  </span>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-serif text-[#002366] mb-4 group-hover:text-[#C5A059] transition-colors leading-tight">
                  {room.name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {room.features.map(f => (
                    <span key={f} className="text-[10px] font-bold text-slate-400 px-3 py-1 bg-slate-50 rounded-lg">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-end justify-between pt-6 border-t border-slate-50">
                  <div>
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest block mb-1">From</span>
                    <span className="text-3xl font-bold text-[#002366] flex items-baseline">
                      ₹{room.price.toLocaleString()}
                      <span className="text-xs font-medium text-slate-400 ml-1">/night</span>
                    </span>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-2xl bg-slate-100 text-[#002366] flex items-center justify-center group-hover:bg-[#C5A059] group-hover:text-white transition-all shadow-sm"
                  >
                    <i className="fas fa-plus"></i>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AmenitiesGrid />

      <DiningTimings />

      <ProximityGuide />

      <footer className="bg-[#002366] text-white pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:col-span-1 lg:grid-cols-4 gap-20 mb-24">
            <div className="col-span-1 lg:col-span-1">
               <div className="flex flex-col items-start mb-10">
                <span className="font-serif text-3xl font-bold tracking-[0.2em] text-[#C5A059] uppercase leading-none">
                  DECCAN SERAI
                </span>
                <div className="flex items-center w-48 gap-2 mt-1">
                  <div className="h-[0.5px] flex-1 bg-[#C5A059]/30"></div>
                  <span className="text-[8px] font-black uppercase tracking-[0.5em] text-[#C5A059]">HOTEL</span>
                  <div className="h-[0.5px] flex-1 bg-[#C5A059]/30"></div>
                </div>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-10">
                The pinnacle of premium hospitality in HITEC City. We blend heritage with high-tech living to create an unforgettable stay.
              </p>
              <div className="flex gap-5">
                {[ 'instagram', 'linkedin-in', 'facebook-f', 'twitter' ].map(icon => (
                  <a key={icon} href="#" className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-[#C5A059] hover:border-[#C5A059] transition-all">
                    <i className={`fab fa-${icon}`}></i>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-[#C5A059]">Navigation</h4>
              <ul className="space-y-6 text-sm text-white/50">
                <li><a href="#" className="hover:text-white transition-colors">Exclusive Suites</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dining Experiences</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Meetings & Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors">The Serai Spa</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gallery</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-[#C5A059]">Corporate</h4>
              <ul className="space-y-6 text-sm text-white/50">
                <li><a href="#" className="hover:text-white transition-colors">Preferred Partners</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Long Stay Packages</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-[#C5A059]">Club Serai</h4>
              <p className="text-sm text-white/40 mb-8 leading-relaxed">Join our membership for exclusive gold-tier deals and upgrades.</p>
              <div className="space-y-4">
                <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#C5A059] transition-colors text-sm" />
                <button className="w-full bg-[#C5A059] text-white font-black text-[11px] uppercase tracking-widest py-4 rounded-2xl hover:bg-opacity-90 transition-all shadow-xl shadow-[#C5A059]/20">Join the Circle</button>
              </div>
            </div>
          </div>
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">© 2024 Deccan Serai HITEC City. Official Brand Partner.</p>
            <div className="flex gap-10 text-[9px] text-white/20 font-black uppercase tracking-[0.3em]">
              <a href="#" className="hover:text-[#C5A059] transition-colors">Sustainability</a>
              <a href="#" className="hover:text-[#C5A059] transition-colors">Accessibility</a>
              <a href="#" className="hover:text-[#C5A059] transition-colors">Careers</a>
            </div>
          </div>
        </div>
      </footer>

      <SuiteExplorer isOpen={isExplorerOpen} onClose={() => setIsExplorerOpen(false)} />

      <motion.a 
        href="#"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-8 z-[70] w-14 h-14 bg-[#25D366] text-white rounded-2xl flex items-center justify-center shadow-2xl cursor-pointer hover:rotate-12 transition-all"
      >
        <i className="fab fa-whatsapp text-2xl"></i>
      </motion.a>
    </div>
  );
};

export default App;
