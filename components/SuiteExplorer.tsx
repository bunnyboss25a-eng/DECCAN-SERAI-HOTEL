
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { HOTEL_ASSETS } from '../constants';

interface SuiteExplorerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GroundingSource {
  title: string;
  uri: string;
}

export const SuiteExplorer: React.FC<SuiteExplorerProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string>("");
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [activeTab, setActiveTab] = useState<'interior' | 'exterior'>('interior');

  const fetchRealHotelData = async () => {
    setLoading(true);
    setData("");
    setSources([]);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      
      const prompt = `Provide a sophisticated luxury travel summary for Deccan Serai hotel in HITEC City, Hyderabad. 
      Describe:
      1. INDOOR AMBIANCE: Luxurious room categories, bathrooms, and premium amenities.
      2. EXTERIOR CONTEXT: Location in the IT corridor, nearby landmarks like Cyber Towers, and skyline views.
      Return a welcoming overview for premium travelers.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", 
        contents: prompt,
        config: {
          tools: [{ googleMaps: {} }, { googleSearch: {} }],
        },
      });

      const text = response.text || "Deccan Serai offers a premium sanctuary in the heart of Hyderabad's tech hub.";
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      
      const extractedSources: GroundingSource[] = chunks
        .map((chunk: any) => {
          if (chunk.maps) return { title: chunk.maps.title, uri: chunk.maps.uri };
          if (chunk.web) return { title: chunk.web.title, uri: chunk.web.uri };
          return null;
        })
        .filter((s: any) => s !== null);

      setData(text);
      setSources(extractedSources);
    } catch (error) {
      console.error("Gemini Error:", error);
      setData("Welcome to Deccan Serai. Our suites combine high-tech utility with traditional luxury in Hyderabad's HITEC City.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchRealHotelData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <div className="absolute inset-0 bg-[#002366]/80 backdrop-blur-md" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-[110] w-12 h-12 bg-white/20 hover:bg-[#50C878] text-slate-800 hover:text-white rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 transition-all"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="w-full md:w-5/12 bg-slate-900 relative min-h-[300px] md:min-h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <img 
                src={activeTab === 'interior' 
                  ? HOTEL_ASSETS.bedroom
                  : HOTEL_ASSETS.courtyard
                } 
                className="w-full h-full object-cover opacity-80" 
                alt={activeTab} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                 <p className="text-[10px] font-black uppercase tracking-widest text-[#50C878] mb-2">{activeTab === 'interior' ? 'Indoor View' : 'Outdoor View'}</p>
                 <h4 className="text-3xl font-serif">{activeTab === 'interior' ? 'Refined Comfort' : 'Serene Courtyard'}</h4>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute top-10 left-10 flex flex-col gap-4">
            <button 
              onClick={() => setActiveTab('interior')}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'interior' ? 'bg-[#50C878] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              Interior
            </button>
            <button 
              onClick={() => setActiveTab('exterior')}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'exterior' ? 'bg-[#50C878] text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
            >
              Exterior
            </button>
          </div>
        </div>

        <div className="w-full md:w-7/12 p-8 md:p-16 overflow-y-auto bg-white">
          <div className="mb-12">
            <span className="text-[#50C878] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Grounding Research</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#002366] leading-tight">
              Virtual <span className="text-[#50C878] italic">Concierge</span>
            </h2>
          </div>

          <div className="space-y-8 mb-12">
            {loading ? (
              <div className="space-y-6">
                <div className="h-4 bg-slate-100 rounded-full w-full animate-pulse" />
                <div className="h-4 bg-slate-100 rounded-full w-5/6 animate-pulse" />
                <div className="h-4 bg-slate-100 rounded-full w-4/6 animate-pulse" />
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-lg font-light">
                  {data}
                </p>
              </motion.div>
            )}
          </div>

          {sources.length > 0 && (
            <div className="mb-12">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Live References</p>
              <div className="flex flex-wrap gap-2">
                {sources.map((source, i) => (
                  <a 
                    key={i} 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-slate-100 hover:bg-[#002366] text-slate-600 hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border border-slate-200"
                  >
                    {source.title || "View on Map"}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="pt-8 border-t border-slate-100">
            <button 
              onClick={onClose}
              className="w-full px-10 py-5 bg-[#002366] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#50C878] transition-all transform hover:-translate-y-1"
            >
              Back to Reservation
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};