'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language, Dictionary } from '../data/translations';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('snt_lang') as Language;
      if (saved && (saved === 'en' || saved === 'te' || saved === 'hi')) {
        setLanguageState(saved);
      }
    } catch (e) {
      console.warn('LocalStorage language read blocked:', e);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('snt_lang', lang);
    } catch (e) {
      console.warn('LocalStorage language write blocked:', e);
    }
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
