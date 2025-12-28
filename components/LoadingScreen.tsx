
import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#002366]"
    >
      <div className="relative flex flex-col items-center">
        {/* Lattice-inspired logo animation */}
        <div className="relative w-24 h-24 mb-10">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 10, 
              ease: "linear" 
            }}
            className="absolute inset-0 border-[3px] border-[#C5A059]/30 rounded-full"
          />
          <motion.div
            animate={{ 
              scale: [0.8, 1, 0.8],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3, 
              ease: "easeInOut" 
            }}
            className="absolute inset-4 border border-[#C5A059] rounded-full flex items-center justify-center"
          >
             <i className="fas fa-crown text-[#C5A059] text-xl"></i>
          </motion.div>
          {/* Lattice Pattern Simulation */}
          {[0, 45, 90, 135].map(deg => (
            <div key={deg} className="absolute inset-0 flex items-center justify-center opacity-20" style={{ transform: `rotate(${deg}deg)` }}>
              <div className="w-full h-[1px] bg-[#C5A059]"></div>
            </div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="text-[#C5A059] font-serif text-3xl tracking-[0.3em] uppercase font-bold mb-1">
            Deccan Serai
          </p>
          <div className="flex items-center justify-center w-full gap-2">
            <div className="h-[1px] w-8 bg-[#C5A059]/30"></div>
            <span className="text-[9px] text-white/40 font-black uppercase tracking-[0.5em]">HOTEL</span>
            <div className="h-[1px] w-8 bg-[#C5A059]/30"></div>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-20 w-48 h-0.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-full h-full bg-[#C5A059]"
        />
      </div>
    </motion.div>
  );
};
