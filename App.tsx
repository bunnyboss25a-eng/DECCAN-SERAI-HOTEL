
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

  const scrollToBooking = () => {
    const element = document.getElementById('booking-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className={`min-h-screen bg-[#FAFBFE] overflow-x-hidden ${businessMode ? 'selection:bg-[#002366]' : 'selection:bg-[#50C878]'}`}>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      <Header businessMode={businessMode} setBusinessMode={setBusinessMode} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] lg:h-[95vh] w-full overflow-hidden flex items-center pt-20">
        {/* Background Layer with cinematic zoom */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={HOTEL_ASSETS.exterior} 
            alt="Deccan Serai HITEC City Exterior" 
            className="w-full h-full object-cover"
          />
          {/* Depth Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#002366]/80 via-[#002366]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAFBFE] via-transparent to-transparent" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                 <div className="h-[1px] w-12 bg-[#C5A059]"></div>
                 <span className="text-[#C5A059] text-[10px] font-black uppercase tracking-[0.5em]">Experience Urban Luxury</span>
              </div>
              
              <h1 className="text-5xl lg:text-8xl font-serif text-white leading-[1.1] mb-8">
                A Grand Serai in the <br/>
                <span className="text-[#50C878] italic">Heart of Silicon</span>
              </h1>
              
              <p className="text-white/70 text-lg lg:text-xl max-w-xl mb-12 leading-relaxed">
                Experience the perfect blend of Deccan hospitality and modern business efficiency at the most strategic landmark in HITEC City.
              </p>

              <div className="flex flex-wrap gap-6">
                <button 
                  onClick={scrollToBooking}
                  className="px-10 py-5 bg-[#C5A059] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-[#C5A059]/30"
                >
                  Book Your Stay
                </button>
                <button 
                  onClick={() => setIsExplorerOpen(true)}
                  className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#002366] transition-all"
                >
                  <i className="fas fa-play-circle mr-3"></i>
                  Virtual Tour
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-32 right-12 hidden lg:flex flex-col items-center gap-4 text-white/40"
        >
          <span className="text-[9px] font-black uppercase tracking-[0.3em] rotate-90 mb-4">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent"></div>
        </motion.div>
      </section>

      {/* Booking Dashboard Section */}
      <QuickBook />

      {/* Suite Showcase Section */}
      <section id="rooms" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-[#50C878] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Executive Residences</span>
              <h2 className="text-5xl lg:text-6xl font-serif text-[#002366]">Spaces Designed for <br/><span className="italic">Excellence</span></h2>
            </div>
            <p className="text-slate-400 text-sm max-w-xs lg:text-right">
              Every room at Deccan Serai is a curated sanctuary featuring signature wood paneling and panoramic city views.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ROOM_DETAILS.map((room, idx) => (
              <motion.div 
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={room.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={room.name} />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-sm">
                    <span className="text-[#002366] font-bold text-xs">₹{room.price.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 ml-1">/night</span>
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-xl font-serif text-[#002366] mb-3 group-hover:text-[#50C878] transition-colors">{room.name}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6 line-clamp-2">{room.description}</p>
                  <div className="space-y-2 mb-8">
                    {room.features.slice(0, 2).map(f => (
                      <div key={f} className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        <i className="fas fa-check text-[#50C878]"></i>
                        {f}
                      </div>
                    ))}
                  </div>
                  <button onClick={scrollToBooking} className="w-full py-3 rounded-xl border border-slate-100 text-[#002366] font-black text-[10px] uppercase tracking-widest group-hover:bg-[#002366] group-hover:text-white transition-all">
                    Book This Room
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AmenitiesGrid />
      <DiningTimings />
      <ProximityGuide />

      {/* Footer */}
      <footer className="bg-[#002366] pt-24 pb-12 text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex flex-col items-start mb-8">
                <span className="font-serif text-3xl font-bold uppercase tracking-[0.3em] text-[#C5A059]">DECCAN SERAI</span>
                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 ml-1">HOTEL</span>
              </div>
              <p className="text-white/40 max-w-md leading-relaxed mb-8">
                Deccan Serai is the premier choice for the modern executive. Located in the heart of Hyderabad's HITEC City, we provide more than just a room—we provide an experience of efficiency and luxury.
              </p>
              <div className="flex gap-4">
                {['facebook', 'instagram', 'linkedin', 'twitter'].map(social => (
                  <a key={social} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#C5A059] hover:border-[#C5A059] transition-all">
                    <i className={`fab fa-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059] mb-8">Explore</h5>
              <ul className="space-y-4 text-sm text-white/60">
                <li><a href="#rooms" className="hover:text-white transition-colors">Suites & Rooms</a></li>
                <li><a href="#amenities" className="hover:text-white transition-colors">Amenities</a></li>
                <li><a href="#dining" className="hover:text-white transition-colors">Dining Flavors</a></li>
                <li><a href="#guide" className="hover:text-white transition-colors">HITEC City Guide</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059] mb-8">Connect</h5>
              <ul className="space-y-4 text-sm text-white/60">
                <li className="flex items-center gap-3">
                  <i className="fas fa-map-marker-alt text-[#C5A059]"></i>
                  HITEC City, Hyderabad, 500081
                </li>
                <li className="flex items-center gap-3">
                  <i className="fas fa-phone-alt text-[#C5A059]"></i>
                  +91 40 4433 4433
                </li>
                <li className="flex items-center gap-3">
                  <i className="fas fa-envelope text-[#C5A059]"></i>
                  reservations@deccanserai.com
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
              © {new Date().getFullYear()} Deccan Serai Premium Hotels. All Rights Reserved.
            </p>
            <div className="flex gap-8 text-[10px] font-bold text-white/20 uppercase tracking-widest">
              <a href="#" className="hover:text-[#C5A059] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#C5A059] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isExplorerOpen && (
          <SuiteExplorer 
            isOpen={isExplorerOpen} 
            onClose={() => setIsExplorerOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
