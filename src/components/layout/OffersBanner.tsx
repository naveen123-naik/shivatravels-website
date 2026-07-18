'use client';

import React from 'react';
import { Tag, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const OffersBanner: React.FC = () => {
  const { language } = useLanguage();
  
  const offers = {
    en: [
      '🔥 FESTIVAL OFFER: Use code FESTIVAL500 to get flat ₹500 off on outstation round trips!',
      '✨ FIRST TIME USER? Use WELCOME10 for 10% off on your first ride.',
      '🙏 PILGRIMAGE DISCOUNT: Save ₹200 on Tirupati and Srisailam packages using TEMPLE200.',
      '📞 Call +91 63018 39837 for customized itinerary planning.'
    ],
    te: [
      '🔥 పండుగ ఆఫర్: అవుట్‌స్టేషన్ రౌండ్ ట్రిప్స్‌పై ₹500 తగ్గింపు కోసం FESTIVAL500 ఉపయోగించండి!',
      '✨ మొదటిసారి ప్రయాణిస్తున్నారా? మీ మొదటి రైడ్‌పై 10% తగ్గింపు కోసం WELCOME10 ఉపయోగించండి.',
      '🙏 పుణ్యక్షేత్రాల తగ్గింపు: TEMPLE200 ఉపయోగించి తిరుపతి మరియు శ్రీశైలం ప్యాకేజీలపై ₹200 ఆదా చేయండి.',
      '📞 కస్టమ్ టూర్ ప్లాన్ల కొరకు +91 63018 39837 కి కాల్ చేయండి.'
    ],
    hi: [
      '🔥 त्योहार विशेष: आउटस्टेशन राउंड ट्रिप पर ₹500 की छूट के लिए FESTIVAL500 कोड का उपयोग करें!',
      '✨ पहली बार यात्रा कर रहे हैं? अपनी पहली सवारी पर 10% छूट के लिए WELCOME10 का उपयोग करें।',
      '🙏 तीर्थ यात्रा विशेष: TEMPLE200 का उपयोग करके तिरुपति और श्रीशैलम पैकेज पर ₹200 बचाएं।',
      '📞 अनुकूलित टूर प्लान के लिए +91 63018 39837 पर कॉल करें।'
    ]
  };

  const activeOffers = offers[language] || offers['en'];

  return (
    <div className="w-full bg-navy-950 dark:bg-navy-950/80 text-white py-2 overflow-hidden border-b border-gold-500/30 text-xs font-semibold select-none z-50">
      <div className="flex whitespace-nowrap items-center animate-[marquee_25s_linear_infinite]">
        {activeOffers.concat(activeOffers).map((text, idx) => (
          <div key={idx} className="flex items-center mx-8 gap-2">
            <Tag size={12} className="text-gold-500" />
            <span>{text}</span>
            <Sparkles size={12} className="text-gold-500" />
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </div>
  );
};
