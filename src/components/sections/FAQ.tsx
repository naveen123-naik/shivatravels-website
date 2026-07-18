'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqsList = [
    {
      question: 'How do I book a car with Shiva Naik Travels?',
      answer: 'You can easily book a vehicle online using our booking form on this website, or by calling our customer support directly at +91 98480 22338. Once submitted, our team reviews the request and sends a booking confirmation with details.',
    },
    {
      question: 'Is the driver allowance included in the fare?',
      answer: 'For outstation trips, the driver allowance is listed separately (ranging from ₹300 to ₹600 per day depending on the vehicle class) and is added to the final billing statement. Base rates are calculated strictly per kilometer.',
    },
    {
      question: 'Can I cancel or reschedule my booking?',
      answer: 'Yes, we offer free cancellation and rescheduling up to 24 hours prior to your scheduled pickup time. Cancellations made within 24 hours may attract a small processing fee depending on the vehicle availability.',
    },
    {
      question: 'Do you provide airport pickup and drop-offs?',
      answer: 'Yes, we provide 24/7 dedicated airport transfers to and from Rajiv Gandhi International Airport (RGIA) and others. Our drivers track your flight status to ensure timely arrivals.',
    },
    {
      question: 'Can I book a vehicle for multi-day temple or family tours?',
      answer: 'Absolutely! We offer customized multi-day packages for family holidays, business travel, and temple tours (like Tirupati, Srisailam, and Yadadri) at special discounted rates. You can also design your own route.',
    },
    {
      question: 'Are there any hidden charges or state entry fees?',
      answer: 'No, we believe in 100% transparent pricing. All charges (per KM rate, driver allowance) are clearly stated beforehand. Toll gates, parking charges, and state permits are to be paid by the customer as actuals, or can be estimated in our Fare Estimator.',
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white dark:bg-navy-950 relative overflow-hidden">
      {/* Background visual shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-navy-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-gold-500">
            Common Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4 leading-tight">
            {t.faq.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqsList.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-navy-950/40 border border-slate-200/60 dark:border-slate-800/40 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left font-bold text-slate-900 dark:text-white hover:text-gold-500 dark:hover:text-gold-400 transition-colors cursor-pointer gap-4"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle size={18} className="text-gold-500 shrink-0" />
                    <span className="text-sm sm:text-base font-bold">{faq.question}</span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-slate-450 dark:text-slate-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-gold-500' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-450 font-medium border-t border-slate-100 dark:border-slate-800/60 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
