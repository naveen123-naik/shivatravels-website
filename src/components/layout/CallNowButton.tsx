'use client';

import React, { useState } from 'react';
import { PhoneCall } from 'lucide-react';

export const CallNowButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip text panel */}
      <div
        className={`glass-panel border-gold-500/30 text-navy-850 dark:text-gold-400 font-bold px-4 py-2 rounded-xl text-xs shadow-lg transition-all duration-300 hidden md:block ${
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        <p className="font-extrabold text-navy-950 dark:text-white">Need Immediate Booking?</p>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Call our travel expert: +91 80743 24003</p>
      </div>

      {/* Floating pulsing button */}
      <a
        href="tel:+918074324003"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 bg-gold-500 hover:bg-gold-600 dark:bg-gold-500 dark:hover:bg-gold-600 text-navy-850 flex items-center justify-center rounded-full shadow-2xl hover:shadow-gold-500/30 hover:scale-110 active:scale-95 transition-all duration-300 relative group"
        aria-label="Call Now"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-gold-500 animate-ping opacity-25 group-hover:opacity-40" />
        <span className="absolute -inset-1 rounded-full bg-gold-500/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <PhoneCall size={24} className="relative z-10 animate-[wiggle_1.5s_ease-in-out_infinite]" />
      </a>

      <style jsx global>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          15% { transform: rotate(-15deg); }
          30% { transform: rotate(12deg); }
          45% { transform: rotate(-10deg); }
          60% { transform: rotate(8deg); }
          75% { transform: rotate(-4deg); }
        }
      `}</style>
    </div>
  );
};
