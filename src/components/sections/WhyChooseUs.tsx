'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
  UserCheck,
  Navigation,
  Sparkles,
  BadgeIndianRupee,
  Receipt,
  AlertOctagon,
  Clock,
  HelpCircle
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <UserCheck className="w-6 h-6 text-gold-500" />,
      title: t.whyUs.drivers,
      desc: t.whyUs.driversDesc,
    },
    {
      icon: <Navigation className="w-6 h-6 text-gold-500" />,
      title: t.whyUs.gps,
      desc: t.whyUs.gpsDesc,
    },
    {
      icon: <Sparkles className="w-6 h-6 text-gold-500" />,
      title: t.whyUs.sanitized,
      desc: t.whyUs.sanitizedDesc,
    },
    {
      icon: <BadgeIndianRupee className="w-6 h-6 text-gold-500" />,
      title: t.whyUs.affordable,
      desc: t.whyUs.affordableDesc,
    },
    {
      icon: <Receipt className="w-6 h-6 text-gold-500" />,
      title: t.whyUs.transparent,
      desc: t.whyUs.transparentDesc,
    },
    {
      icon: <AlertOctagon className="w-6 h-6 text-gold-500" />,
      title: t.whyUs.noHidden,
      desc: t.whyUs.noHiddenDesc,
    },
    {
      icon: <Clock className="w-6 h-6 text-gold-500" />,
      title: t.whyUs.onTime,
      desc: t.whyUs.onTimeDesc,
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-gold-500" />,
      title: t.whyUs.support,
      desc: t.whyUs.supportDesc,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-navy-950/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-gold-500">
            Our Key Values
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4 leading-tight">
            {t.whyUs.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            {t.whyUs.subtitle}
          </p>
        </div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-navy-950/60 dark:border-navy-900 border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-xl dark:hover:shadow-gold-500/5 hover:-translate-y-1 hover:border-gold-500/50 dark:hover:border-gold-500/50 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-2xl bg-navy-50 dark:bg-navy-900 border border-navy-100/50 dark:border-navy-800 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-gold-500/10">
                {feature.icon}
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-gold-500 transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
