'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useMockDB } from '@/context/MockDBContext';
import { Clock, Navigation, Car, Hotel, Utensils, Check, X, PhoneCall } from 'lucide-react';

export const TourPackages: React.FC = () => {
  const { t } = useLanguage();
  const { packages } = useMockDB();



  return (
    <section id="packages" className="py-20 bg-slate-50 dark:bg-navy-950/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-gold-500">
            Handpicked Itineraries
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4 leading-tight">
            {t.packages.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            {t.packages.subtitle}
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-white dark:bg-navy-950/60 border border-slate-200/80 dark:border-slate-800/40 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-gold-500/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Package Header Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-navy-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pkg.image}
                    alt={pkg.destination}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-navy-950/80 backdrop-blur-md text-white border border-white/10 px-3 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1">
                    <Clock size={12} className="text-gold-500" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                {/* Content Panel */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 leading-snug group-hover:text-gold-500 transition-colors">
                    {pkg.destination}
                  </h3>

                  {/* Included Badges */}
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800/60 pb-4 mb-4">
                    <div className="flex items-center gap-1" title="Hotel Inclusion">
                      <Hotel size={14} className={pkg.hotelIncluded ? 'text-green-500' : 'text-slate-400 dark:text-slate-600'} />
                      <span className="text-[10px]">{t.packages.hotel}</span>
                      {pkg.hotelIncluded ? <Check size={10} className="text-green-500" /> : <X size={10} className="text-slate-400" />}
                    </div>
                    <div className="flex items-center gap-1" title="Meals Inclusion">
                      <Utensils size={14} className={pkg.mealsIncluded ? 'text-green-500' : 'text-slate-400 dark:text-slate-600'} />
                      <span className="text-[10px]">{t.packages.meals}</span>
                      {pkg.mealsIncluded ? <Check size={10} className="text-green-500" /> : <X size={10} className="text-slate-400" />}
                    </div>
                  </div>

                  {/* Sightseeing List */}
                  <div>
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                      {t.packages.places}
                    </h4>
                    <ul className="space-y-1.5 mb-2">
                      {pkg.placesCovered.map((place, pIdx) => (
                        <li key={pIdx} className="text-xs font-semibold text-slate-650 dark:text-slate-350 flex items-start gap-2">
                          <Navigation size={12} className="text-gold-500 shrink-0 mt-0.5" />
                          <span>{place}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="p-6 pt-0 mt-auto">
                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pt-5 mt-4">
                  <div>
                    <span className="block text-[8px] text-slate-400 uppercase tracking-wider font-extrabold">
                      {t.destinations.startingFrom}
                    </span>
                    <span className="text-xl font-extrabold text-navy-500 dark:text-gold-400 leading-none">
                      ₹{pkg.price}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold block mt-1 flex items-center gap-1">
                      <Car size={10} className="text-gold-500" /> {pkg.vehicleIncluded}
                    </span>
                  </div>

                  <a
                    href="tel:+918074324003"
                    className="py-2.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-850 font-bold text-xs flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                  >
                    <PhoneCall size={14} className="animate-[wiggle_1.5s_infinite]" />
                    Call to Book
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
