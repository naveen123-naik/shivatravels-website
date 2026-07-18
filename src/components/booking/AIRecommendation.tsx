'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useMockDB } from '@/context/MockDBContext';
import { Sparkles, BadgeIndianRupee, Calendar, Users, MapPin, Compass, ShieldAlert, CheckCircle } from 'lucide-react';

interface ItineraryStep {
  day: number;
  title: string;
  activity: string;
}

export const AIRecommendation: React.FC = () => {
  const { t } = useLanguage();
  const { destinations, vehicles } = useMockDB();

  // Inputs
  const [selectedDest, setSelectedDest] = useState('Tirupati');
  const [budget, setBudget] = useState(15000);
  const [days, setDays] = useState(2);
  const [passengers, setPassengers] = useState(4);

  // Recommendations
  const [result, setResult] = useState<{
    vehicleName: string;
    vehicleId: string;
    totalFare: number;
    itinerary: ItineraryStep[];
    isAffordable: boolean;
  } | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Find suitable vehicle based on passenger count
    const suitableVehicles = vehicles
      .filter((v) => v.seatingCapacity >= passengers && v.available)
      .sort((a, b) => a.pricePerKm - b.pricePerKm); // cheapest first

    if (suitableVehicles.length === 0) {
      setResult(null);
      return;
    }

    // 2. Select vehicle based on budget (try to find cheapest or slightly better if budget allows)
    let selectedVehicle = suitableVehicles[0];
    const destinationItem = destinations.find((d) => d.name === selectedDest);
    const distance = destinationItem ? destinationItem.distance : 400; // default distance

    // Calculate approximate fare: (price * distance) + driverAllowance * days + toll
    const calculateCost = (vehicle: typeof selectedVehicle) => {
      const base = vehicle.pricePerKm * distance;
      const allowance = vehicle.driverAllowance * days;
      const toll = distance * 1.5;
      return base + allowance + toll;
    };

    let estimatedCost = calculateCost(selectedVehicle);

    // If budget allows, see if we can recommend a luxury option
    for (const vehicle of suitableVehicles) {
      const cost = calculateCost(vehicle);
      if (cost <= budget) {
        selectedVehicle = vehicle;
        estimatedCost = cost;
      }
    }

    // 3. Generate dynamic itineraries based on destination and days
    const itineraryList: ItineraryStep[] = [];
    const activitiesList = [
      `Morning pickup and travel to ${selectedDest}. Check in at your accommodation and rest.`,
      `Local sightseeing: Visit the most famous landmarks, local markets, and sample regional cuisine.`,
      `Special excursion around scenic viewing points, waterfalls, or main temple darshan.`,
      `Morning leisure walk, souvenir shopping, check-out, and comfortable travel back to Hyderabad.`
    ];

    for (let d = 1; d <= days; d++) {
      let activity = '';
      if (d === 1) {
        activity = activitiesList[0];
      } else if (d === days) {
        activity = activitiesList[3];
      } else {
        activity = d % 2 === 0 ? activitiesList[1] : activitiesList[2];
      }

      itineraryList.push({
        day: d,
        title: `Day ${d}: ${d === 1 ? 'Departure & Arrival' : d === days ? 'Return Journey' : 'Local Sightseeing'}`,
        activity,
      });
    }

    setResult({
      vehicleName: selectedVehicle.name,
      vehicleId: selectedVehicle.id,
      totalFare: Math.round(estimatedCost),
      itinerary: itineraryList,
      isAffordable: estimatedCost <= budget,
    });
  };

  const handleBookItinerary = () => {
    if (!result) return;
    
    // Dispatch custom event to fill out booking form
    const event = new CustomEvent('preselect-estimate', {
      detail: {
        pickupLocation: 'Hyderabad',
        destination: selectedDest,
        vehicleId: result.vehicleId,
        vehicleName: result.vehicleName,
        estimatedFare: result.totalFare,
        specialInstructions: `AI Travel Plan Booked. Budget Limit: ₹${budget}, Days: ${days}, Passengers: ${passengers}.`
      }
    });
    window.dispatchEvent(event);

    const element = document.getElementById('booking-section');
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
    <div className="bg-white dark:bg-navy-950/60 border border-slate-200/80 dark:border-slate-800/40 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-md">
      
      {/* Title */}
      <div className="flex items-center gap-2 font-extrabold text-navy-500 dark:text-gold-400 text-lg mb-6">
        <Sparkles size={20} className="animate-pulse" />
        <h3>{t.aiRec.title}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        
        {/* Form Column */}
        <form onSubmit={handleGenerate} className="md:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase font-extrabold tracking-wider text-slate-400 mb-1.5">
                Choose Destination
              </label>
              <select
                value={selectedDest}
                onChange={(e) => setSelectedDest(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors"
              >
                {destinations.filter(d => d.name !== 'Hyderabad').map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
                  {t.aiRec.budget}
                </label>
                <span className="text-xs font-bold text-gold-500">₹{budget.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={3000}
                max={50000}
                step={1000}
                value={budget}
                onChange={(e) => setBudget(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-extrabold tracking-wider text-slate-400 mb-1.5">
                  {t.aiRec.days}
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  required
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-extrabold tracking-wider text-slate-400 mb-1.5">
                  {t.aiRec.passengers}
                </label>
                <input
                  type="number"
                  min={1}
                  max={25}
                  required
                  value={passengers}
                  onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-navy-500 dark:bg-gold-500 hover:bg-navy-600 dark:hover:bg-gold-600 text-white dark:text-navy-850 font-bold rounded-xl shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 text-xs"
          >
            <Compass size={14} />
            {t.aiRec.getRec}
          </button>
        </form>

        {/* Output Column */}
        <div className="md:col-span-7 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key="ai-result"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="bg-navy-950 text-white border border-white/5 p-6 rounded-3xl flex flex-col justify-between h-full relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-[40px] pointer-events-none" />

                <div>
                  <h4 className="text-gold-500 font-extrabold text-xs uppercase tracking-wider mb-4 pb-2 border-b border-white/10 flex items-center gap-1">
                    <Sparkles size={12} />
                    {t.aiRec.resultTitle}
                  </h4>

                  {/* Pricing alert */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="block text-[8px] uppercase text-slate-400 font-bold">
                        {t.aiRec.costEst}
                      </span>
                      <span className="text-xl font-extrabold text-gold-500">
                        ₹{result.totalFare.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {result.isAffordable ? (
                      <span className="text-[9px] text-green-400 font-bold bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-md flex items-center gap-1">
                        <CheckCircle size={10} /> Under Budget
                      </span>
                    ) : (
                      <span className="text-[9px] text-yellow-400 font-bold bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-1 rounded-md flex items-center gap-1">
                        <ShieldAlert size={10} /> Over Budget
                      </span>
                    )}
                  </div>

                  <div className="mb-4 text-xs font-bold bg-white/5 border border-white/10 rounded-xl p-3">
                    <span className="block text-[8px] text-slate-400 uppercase tracking-wider mb-1">
                      {t.aiRec.suggestedVehicle}
                    </span>
                    <span className="text-slate-100">{result.vehicleName}</span>
                  </div>

                  {/* Day by Day travel plan */}
                  <div className="space-y-3">
                    <span className="block text-[8px] text-slate-400 uppercase tracking-wider font-extrabold mb-1">
                      {t.aiRec.itinerary}
                    </span>
                    <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                      {result.itinerary.map((step) => (
                        <div key={step.day} className="text-xs">
                          <span className="font-extrabold text-gold-500 block mb-0.5">{step.title}</span>
                          <span className="text-slate-350 leading-relaxed block text-[10px] font-medium pl-2.5 border-l border-gold-500/30">
                            {step.activity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBookItinerary}
                  className="w-full mt-6 py-3 bg-gold-500 hover:bg-gold-600 text-navy-850 font-extrabold rounded-xl shadow-lg hover:shadow-gold-500/15 transition-all text-xs cursor-pointer"
                >
                  Book this Travel Plan
                </button>
              </motion.div>
            ) : (
              <div className="bg-slate-200/40 dark:bg-navy-950/40 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                <Compass size={40} className="text-slate-350 dark:text-slate-700 mb-3 animate-bounce" />
                <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Ready to Consult AI Travel Expert?
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs font-medium leading-relaxed">
                  Enter your vacation spot, choose budget limit, duration, and group capacity. The Shiva Naik Travels AI Companion will instantly generate a tailored itinerary and recommend the best vehicle matching your budget.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
