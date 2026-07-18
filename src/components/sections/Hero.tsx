'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, UserCheck, Clock, BadgeIndianRupee, Star, PhoneCall } from 'lucide-react';

const heroSlides = [
  'https://images.unsplash.com/photo-1547841243-eacb14453cd9?w=1600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=1600&auto=format&fit=crop&q=80',
];

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
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

  const trustBadges = [
    { icon: <Clock size={20} className="text-gold-500" />, text: t.hero.badge247 },
    { icon: <UserCheck size={20} className="text-gold-500" />, text: t.hero.badgeDrivers },
    { icon: <ShieldCheck size={20} className="text-gold-500" />, text: t.hero.badgeClean },
    { icon: <BadgeIndianRupee size={20} className="text-gold-500" />, text: t.hero.badgePricing },
    { icon: <Star size={20} className="text-gold-500 animate-pulse" />, text: t.hero.badgeTrusted },
  ];

  return (
    <section id="home" className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[currentSlide]})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/60 to-navy-950/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent dark:from-slate-950" />
      </div>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center justify-center h-full pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl"
        >
          <span className="inline-block text-gold-500 uppercase tracking-[0.25em] text-xs sm:text-sm font-bold bg-gold-500/10 px-4 py-1.5 rounded-full border border-gold-500/25 mb-6">
            Luxury & Safe Car Rentals
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Welcome to <span className="text-gold-500 text-gold-gradient font-black">Shiva Travels</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed font-medium mb-10 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col items-center justify-center mb-16">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-2xl">
              <a
                href="tel:+918074324003"
                className="w-full sm:w-1/2 bg-gold-500 hover:bg-gold-600 text-navy-850 font-extrabold px-6 py-4 rounded-full shadow-lg hover:shadow-gold-500/35 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer text-sm sm:text-base whitespace-nowrap"
              >
                <PhoneCall size={18} className="text-navy-850 animate-[wiggle_1.5s_infinite]" />
                Call Now (+91 80743 24003)
              </a>
              <a
                href="https://wa.me/918074324003"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-4 rounded-full shadow-lg hover:shadow-emerald-600/35 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer text-sm sm:text-base"
              >
                <svg className="w-5 h-5 fill-current text-white animate-[bounce_1.5s_infinite]" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.528 2.02 14.07 1 11.512 1c-5.45 0-9.88 4.379-9.884 9.806-.002 2.014.524 3.987 1.523 5.717L2.146 21.8l5.501-1.446zM17.43 14.96c-.32-.16-1.89-.93-2.18-1.04-.3-.1-.51-.15-.72.15-.22.3-.83.99-1.02 1.2-.18.2-.37.22-.69.06-1.3-.65-2.28-1.15-3.17-2.67-.23-.4-.08-.62.08-.78.14-.14.32-.37.48-.56.16-.18.22-.3.32-.51.1-.22.05-.41-.03-.57-.08-.16-.72-1.73-.99-2.38-.26-.63-.53-.54-.72-.55-.19-.01-.41-.01-.62-.01-.21 0-.55.08-.84.4-.29.32-1.11 1.08-1.11 2.63 0 1.55 1.13 3.05 1.28 3.26.16.21 2.2 3.35 5.33 4.7 1.05.45 1.87.73 2.51.93.72.23 1.38.2 1.9.12.58-.09 1.89-.77 2.16-1.48.27-.71.27-1.33.19-1.46-.09-.13-.3-.21-.62-.37z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-5xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6">
            {trustBadges.map((badge, idx) => (
              <div
                key={idx}
                className="bg-navy-950/60 dark:bg-navy-950/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center justify-center transition-all duration-300 hover:border-gold-500/50 hover:bg-navy-950/80 group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-2.5 shadow-inner transition-transform duration-300 group-hover:scale-110">
                  {badge.icon}
                </div>
                <span className="text-white text-xs font-bold leading-tight select-none">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
