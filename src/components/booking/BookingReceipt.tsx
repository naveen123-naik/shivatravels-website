'use client';

import React, { useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Booking } from '@/data/defaultMockData';
import { Printer, X, ShieldCheck, Mail, Phone, CalendarCheck, Download } from 'lucide-react';

interface BookingReceiptProps {
  booking: Booking;
  onClose: () => void;
}

export const BookingReceipt: React.FC<BookingReceiptProps> = ({ booking, onClose }) => {
  const { t } = useLanguage();
  const [isDownloading, setIsDownloading] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const html2canvas = (await import('html2canvas-pro')).default;
      const { jsPDF } = await import('jspdf');

      const element = receiptRef.current;
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        ignoreElements: (node) => node.classList.contains('no-print')
      });

      const imgData = canvas.toDataURL('image/png');
      
      const pdfWidth = 210;
      const pdfHeight = 297;
      const margin = 10;
      const maxCanvasWidth = pdfWidth - 2 * margin;
      const maxCanvasHeight = pdfHeight - 2 * margin;

      const imgWidth = maxCanvasWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let finalWidth = imgWidth;
      let finalHeight = imgHeight;
      let x = margin;
      let y = margin;

      if (imgHeight > maxCanvasHeight) {
        finalHeight = maxCanvasHeight;
        finalWidth = (canvas.width * maxCanvasHeight) / canvas.height;
        x = margin + (maxCanvasWidth - finalWidth) / 2;
      } else {
        y = margin + (maxCanvasHeight - imgHeight) / 2;
      }

      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
      pdf.save(`receipt-${booking.id}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div id="print-receipt-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Background shade */}
      <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm no-print" onClick={onClose} />

      {/* Main card panel */}
      <div ref={receiptRef} className="bg-white text-slate-800 border border-slate-200 shadow-2xl rounded-3xl p-6 sm:p-8 w-full max-w-2xl relative z-10 overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors no-print cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Receipt Header */}
        <div className="border-b-2 border-dashed border-slate-200 pb-6 mb-6 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center mr-2 shadow-md">
              <span className="font-extrabold text-navy-850 text-xl">S</span>
            </div>
            <div>
              <h2 className="font-extrabold text-xl tracking-tight text-navy-800">
                SHIVA NAIK TRAVELS
              </h2>
              <span className="block text-[8px] uppercase tracking-[0.25em] text-gold-600 font-extrabold leading-none mt-0.5">
                Premium Travel Agency
              </span>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <span className="bg-navy-500/10 border border-navy-500/20 text-navy-600 px-3.5 py-1.5 rounded-full text-xs font-bold block mb-1">
              Reference: {booking.id}
            </span>
            <span className="text-[10px] text-slate-450 font-bold block">
              Issued: {new Date(booking.bookingDate).toLocaleDateString('en-IN')}
            </span>
          </div>
        </div>

        {/* Receipt Body */}
        <div className="space-y-6">
          {/* Passenger Information */}
          <div>
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-3 border-b border-slate-100 pb-1">
              Customer Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
              <div>
                <span className="block text-slate-450 font-medium">Passenger Name</span>
                <span className="text-slate-800">{booking.fullName}</span>
              </div>
              <div>
                <span className="block text-slate-450 font-medium">Contact Number</span>
                <span className="text-slate-800">{booking.mobileNumber}</span>
              </div>
            </div>
          </div>

          {/* Travel details */}
          <div>
            <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-3 border-b border-slate-100 pb-1">
              Trip Details
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-bold">
              <div>
                <span className="block text-slate-450 font-medium">{t.booking.tripType}</span>
                <span className="text-slate-800">{booking.tripType}</span>
              </div>
              <div>
                <span className="block text-slate-450 font-medium">Vehicle Selected</span>
                <span className="text-slate-800">{booking.vehicleName}</span>
              </div>
              <div>
                <span className="block text-slate-450 font-medium">{t.booking.passengers}</span>
                <span className="text-slate-800">{booking.passengers} Passenger(s)</span>
              </div>
              <div>
                <span className="block text-slate-450 font-medium">{t.booking.pickupDate}</span>
                <span className="text-slate-800">{booking.pickupDate}</span>
              </div>
              <div>
                <span className="block text-slate-450 font-medium">{t.booking.pickupTime}</span>
                <span className="text-slate-800">{booking.pickupTime}</span>
              </div>
              {booking.returnDate && (
                <div>
                  <span className="block text-slate-450 font-medium">{t.booking.returnDate}</span>
                  <span className="text-slate-800">{booking.returnDate}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold mt-4 border-t border-slate-105/60 pt-3">
              <div>
                <span className="block text-slate-450 font-medium">{t.booking.pickupLoc}</span>
                <span className="text-slate-850 font-semibold">{booking.pickupLocation}</span>
              </div>
              <div>
                <span className="block text-slate-450 font-medium">{t.booking.destLoc}</span>
                <span className="text-slate-850 font-semibold">{booking.destination}</span>
              </div>
            </div>

            {booking.specialInstructions && (
              <div className="mt-4 text-xs font-bold bg-slate-50 border border-slate-100 rounded-xl p-3">
                <span className="block text-slate-400 font-medium mb-1">Remarks / Instructions</span>
                <p className="text-slate-600 font-medium leading-relaxed">{booking.specialInstructions}</p>
              </div>
            )}
          </div>

          {/* Pricing statement */}
          <div className="border-t border-slate-200 pt-6">
            {booking.totalFare > 0 ? (
              <>
                <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-3">
                  Fare Calculation
                </h3>
                
                <div className="space-y-2 text-xs font-bold text-slate-650 mb-4">
                  <div className="flex justify-between">
                    <span>Base Route Estimate</span>
                    <span className="text-slate-850">₹{booking.estimatedFare.toLocaleString('en-IN')}</span>
                  </div>
                  {booking.discountApplied > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount Applied ({booking.couponCode})</span>
                      <span>-₹{booking.discountApplied.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center bg-navy-50 border border-navy-100 rounded-2xl p-4 mt-2">
                  <div>
                    <span className="block text-[9px] uppercase font-extrabold tracking-wider text-navy-600">
                      Total Fare (inclusive of tax)
                    </span>
                    <span className="text-2xl font-black text-navy-850">
                      ₹{booking.totalFare.toLocaleString('en-IN')}
                    </span>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[10px] text-orange-600 font-bold bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full flex items-center gap-1">
                      <CalendarCheck size={12} className="animate-pulse" />
                      Status: {booking.status}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center bg-navy-50 border border-navy-100 rounded-2xl p-4 mt-2">
                  <div>
                    <span className="block text-[9px] uppercase font-extrabold tracking-wider text-navy-600">
                      Total Fare
                    </span>
                    <span className="text-xl font-black text-navy-850">
                      Quote Pending
                    </span>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[10px] text-orange-650 font-bold bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full flex items-center gap-1">
                      <CalendarCheck size={12} className="animate-pulse" />
                      Status: {booking.status}
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 mt-3 italic font-semibold leading-relaxed">
                  * Our support team will contact you shortly to provide the final custom price quote for your trip request.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Footer info & Buttons */}
        <div className="border-t border-slate-100 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
          <div className="text-[10px] text-slate-400 font-semibold text-center sm:text-left">
            <p>For support, contact us: <b>+91 98480 22338</b></p>
            <p>Email: bookings@shivanaiktravels.com</p>
          </div>
          
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 border border-slate-205 text-slate-600 hover:bg-slate-50 font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              {t.booking.close}
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-gold-500 hover:bg-gold-600 disabled:opacity-50 text-navy-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              {isDownloading ? (
                <div className="w-3.5 h-3.5 border-2 border-navy-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download size={14} />
              )}
              {t.booking.download}
            </button>
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-navy-500 hover:bg-navy-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Printer size={14} />
              {t.booking.print}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
