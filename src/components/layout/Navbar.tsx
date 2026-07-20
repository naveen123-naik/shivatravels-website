'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { Globe, Menu, X, ShieldAlert, Sun, Moon } from 'lucide-react';
import { Language } from '@/data/translations';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.home, id: 'home' },
    { label: t.nav.fleet, id: 'fleet' },
    { label: t.nav.places, id: 'destinations' },
    { label: t.nav.gallery, id: 'gallery' },
    { label: t.nav.testimonials, id: 'testimonials' },
    { label: t.nav.faqs, id: 'faq' },
    { label: t.nav.contact, id: 'contact' },
  ];

  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // updated offset to clear banner + navbar height
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

  const languagesList: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'hi', label: 'हिन्दी' },
  ];

  return (
    <nav
      className={`relative w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-navy-950/90 backdrop-blur-md py-3 border-b border-slate-200/80 dark:border-slate-800/50 shadow-md'
          : 'bg-transparent py-5 border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer gap-2" onClick={() => handleScrollTo('home')}>
            <div className="h-12 w-12 rounded-xl overflow-hidden bg-white flex items-center justify-center shadow-md p-1">
              <img 
                src="/logo.png" 
                alt="Shiva Travels Logo" 
                className="h-full w-full object-contain scale-110 select-none" 
              />
            </div>
            <div>
              <span className={`font-black text-xl tracking-tight transition-colors duration-300 block ${
                isScrolled ? 'text-navy-500 dark:text-gold-400' : 'text-white'
              }`}>
                SHIVA TRAVELS
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 hover:text-gold-500 ${
                  isScrolled
                    ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-950/40'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action Tools */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className={`p-2 rounded-full transition-colors flex items-center ${
                  isScrolled
                    ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-950/40'
                    : 'text-white hover:bg-white/10'
                }`}
                title="Change Language"
              >
                <Globe size={18} />
                <span className="ml-1 text-xs uppercase font-bold">{language}</span>
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white dark:bg-navy-950 border border-slate-200 dark:border-slate-800 ring-1 ring-black/5 z-50 overflow-hidden">
                  <div className="py-1">
                    {languagesList.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-navy-800 flex justify-between items-center ${
                          language === lang.code
                            ? 'text-gold-500 bg-slate-50 dark:bg-navy-900'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {lang.label}
                        {language === lang.code && <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>





            {/* Admin Link */}
            <Link
              href="/admin"
              className={`p-2 rounded-full transition-colors ${
                isScrolled
                  ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-950/40'
                  : 'text-white hover:bg-white/10'
              }`}
              title="Admin Dashboard"
            >
              <ShieldAlert size={18} className="text-red-500 hover:text-red-600 dark:text-red-400" />
            </Link>


          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex lg:hidden items-center space-x-2">
            {/* Lang Button */}
            <button
              onClick={() => {
                const idx = languagesList.findIndex((l) => l.code === language);
                const nextLang = languagesList[(idx + 1) % languagesList.length].code;
                setLanguage(nextLang);
              }}
              className={`p-2 rounded-full transition-colors ${
                isScrolled ? 'text-slate-700 dark:text-slate-200' : 'text-white'
              }`}
              title="Quick Toggle Language"
            >
              <Globe size={18} />
            </button>





            {/* Admin Link */}
            <Link
              href="/admin"
              className={`p-2 rounded-full transition-colors ${
                isScrolled ? 'text-slate-700 dark:text-slate-200' : 'text-white'
              }`}
            >
              <ShieldAlert size={18} className="text-red-500" />
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md transition-colors ${
                isScrolled ? 'text-slate-700 dark:text-slate-200' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-navy-950 border-b border-slate-200 dark:border-slate-800 shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className="w-full text-left block px-4 py-2.5 rounded-md text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-900/60 transition-colors"
              >
                {item.label}
              </button>
            ))}

          </div>
        </div>
      )}
    </nav>
  );
};
