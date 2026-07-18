'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { OffersBanner } from '@/components/layout/OffersBanner';
import { CallNowButton } from '@/components/layout/CallNowButton';
import { Hero } from '@/components/sections/Hero';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { Fleet } from '@/components/sections/Fleet';
import { Reviews } from '@/components/sections/Reviews';
import { Gallery } from '@/components/sections/Gallery';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      {/* Fixed top header grouping banner and nav */}
      <header className="fixed top-0 left-0 w-full z-50">
        {/* Top festival offer ticker */}
        <OffersBanner />
        
        {/* Sticky header navigation */}
        <Navbar />
      </header>

      {/* Main content body */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Core Values Section */}
        <WhyChooseUs />

        {/* Fleet Section */}
        <Fleet />

        {/* Customer reviews slider */}
        <Reviews />

        {/* Visual masonry gallery */}
        <Gallery />

        {/* Accordion FAQ list */}
        <FAQ />

        {/* Interactive contact panel with Google maps */}
        <Contact />
      </main>

      {/* Corporate detailed footer */}
      <Footer />

      {/* Floating phone dial button */}
      <CallNowButton />
    </>
  );
}
