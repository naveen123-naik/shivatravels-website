'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useMockDB } from '@/context/MockDBContext';
import { MapPin, Navigation, Clock } from 'lucide-react';

export const Destinations: React.FC = () => {
  const { t } = useLanguage();
  const { destinations } = useMockDB();

  const handleSelectDestination = () => {
    const targetElement = document.getElementById('contact');
    if (targetElement) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = targetElement.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="destinations" className="py-20 bg-white dark:bg-navy-950 relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-navy-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-0 w-80 h-80 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-gold-500">
            Top Travel Getaways
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4 leading-tight">
            {t.destinations.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            {t.destinations.subtitle}
          </p>
        </div>

        {/* Centered Flex Container */}
        <div className="flex flex-wrap justify-center gap-6">
          {destinations.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: (idx % 4) * 0.05 }}
              className="w-full sm:w-[320px] group relative h-80 rounded-2xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              onClick={handleSelectDestination}
            >
              {/* Image background or Placeholder */}
              {dest.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950 flex items-center justify-center transition-all duration-300 group-hover:from-navy-750 group-hover:to-navy-900">
                  <div className="text-white/10 group-hover:text-gold-500/10 transition-colors duration-300">
                    <MapPin size={90} className="stroke-[1]" />
                  </div>
                </div>
              )}
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-black/10 transition-opacity duration-300 group-hover:opacity-90" />
              
              {/* Content Panel */}
              <div className="absolute bottom-0 left-0 w-full p-5 text-white flex flex-col justify-end">
                <div className="flex items-center gap-1.5 mb-1.5 text-gold-500">
                  <MapPin size={14} className="animate-bounce" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">
                    Hotspot
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 tracking-tight group-hover:text-gold-400 transition-colors">
                  {dest.name}
                </h3>
                
                {/* Duration details only */}
                <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-semibold border-t border-white/10 pt-2.5">
                  <Clock size={11} className="text-slate-450" />
                  <span>{dest.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
