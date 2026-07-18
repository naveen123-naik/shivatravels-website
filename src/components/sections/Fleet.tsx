'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useMockDB } from '@/context/MockDBContext';

export const Fleet: React.FC = () => {
  const { t } = useLanguage();
  const { vehicles } = useMockDB();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeOverlayImage, setActiveOverlayImage] = useState<string | null>(null);

  const categories = ['All', 'Hatchback', 'Sedan', 'SUV', 'Luxury SUV', 'Tempo Traveller', 'Mini Bus'];

  const filteredVehicles = selectedCategory === 'All'
    ? vehicles
    : vehicles.filter(v => v.category === selectedCategory);

  // Lock body scroll when lightbox is active to prevent background scrolling
  useEffect(() => {
    if (activeOverlayImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeOverlayImage]);

  return (
    <section id="fleet" className="py-20 bg-slate-50 dark:bg-navy-950/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-gold-500">
            Premium Transport Fleet
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4 leading-tight">
            {t.fleet.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            {t.fleet.subtitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-navy-500 text-white dark:bg-gold-500 dark:text-navy-850 shadow-md hover:shadow-lg scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 dark:bg-navy-950 dark:text-slate-350 dark:border-slate-800 dark:hover:bg-navy-900/60'
              }`}
            >
              {cat === 'All' ? t.fleet.all : cat}
            </button>
          ))}
        </div>

        {/* Fleet Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredVehicles.map((vehicle) => (
              <motion.div
                layout
                key={vehicle.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-navy-950/60 border border-slate-200/85 dark:border-slate-800/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-gold-500/5 hover:-translate-y-1.5 transition-all duration-350 group flex flex-col justify-between p-4"
              >
                {/* Image Section */}
                <div 
                  className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-navy-900 rounded-2xl cursor-pointer"
                  onClick={() => setActiveOverlayImage(vehicle.image)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-navy-950/80 backdrop-blur-md text-white border border-white/10 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider">
                    {vehicle.category}
                  </div>
                </div>

                {/* Title & Button Section */}
                <div className="pt-4 flex flex-col items-center justify-between flex-grow">
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4 text-center leading-snug group-hover:text-gold-500 transition-colors">
                    {vehicle.name}
                  </h3>
                  
                  <button
                    onClick={() => setActiveOverlayImage(vehicle.image)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-850 dark:hover:bg-slate-800 font-bold text-xs transition-all duration-200 cursor-pointer text-center"
                  >
                    View Vehicle Images
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Image Zoom Lightbox */}
        <AnimatePresence>
          {activeOverlayImage && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 cursor-zoom-out"
              onClick={() => setActiveOverlayImage(null)}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-navy-950/90 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-4xl w-full max-h-[85vh] z-10 flex items-center justify-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeOverlayImage}
                  alt="Zoomed Vehicle Photo"
                  className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-white/10 shadow-2xl cursor-default"
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
