'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useMockDB } from '@/context/MockDBContext';
import { BookingReceipt } from './BookingReceipt';
import { Booking } from '@/data/defaultMockData';
import { Search, MapPin, Calendar, Clock, CreditCard, ChevronRight, FileDown } from 'lucide-react';

export const BookingTracker: React.FC = () => {
  const { t } = useLanguage();
  const { bookings } = useMockDB();
  const [bookingId, setBookingId] = useState('');
  const [searchedBooking, setSearchedBooking] = useState<Booking | null>(null);
  const [error, setError] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSearchedBooking(null);

    if (!bookingId) {
      setError('Please enter a booking ID.');
      return;
    }

    const code = bookingId.toUpperCase().trim();
    const found = bookings.find((b) => b.id === code);

    if (!found) {
      setError('No booking found with this ID. Please check the spelling (e.g. SNT-78291).');
      return;
    }

    setSearchedBooking(found);
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'Pending': return 'bg-amber-500/10 border-amber-500/25 text-amber-600 dark:text-amber-400';
      case 'Approved': return 'bg-blue-500/10 border-blue-500/25 text-blue-600 dark:text-blue-400';
      case 'Completed': return 'bg-green-500/10 border-green-500/25 text-green-600 dark:text-green-400';
      case 'Rejected': return 'bg-red-500/10 border-red-500/25 text-red-600 dark:text-red-400';
      default: return 'bg-slate-500/10 border-slate-500/25 text-slate-600';
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-navy-950/40 border border-slate-205/60 dark:border-slate-800/40 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-md">
      <div className="flex items-center gap-2 font-extrabold text-navy-500 dark:text-gold-400 text-lg mb-4">
        <Search size={20} />
        <h3>{t.booking.trackTitle}</h3>
      </div>

      <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          required
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          placeholder={t.booking.trackPlaceholder}
          className="flex-grow px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-white focus:outline-none focus:border-gold-500 transition-colors"
        />
        <button
          type="submit"
          className="py-3 px-6 bg-navy-500 hover:bg-navy-600 dark:bg-gold-500 dark:hover:bg-gold-600 text-white dark:text-navy-850 font-bold rounded-xl shadow-sm hover:shadow-md transition-all text-xs cursor-pointer flex items-center justify-center gap-1.5"
        >
          {t.booking.trackButton}
          <ChevronRight size={14} />
        </button>
      </form>

      {error && (
        <p className="text-xs text-red-500 font-semibold mb-4 bg-red-500/5 border border-red-500/10 p-3 rounded-xl">
          {error}
        </p>
      )}

      {searchedBooking && (
        <div className="bg-white dark:bg-navy-950/60 border border-slate-100 dark:border-slate-850/50 rounded-2xl p-5 shadow-sm space-y-4 animate-[fadeIn_0.3s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3.5">
            <div>
              <span className="block text-[9px] uppercase font-extrabold text-slate-400 tracking-wider">
                Passenger Name
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {searchedBooking.fullName}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(searchedBooking.status)}`}>
                {searchedBooking.status}
              </span>
              <button
                onClick={() => setShowReceipt(true)}
                className="p-2 bg-slate-100 hover:bg-gold-500 dark:bg-navy-900 dark:hover:bg-gold-500 text-slate-600 hover:text-navy-850 dark:text-slate-400 dark:hover:text-navy-850 rounded-xl transition-all flex items-center gap-1 text-[10px] font-bold cursor-pointer"
                title="View Printable Receipt"
              >
                <FileDown size={14} />
                <span>Receipt</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold">
            <div>
              <span className="block text-slate-400 font-medium">{t.booking.tripType}</span>
              <span className="text-slate-800 dark:text-slate-200">{searchedBooking.tripType}</span>
            </div>
            <div>
              <span className="block text-slate-400 font-medium">Vehicle Class</span>
              <span className="text-slate-800 dark:text-slate-200">{searchedBooking.vehicleName}</span>
            </div>
            <div>
              <span className="block text-slate-400 font-medium">Pickup Date</span>
              <span className="text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <Calendar size={12} className="text-gold-500" />
                {searchedBooking.pickupDate}
              </span>
            </div>
            <div>
              <span className="block text-slate-400 font-medium">Pickup Time</span>
              <span className="text-slate-800 dark:text-slate-200 flex items-center gap-1">
                <Clock size={12} className="text-gold-500" />
                {searchedBooking.pickupTime}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold pt-3.5 border-t border-slate-100 dark:border-slate-800/80">
            <div>
              <span className="block text-slate-400 font-medium">{t.booking.pickupLoc}</span>
              <span className="text-slate-800 dark:text-slate-200 flex items-start gap-1">
                <MapPin size={12} className="text-gold-500 shrink-0 mt-0.5" />
                <span>{searchedBooking.pickupLocation}</span>
              </span>
            </div>
            <div>
              <span className="block text-slate-400 font-medium">{t.booking.destLoc}</span>
              <span className="text-slate-800 dark:text-slate-200 flex items-start gap-1">
                <MapPin size={12} className="text-gold-500 shrink-0 mt-0.5" />
                <span>{searchedBooking.destination}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {showReceipt && searchedBooking && (
        <BookingReceipt
          booking={searchedBooking}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </div>
  );
};
