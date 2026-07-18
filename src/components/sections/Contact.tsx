'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

import { useMockDB } from '@/context/MockDBContext';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const { addMessage } = useMockDB();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    addMessage({ name, phone, email, message });

    setIsSubmitted(true);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-navy-950/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-gold-500">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4 leading-tight">
            {t.contact.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-navy-950 text-white border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Background design */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-[60px] pointer-events-none" />

            <div>
              <h3 className="text-xl font-bold uppercase tracking-wider text-gold-500 border-b border-white/10 pb-4 mb-6">
                Travel Desk Information
              </h3>

              <div className="space-y-6">
                <a
                  href="https://maps.app.goo.gl/yEk4kYGw7N9gNx478"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group hover:text-gold-500 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-gold-500/30 transition-colors">
                    <MapPin size={18} className="text-gold-500 animate-bounce" />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-extrabold mb-1">
                      {t.contact.address}
                    </span>
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-gold-500 transition-colors">
                      Plot No 24, Phase 3, Gachibowli,<br />
                      Hyderabad, Telangana 500032
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-gold-500" />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-extrabold mb-1">
                      {t.contact.phone}
                    </span>
                    <a href="tel:+918074324003" className="text-sm font-semibold text-slate-200 hover:text-gold-500 transition-colors">
                      +91 80743 24003
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-gold-500" />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-extrabold mb-1">
                      {t.contact.email}
                    </span>
                    <a href="mailto:bookings@shivanaiktravels.com" className="text-sm font-semibold text-slate-200 hover:text-gold-500 transition-colors">
                      bookings@shivanaiktravels.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-gold-500" />
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-extrabold mb-1">
                      {t.contact.hours}
                    </span>
                    <span className="text-xs font-semibold text-slate-200 block">
                      {t.contact.hoursWeekdays}
                    </span>
                    <span className="text-xs font-semibold text-slate-250 block mt-0.5">
                      {t.contact.hoursWeekends}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Frame Container */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 h-44 shadow-inner relative group">
              <iframe
                title="Office Location Map"
                src="https://maps.google.com/maps?q=17.428432,78.332432&z=15&output=embed"
                className="w-full h-full border-0 opacity-100 transition-all duration-300"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href="https://maps.app.goo.gl/yEk4kYGw7N9gNx478"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 cursor-pointer"
                title="Open in Google Maps"
              />
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7 bg-white dark:bg-navy-950/60 border border-slate-200/80 dark:border-slate-800/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800/60 pb-4">
              Send Us a Message
            </h3>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 p-8 rounded-2xl text-center flex flex-col items-center justify-center space-y-3"
                >
                  <CheckCircle2 size={48} className="text-green-500 animate-bounce" />
                  <h4 className="font-extrabold text-lg">Message Dispatched!</h4>
                  <p className="text-xs font-semibold leading-relaxed max-w-sm">
                    {t.contact.success} Our travel desk team will get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-extrabold tracking-wider text-slate-450 dark:text-slate-500 mb-1.5">
                        {t.contact.formName}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-900 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder="e.g. Shiva Kumar"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-extrabold tracking-wider text-slate-450 dark:text-slate-500 mb-1.5">
                        {t.contact.formPhone}
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-900 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder="e.g. 9876543210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-extrabold tracking-wider text-slate-450 dark:text-slate-500 mb-1.5">
                      {t.contact.formEmail}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-900 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors"
                      placeholder="e.g. shiva@example.com (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-extrabold tracking-wider text-slate-450 dark:text-slate-500 mb-1.5">
                      {t.contact.formMsg}
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-900 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors resize-none"
                      placeholder="Enter details of your trip requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-navy-500 dark:bg-gold-500 hover:bg-navy-600 dark:hover:bg-gold-600 text-white dark:text-navy-850 font-bold rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send size={16} />
                    {t.contact.send}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
