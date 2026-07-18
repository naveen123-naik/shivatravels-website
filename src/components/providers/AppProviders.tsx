'use client';

import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { MockDBProvider } from '@/context/MockDBContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MockDBProvider>
          {children}
        </MockDBProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};
