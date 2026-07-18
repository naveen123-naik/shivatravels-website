'use client';

import React from 'react';
import { Tag, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const OffersBanner: React.FC = () => {
  const { language } = useLanguage();
  
  const offers = {
    en: [
      '🔥 SPECIAL RATES: Best prices on outstation round trips!',
      '✨ FIRST TIME USER? Contact our desk for exclusive discounts on your first ride.',
      '🙏 PILGRIMAGE PACKAGE: Direct tours to Tirupati, Shirdi and Srisailam available.',
      '📞 Call +91 80743 24003 for customized itinerary planning.'
    ],
    te: [
      '🔥 ప్రత్యేక రేట్లు: అవుట్‌స్టేషన్ రౌండ్ ట్రిప్స్‌పై ఉత్తమ ధరలు!',
      '✨ మొదటిసారి ప్రయాణిస్తున్నారా? మీ మొదటి రైడ్‌పై ప్రత్యేక తగ్గింపుల కోసం సంప్రదించండి.',
      '🙏 పుణ్యక్షేత్ర పర్యటనలు: తిరుపతి, శీర్డి మరియు శ్రీశైలం క్షేత్రాలకు ప్రత్యేక వాహనాలు లభించును.',
      '📞 కస్టమ్ టూర్ ప్లాన్ల కొరకు +91 80743 24003 కి కాల్ చేయండి.'
    ],
    hi: [
      '🔥 विशेष दरें: आउटस्टेशन राउंड ट्रिप पर सर्वोत्तम कीमतों की गारंटी!',
      '✨ पहली बार यात्रा कर रहे हैं? अपनी पहली सवारी पर विशेष छूट के लिए हमसे संपर्क करें।',
      '🙏 तीर्थ यात्रा विशेष: तिरुपति, शिर्डी और श्रीशैलम के लिए विशेष वाहन उपलब्ध हैं।',
      '📞 अनुकूलित टूर प्लान के लिए +91 80743 24003 पर कॉल करें।'
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
