'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useMockDB } from '@/context/MockDBContext';
import { Calculator, Milestone, Receipt, ShieldCheck, HelpCircle } from 'lucide-react';

interface RouteDetails {
  distance: number;
  toll: number;
}

const KNOWN_ROUTES: Record<string, RouteDetails> = {
  'hyderabad-tirupati': { distance: 570, toll: 950 },
  'hyderabad-srisailam': { distance: 230, toll: 300 },
  'hyderabad-vijayawada': { distance: 275, toll: 450 },
  'hyderabad-visakhapatnam': { distance: 620, toll: 1100 },
  'hyderabad-araku': { distance: 730, toll: 1250 },
  'hyderabad-goa': { distance: 650, toll: 1400 },
  'hyderabad-ooty': { distance: 850, toll: 1600 },
  'hyderabad-bangalore': { distance: 575, toll: 900 },
  'hyderabad-chennai': { distance: 630, toll: 1050 },
};

export const FareEstimator: React.FC = () => {
  const { t } = useLanguage();
  const { vehicles } = useMockDB();

  const [pickup, setPickup] = useState('Hyderabad');
  const [destination, setDestination] = useState('Tirupati');
  const [vehicleId, setVehicleId] = useState('');
  const [estimate, setEstimate] = useState<{
    distance: number;
    baseFare: number;
    toll: number;
    allowance: number;
    total: number;
    days: number;
  } | null>(null);

  // Set default vehicle
  useEffect(() => {
    if (vehicles.length > 0 && !vehicleId) {
      setVehicleId(vehicles[1]?.id || vehicles[0]?.id || '');
    }
  }, [vehicles, vehicleId]);

  // Handle preselect events from other sections
  useEffect(() => {
    const handlePreselectDest = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.destination) {
        setDestination(customEvent.detail.destination);
      }
    };
    window.addEventListener('preselect-destination', handlePreselectDest);
    return () => window.removeEventListener('preselect-destination', handlePreselectDest);
  }, []);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup || !destination || !vehicleId) return;

    const selectedVehicle = vehicles.find((v) => v.id === vehicleId);
    if (!selectedVehicle) return;

    // Calculate distance and toll
    const routeKey = `${pickup.toLowerCase().trim()}-${destination.toLowerCase().trim()}`;
    const reverseRouteKey = `${destination.toLowerCase().trim()}-${pickup.toLowerCase().trim()}`;
    
    let distance = 0;
    let toll = 0;

    if (KNOWN_ROUTES[routeKey]) {
      distance = KNOWN_ROUTES[routeKey].distance;
      toll = KNOWN_ROUTES[routeKey].toll;
    } else if (KNOWN_ROUTES[reverseRouteKey]) {
      distance = KNOWN_ROUTES[reverseRouteKey].distance;
      toll = KNOWN_ROUTES[reverseRouteKey].toll;
    } else {
      // Generate a deterministic distance based on name hashes
      const combinedString = routeKey;
      let hash = 0;
      for (let i = 0; i < combinedString.length; i++) {
        hash = combinedString.charCodeAt(i) + ((hash << 5) - hash);
      }
      // Distance between 120km and 950km
      distance = Math.abs((hash % 830) + 120);
      toll = Math.floor(distance * 1.6);
    }

    // Determine estimated days based on distance
    let days = 1;
    if (distance > 600) {
      days = 3;
    } else if (distance > 250) {
      days = 2;
    }

    const baseFare = selectedVehicle.pricePerKm * distance;
    const allowance = selectedVehicle.driverAllowance * days;
    const total = baseFare + toll + allowance;

    setEstimate({
      distance,
      baseFare,
      toll,
      allowance,
      total,
      days,
    });
  };



  return (
    <section id="estimator" className="py-20 bg-slate-50 dark:bg-navy-950/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-gold-500">
            Fare Calculator
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4 leading-tight">
            {t.estimator.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            {t.estimator.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Inputs Panel */}
          <div className="lg:col-span-6 bg-white dark:bg-navy-950/60 border border-slate-200/80 dark:border-slate-800/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <form onSubmit={handleCalculate} className="space-y-6">
              <div className="flex items-center gap-2 text-navy-500 dark:text-gold-400 font-extrabold text-lg mb-2">
                <Calculator size={20} />
                <span>Calculate Your Tariff</span>
              </div>

              <div>
                <label className="block text-xs uppercase font-extrabold tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                  {t.estimator.pickup}
                </label>
                <input
                  type="text"
                  required
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-900 text-sm font-semibold text-slate-800 dark:text-white focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="e.g. Hyderabad"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-extrabold tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                  {t.estimator.dest}
                </label>
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-900 text-sm font-semibold text-slate-800 dark:text-white focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="e.g. Tirupati"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-extrabold tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                  {t.estimator.vehicle}
                </label>
                <select
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-900 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} (₹{v.pricePerKm}/km)
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-navy-500 dark:bg-gold-500 hover:bg-navy-600 dark:hover:bg-gold-600 text-white dark:text-navy-850 font-bold rounded-xl shadow-md transition-all duration-200 cursor-pointer"
              >
                {t.estimator.calculate}
              </button>
            </form>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-6 flex flex-col">
            <AnimatePresence mode="wait">
              {estimate ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-navy-950 text-white border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden"
                >
                  {/* Decorative background shape */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/10 rounded-full blur-[60px] pointer-events-none" />

                  <div>
                    <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
                      <Receipt size={20} className="text-gold-500" />
                      <h3 className="text-lg font-bold uppercase tracking-wider text-gold-500">
                        Fare Estimate Breakdown
                      </h3>
                    </div>

                    {/* Specifications */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm font-semibold">
                        <span className="text-slate-400">{t.estimator.distance}</span>
                        <span className="text-white flex items-center gap-1.5">
                          <Milestone size={14} className="text-gold-500" />
                          {estimate.distance} km
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-sm font-semibold">
                        <span className="text-slate-400">Duration Allowance</span>
                        <span className="text-white">{estimate.days} Day(s) Trip</span>
                      </div>

                      <div className="flex justify-between items-center text-sm font-semibold">
                        <span className="text-slate-400">{t.estimator.estFare}</span>
                        <span className="text-white">₹{estimate.baseFare.toLocaleString('en-IN')}</span>
                      </div>

                      <div className="flex justify-between items-center text-sm font-semibold">
                        <span className="text-slate-400">{t.estimator.estToll}</span>
                        <span className="text-white">₹{estimate.toll.toLocaleString('en-IN')}</span>
                      </div>

                      <div className="flex justify-between items-center text-sm font-semibold">
                        <span className="text-slate-400">{t.estimator.driverAll}</span>
                        <span className="text-white">₹{estimate.allowance.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Total */}
                  <div className="pt-6 border-t border-white/10 mt-8">
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          {t.estimator.total}
                        </span>
                        <span className="text-3xl font-extrabold text-gold-500">
                          ₹{estimate.total.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-[10px] text-green-400 font-bold bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-md flex items-center gap-1">
                        <ShieldCheck size={12} />
                        Best Price Guaranteed
                      </span>
                    </div>

                    <p className="text-[10px] text-slate-450 leading-relaxed mb-6 font-medium">
                      {t.estimator.note}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href="tel:+918074324003"
                        className="flex-1 py-4 bg-gold-500 hover:bg-gold-600 text-navy-850 font-extrabold rounded-xl shadow-lg hover:shadow-gold-500/20 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 text-sm text-center"
                      >
                        Call to Book
                      </a>
                      <a
                        href={`https://wa.me/918074324003?text=${encodeURIComponent(
                          `Hi Shiva Travels, I would like to book a trip.\n` +
                          `- Pickup: ${pickup}\n` +
                          `- Destination: ${destination}\n` +
                          `- Vehicle: ${vehicles.find((v) => v.id === vehicleId)?.name || ''}\n` +
                          `- Estimated Distance: ${estimate.distance} km\n` +
                          `- Estimated Fare: ₹${estimate.total}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-lg hover:shadow-emerald-600/20 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 text-sm text-center"
                      >
                        WhatsApp to Book
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-slate-200/40 dark:bg-navy-950/40 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[350px]">
                  <Calculator size={48} className="text-slate-350 dark:text-slate-700 mb-4 animate-pulse" />
                  <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Calculate to See Estimate
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs font-medium leading-relaxed">
                    Provide your pickup location, desired destination, and vehicle class to get a transparent and itemized travel budget.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
