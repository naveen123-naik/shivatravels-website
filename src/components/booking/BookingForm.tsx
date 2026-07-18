'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useMockDB } from '@/context/MockDBContext';
import { BookingReceipt } from './BookingReceipt';
import { Booking } from '@/data/defaultMockData';
import { Sparkles, Calendar, Clock, MapPin, Phone, User, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const BookingForm: React.FC = () => {
  const { t } = useLanguage();
  const { vehicles, addBooking } = useMockDB();

  // Sort all vehicles, putting Ertiga (v3) at the top if it exists
  const bookingVehicles = [...vehicles].sort((a, b) => {
    if (a.id === 'v3') return -1;
    if (b.id === 'v3') return 1;
    return a.id.localeCompare(b.id);
  });

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [tripType, setTripType] = useState<Booking['tripType']>('One Way');
  const [passengers, setPassengers] = useState(1);
  const [vehicleId, setVehicleId] = useState('');

  // Submission State
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);

  // Setup default vehicle
  useEffect(() => {
    if (bookingVehicles.length > 0 && !vehicleId) {
      setVehicleId(bookingVehicles[0].id);
    }
  }, [bookingVehicles, vehicleId]);

  // Handle Event Listeners for pre-selection
  useEffect(() => {
    const handlePreselectTrip = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.tripType) {
        setTripType(customEvent.detail.tripType as Booking['tripType']);
      }
    };

    const handlePreselectVehicle = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.vehicleId) {
        // Only set if it exists in the vehicle inventory
        if (vehicles.some((v) => v.id === customEvent.detail.vehicleId)) {
          setVehicleId(customEvent.detail.vehicleId);
        }
      }
    };

    const handlePreselectPkg = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.packageName) {
        setTripType('Tour Package');
        setDestination(customEvent.detail.packageName);
      }
    };

    const handlePreselectEstimate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        const { pickupLocation, destination: dest, vehicleId: vId } = customEvent.detail;
        if (pickupLocation) setPickupLocation(pickupLocation);
        if (dest) setDestination(dest);
        if (vId && vehicles.some((v) => v.id === vId)) setVehicleId(vId);
        setTripType('One Way');
      }
    };

    window.addEventListener('preselect-trip-type', handlePreselectTrip);
    window.addEventListener('preselect-vehicle', handlePreselectVehicle);
    window.addEventListener('preselect-package', handlePreselectPkg);
    window.addEventListener('preselect-estimate', handlePreselectEstimate);

    return () => {
      window.removeEventListener('preselect-trip-type', handlePreselectTrip);
      window.removeEventListener('preselect-vehicle', handlePreselectVehicle);
      window.removeEventListener('preselect-package', handlePreselectPkg);
      window.removeEventListener('preselect-estimate', handlePreselectEstimate);
    };
  }, []);

  // Calculate Base Fare
  const getBaseFare = () => {
    const selectedVehicle = vehicles.find((v) => v.id === vehicleId);
    if (!selectedVehicle) return 1000;

    if (tripType === 'Local Rental') {
      return selectedVehicle.pricePerKm * 80 + selectedVehicle.driverAllowance; // standard 8hr / 80km rental package
    } else if (tripType === 'Airport Pickup' || tripType === 'Airport Drop') {
      return 1500; // Flat airport transfer fee
    } else if (tripType === 'Tour Package') {
      return 8000; // package standard
    }
    
    // Default One Way / Round Trip
    return selectedVehicle.pricePerKm * 180 + selectedVehicle.driverAllowance;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedVehicle = vehicles.find((v) => v.id === vehicleId);
    if (!selectedVehicle) return;

    const booking = addBooking({
      fullName,
      mobileNumber,
      pickupLocation,
      destination,
      pickupDate,
      pickupTime,
      returnDate: returnDate || undefined,
      tripType,
      passengers,
      vehicleId,
      vehicleName: selectedVehicle.name,
      estimatedFare: 0,
      discountApplied: 0,
      totalFare: 0,
    });

    // Fire Confetti Celebration
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });

    setActiveBooking(booking);

    // Reset Form
    setFullName('');
    setMobileNumber('');
    setPickupLocation('');
    setDestination('');
    setPickupDate('');
    setPickupTime('');
    setReturnDate('');
    setPassengers(1);
  };

  const baseFare = getBaseFare();
  const totalFare = baseFare;

  return (
    <section id="booking-section" className="py-20 bg-white dark:bg-navy-950 relative overflow-hidden">
      {/* Background visual shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-navy-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-gold-500 flex items-center justify-center gap-1.5">
            <Sparkles size={14} className="animate-spin" />
            Quick Reservations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 mb-4 leading-tight">
            {t.booking.title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            {t.booking.subtitle}
          </p>
        </div>

        {/* Booking Card Form Container */}
        <div className="bg-slate-50 dark:bg-navy-950/40 border border-slate-205/60 dark:border-slate-800/40 rounded-3xl p-6 sm:p-10 shadow-lg relative">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Personal info */}
            <div className="border-b border-slate-200 dark:border-slate-800/60 pb-6">
              <h3 className="text-sm uppercase font-extrabold tracking-wider text-navy-500 dark:text-gold-400 mb-4">
                1. Customer Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder={t.booking.fullName}
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-400" />
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder={t.booking.mobile}
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Trip preferences */}
            <div className="pb-6">
              <h3 className="text-sm uppercase font-extrabold tracking-wider text-navy-500 dark:text-gold-400 mb-4">
                2. Travel Requirements
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-[10px] uppercase font-extrabold tracking-wider text-slate-400 mb-1.5">
                    {t.booking.tripType}
                  </label>
                  <select
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors"
                  >
                    <option value="One Way">One Way</option>
                    <option value="Round Trip">Round Trip</option>
                    <option value="Local Rental">Local Rental</option>
                    <option value="Airport Pickup">Airport Pickup</option>
                    <option value="Airport Drop">Airport Drop</option>
                    <option value="Tour Package">Tour Package</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-extrabold tracking-wider text-slate-400 mb-1.5">
                    {t.booking.passengers}
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={50}
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="e.g. 4"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-extrabold tracking-wider text-slate-400 mb-1.5">
                    {t.booking.selectVehicle}
                  </label>
                  <select
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors"
                  >
                    {bookingVehicles.map((v) => (
                      <option key={v.id} value={v.id} disabled={!v.available}>
                        {v.name} {!v.available ? '(Booked)' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <label className="block text-[10px] uppercase font-extrabold tracking-wider text-slate-400 mb-1.5">
                    {t.booking.pickupLoc}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors"
                      placeholder="e.g. Kukatpally, Hyderabad"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-[10px] uppercase font-extrabold tracking-wider text-slate-400 mb-1.5">
                    {t.booking.destLoc}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors"
                      placeholder="e.g. Tirupati Temple"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-extrabold tracking-wider text-slate-400 mb-1.5">
                    {t.booking.pickupDate}
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-400" />
                    <input
                      type="date"
                      required
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-extrabold tracking-wider text-slate-400 mb-1.5">
                    {t.booking.pickupTime}
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-400" />
                    <input
                      type="time"
                      required
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-extrabold tracking-wider text-slate-400 mb-1.5">
                    {t.booking.returnDate} <span className="text-[9px] text-slate-400 lowercase italic">({t.booking.optional})</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-400" />
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Section */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-gold-550 dark:text-gold-400">
                  No Payment Required Now
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-450 block font-semibold mt-1">
                  Submit request to check vehicle availability. We will call you with a custom price quote.
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 bg-gold-500 hover:bg-gold-600 text-navy-850 font-extrabold rounded-xl shadow-lg hover:shadow-gold-500/25 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle size={16} />
                {t.booking.submit}
              </button>
            </div>

          </form>

        </div>
      </div>

      {/* Confirmation Printable Overlay */}
      {activeBooking && (
        <BookingReceipt
          booking={activeBooking}
          onClose={() => setActiveBooking(null)}
        />
      )}
    </section>
  );
};
