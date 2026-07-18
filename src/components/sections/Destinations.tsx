'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useMockDB } from '@/context/MockDBContext';
import { MapPin, Navigation, Clock, CreditCard } from 'lucide-react';

export const Destinations: React.FC = () => {
  const { t } = useLanguage();
  const { destinations } = useMockDB();

  const handleSelectDestination = (destName: string) => {
    // Dispatch a custom event to notify BookingForm/Estimator about destination pre-selection
    const event = new CustomEvent('preselect-destination', { detail: { destination: destName } });
    window.dispatchEvent(event);

    const element = document.getElementById('booking-section');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
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

        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {destinations.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: (idx % 5) * 0.05 }}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              onClick={() => handleSelectDestination(dest.name)}
            >
              {/* Image background */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              
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
                
                {/* Distance & Time details */}
                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-350 font-semibold border-t border-white/10 pt-2.5 mb-3">
                  <div className="flex items-center gap-1">
                    <Navigation size={10} className="text-slate-400" />
                    <span>{dest.distance > 0 ? `${dest.distance} km` : 'Local'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={10} className="text-slate-400" />
                    <span>{dest.duration}</span>
                  </div>
                </div>

                {/* Starting fare and quick action button */}
                <div className="flex items-center justify-between mt-1">
                  <div>
                    <span className="block text-[8px] text-slate-400 uppercase tracking-wider font-bold">
                      {t.destinations.startingFrom}
                    </span>
                    <span className="text-sm font-extrabold text-gold-500">
                      ₹{dest.startingFare}
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold bg-gold-500 hover:bg-gold-600 text-navy-850 px-3 py-1.5 rounded-lg group-hover:scale-105 transition-transform duration-200">
                    Book Now
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
