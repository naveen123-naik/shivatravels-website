'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

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

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-slate-800 pt-16 pb-8 relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center mb-4 cursor-pointer gap-2" onClick={() => handleScrollTo('home')}>
              <div className="h-12 w-12 rounded-xl overflow-hidden bg-white flex items-center justify-center shadow-lg p-1">
                <img 
                  src="/logo.png" 
                  alt="Shiva Travels Logo" 
                  className="h-full w-full object-contain scale-110 select-none" 
                />
              </div>
              <div>
                <span className="font-black text-xl tracking-tight text-white block">
                  SHIVA TRAVELS
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {t.hero.subtitle}
            </p>
            <div className="flex space-x-3">


              <a href="https://wa.me/918074324003" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-200">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base uppercase tracking-wider mb-6 border-l-2 border-gold-500 pl-3">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: t.nav.home, id: 'home' },
                { label: t.nav.gallery, id: 'gallery' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleScrollTo(link.id)}
                    className="hover:text-gold-500 transition-colors text-left hover:translate-x-1 duration-150 transform inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Hours */}
          <div>
            <h4 className="text-white font-bold text-base uppercase tracking-wider mb-6 border-l-2 border-gold-500 pl-3">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm text-slate-350">
              <li className="flex items-start">
                <MapPin size={18} className="text-gold-500 mr-3 mt-0.5 shrink-0" />
                <a
                  href="https://maps.app.goo.gl/yEk4kYGw7N9gNx478"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-500 transition-colors"
                >
                  Plot No 24, Phase 3, Gachibowli,<br />
                  Hyderabad, Telangana 500032
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-gold-500 mr-3 shrink-0" />
                <a href="tel:+918074324003" className="hover:text-gold-500 transition-colors">
                  +91 80743 24003
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-gold-500 mr-3 shrink-0" />
                <a href="mailto:bookings@shivanaiktravels.com" className="hover:text-gold-500 transition-colors">
                  bookings@shivanaiktravels.com
                </a>
              </li>
              <li className="flex items-start pt-2 border-t border-slate-800">
                <Clock size={18} className="text-gold-500 mr-3 mt-0.5 shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold text-white">{t.contact.hours}</p>
                  <p className="mt-0.5 text-slate-400">{t.contact.hoursWeekdays}</p>
                  <p className="text-slate-400">{t.contact.hoursWeekends}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p className="mb-4 md:mb-0">
            &copy; {currentYear} Shiva Naik Travels. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gold-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
