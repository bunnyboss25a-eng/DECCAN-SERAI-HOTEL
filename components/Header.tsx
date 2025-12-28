
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  businessMode: boolean;
  setBusinessMode: (mode: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ businessMode, setBusinessMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500 ${isScrolled ? 'glass-nav py-3 border-b border-slate-100 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex flex-col items-center group cursor-pointer">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center"
          >
            {/* Emblem representation */}
            <div className={`w-10 h-10 border-2 rounded-full flex items-center justify-center mb-1 transition-colors duration-300 ${!isScrolled ? 'border-white' : 'border-[#C5A059]'}`}>
              <div className={`w-6 h-6 border-t border-b border-l border-r rounded-full opacity-50 ${!isScrolled ? 'border-white' : 'border-[#C5A059]'}`}></div>
            </div>
            <div className="flex flex-col items-center leading-none">
              <span className={`font-serif text-lg font-bold uppercase tracking-[0.3em] transition-colors duration-300 ${!isScrolled ? 'text-white' : 'text-[#C5A059]'}`}>
                DECCAN SERAI
              </span>
              <div className="flex items-center w-full gap-2">
                <div className={`h-[0.5px] flex-1 ${!isScrolled ? 'bg-white/30' : 'bg-[#C5A059]/30'}`}></div>
                <span className={`text-[7px] font-black uppercase tracking-[0.5em] ${!isScrolled ? 'text-white/60' : 'text-[#C5A059]'}`}>HOTEL</span>
                <div className={`h-[0.5px] flex-1 ${!isScrolled ? 'bg-white/30' : 'bg-[#C5A059]/30'}`}></div>
              </div>
            </div>
          </motion.div>
        </div>

        <nav className={`hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.25em] transition-colors duration-300 ${!isScrolled ? 'text-white/80' : 'text-[#002366]/70'}`}>
          <a href="#rooms" className="hover:text-[#C5A059] transition-colors relative group">
            Rooms
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C5A059] transition-all group-hover:w-full"></span>
          </a>
          <a href="#amenities" className="hover:text-[#C5A059] transition-colors relative group">
            Amenities
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C5A059] transition-all group-hover:w-full"></span>
          </a>
          <a href="#dining" className="hover:text-[#C5A059] transition-colors relative group">
            Dining
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C5A059] transition-all group-hover:w-full"></span>
          </a>
          <a href="#guide" className="hover:text-[#C5A059] transition-colors relative group">
            Explore
          </a>
        </nav>

        <div className="flex items-center gap-6">
          <div 
            className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all ${isScrolled ? 'bg-slate-100' : 'bg-white/10 backdrop-blur-md'}`}
            onClick={() => setBusinessMode(!businessMode)}
          >
            <span className={`text-[8px] font-black uppercase tracking-widest ${businessMode ? 'text-[#002366]' : 'text-slate-400'}`}>Business</span>
            <div className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${businessMode ? 'bg-[#C5A059]' : 'bg-slate-300'}`}>
              <motion.div 
                animate={{ x: businessMode ? 16 : 2 }}
                className="absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm"
              />
            </div>
          </div>
          
          <button className={`hidden lg:block px-6 py-2 rounded-full font-black text-[10px] tracking-widest transition-all ${!isScrolled ? 'bg-[#C5A059] text-white hover:bg-white hover:text-[#002366]' : 'bg-[#002366] text-white hover:bg-[#C5A059]'}`}>
            RESERVE NOW
          </button>
        </div>
      </div>
    </header>
  );
};
