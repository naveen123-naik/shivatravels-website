'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMockDB } from '@/context/MockDBContext';
import { Maximize2, Image as ImageIcon } from 'lucide-react';

export const Gallery: React.FC = () => {
  // const { t } = useLanguage();
  const { gallery } = useMockDB();
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Cars' | 'Places' | 'Customers'>('All');
  const [activeOverlayImage, setActiveOverlayImage] = useState<string | null>(null);

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

  const filters: ('All' | 'Cars' | 'Places' | 'Customers')[] = ['All', 'Cars', 'Places', 'Customers'];

  const filteredItems = gallery
    .filter(item => item.category !== 'Roads')
    .filter(item => selectedFilter === 'All' || item.category === selectedFilter);

  return (
    <section id="gallery" className="py-20 bg-slate-50 dark:bg-navy-950/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-gold-500">
            Visual Memories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4 leading-tight">
            Our Travel Gallery
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            Catch a glimpse of our vehicles on road, scenic routes, happy tour clients, and popular tourist getaways.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                selectedFilter === f
                  ? 'bg-navy-500 text-white dark:bg-gold-500 dark:text-navy-850 shadow-md hover:shadow-lg'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 dark:bg-navy-950 dark:text-slate-350 dark:border-slate-800 dark:hover:bg-navy-900/60'
              }`}
            >
              {f === 'All' ? 'All Images' : f}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveOverlayImage(item.image)}
                className="break-inside-avoid relative rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl cursor-zoom-in transition-all duration-300"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 rounded-3xl"
                  loading="lazy"
                />

                {/* Cover Overlay */}
                <div className="absolute inset-0 bg-navy-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 border border-gold-500/20 rounded-3xl">
                  <Maximize2 size={24} className="text-gold-500 absolute top-6 right-6 transform scale-75 group-hover:scale-100 transition-transform duration-300" />
                  
                  <div className="flex items-center gap-1.5 text-gold-500 text-[9px] font-extrabold uppercase tracking-widest mb-1.5">
                    <ImageIcon size={10} />
                    <span>{item.category}</span>
                  </div>

                  <h3 className="text-white font-bold text-base tracking-tight leading-snug">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Image Zoom Modal */}
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
                  alt="Zoomed Travel Photo"
                  className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-white/10 shadow-2xl cursor-default"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
