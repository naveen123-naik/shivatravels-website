import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/components/providers/AppProviders';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Shiva Naik Travels | Premium Car Rentals & Custom Tours',
  description: 'Experience luxury, safety, and reliability with Shiva Naik Travels. Professional drivers, sanitized cars, airport transfers, outstations, and customized tour packages.',
  keywords: 'Shiva Naik Travels, luxury car rental, tour packages, airport pickup, outstation trip, family tours, temple tours, Hyderabad travel agency',
  authors: [{ name: 'Shiva Naik Travels' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} scroll-smooth`}>
      <head>
        {/* PWA Manifest, Apple Icons, etc. can go here */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 min-h-screen transition-colors duration-300">
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
