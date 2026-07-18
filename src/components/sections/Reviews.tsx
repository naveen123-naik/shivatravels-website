'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useMockDB } from '@/context/MockDBContext';
import { Star, MessageSquareCode, Award, ArrowLeft, ArrowRight, PenTool } from 'lucide-react';

export const Reviews: React.FC = () => {
  const { t } = useLanguage();
  const { reviews, addReview } = useMockDB();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [tripDetails, setTripDetails] = useState('');

  // Calculate average rating
  const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : '5.0';

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !reviewText || !tripDetails) return;

    addReview({
      name,
      photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80', // Default placeholder avatar
      rating,
      review: reviewText,
      tripDetails,
    });

    // Reset and close
    setName('');
    setRating(5);
    setReviewText('');
    setTripDetails('');
    setIsWriteModalOpen(false);
    setActiveIndex(0); // show the latest review
  };

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-navy-950 relative overflow-hidden">
      {/* Background visual helpers */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading & Aggregated Score */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 border-b border-slate-100 dark:border-slate-800/60 pb-8">
          <div className="text-center md:text-left">
            <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-gold-500">
              Customer Feedbacks
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2 mb-2 leading-tight">
              {t.reviews.title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              {t.reviews.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-6 bg-slate-50 dark:bg-navy-950/60 border border-slate-200/80 dark:border-slate-800/40 p-4 sm:p-5 rounded-2xl">
            <div className="text-center">
              <span className="text-3xl sm:text-4xl font-black text-navy-500 dark:text-gold-400 leading-none">
                {averageRating}
              </span>
              <span className="text-xs text-slate-400 font-bold block mt-1">out of 5.0</span>
            </div>
            
            <div className="border-l border-slate-200 dark:border-slate-800 h-10" />

            <div>
              <div className="flex text-gold-500 mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} fill="currentColor" />
                ))}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-450 font-semibold block">
                {reviews.length} {t.reviews.totalReviews}
              </span>
            </div>
            
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="bg-gold-500 hover:bg-gold-600 text-navy-850 p-2.5 rounded-xl shadow-md transition-all duration-200 flex items-center gap-1.5 text-xs font-bold shrink-0 cursor-pointer"
            >
              <PenTool size={14} />
              <span className="hidden sm:inline">Write Review</span>
            </button>
          </div>
        </div>

        {/* Testimonials Slider */}
        {reviews.length > 0 ? (
          <div className="max-w-4xl mx-auto relative px-4 sm:px-12">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden sm:block">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-navy-500 text-white dark:bg-gold-500 dark:text-navy-850 flex items-center justify-center hover:bg-navy-600 dark:hover:bg-gold-600 transition-all duration-200 shadow-lg cursor-pointer"
              >
                <ArrowLeft size={18} />
              </button>
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden sm:block">
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-navy-500 text-white dark:bg-gold-500 dark:text-navy-850 flex items-center justify-center hover:bg-navy-600 dark:hover:bg-gold-600 transition-all duration-200 shadow-lg cursor-pointer"
              >
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="min-h-[220px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-100/70 dark:bg-navy-900/80 border border-slate-200/60 dark:border-slate-800/40 rounded-3xl p-6 sm:p-10 shadow-sm text-center relative flex flex-col items-center justify-center"
                >
                  <MessageSquareCode size={40} className="text-gold-500/20 absolute top-6 left-6" />
                  
                  {/* Rating Stars */}
                  <div className="flex text-gold-500 mb-6 gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        fill={i < Math.floor(reviews[activeIndex].rating) ? 'currentColor' : 'none'}
                        className={i < Math.floor(reviews[activeIndex].rating) ? 'text-gold-500' : 'text-slate-300 dark:text-slate-700'}
                      />
                    ))}
                  </div>

                  <p className="text-base sm:text-lg text-slate-700 dark:text-slate-250 italic font-medium leading-relaxed mb-8 max-w-2xl">
                    "{reviews[activeIndex].review}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gold-500 text-navy-850 flex items-center justify-center font-black text-lg border-2 border-gold-500 select-none">
                      {reviews[activeIndex].name ? reviews[activeIndex].name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="text-left">
                      <span className="block font-bold text-slate-900 dark:text-white text-sm">
                        {reviews[activeIndex].name}
                      </span>
                      <span className="block text-[10px] text-slate-450 dark:text-slate-500 font-extrabold uppercase tracking-wider flex items-center gap-1">
                        <Award size={10} className="text-gold-500" />
                        {reviews[activeIndex].tripDetails}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6 sm:hidden">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                    activeIndex === idx ? 'bg-gold-500 w-5' : 'bg-slate-305 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-500 py-10">No reviews found. Be the first to add one!</div>
        )}

        {/* Modal Dialog for Writing Review */}
        <AnimatePresence>
          {isWriteModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
                onClick={() => setIsWriteModalOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-white dark:bg-navy-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-md relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]"
              >
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                  <PenTool size={18} className="text-gold-500" />
                  Write Customer Review
                </h3>

                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase font-extrabold tracking-wider text-slate-450 dark:text-slate-500 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-900 text-sm font-semibold text-slate-800 dark:text-white focus:outline-none focus:border-gold-500 transition-colors"
                      placeholder="e.g. Anand Sharma"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-extrabold tracking-wider text-slate-450 dark:text-slate-500 mb-1.5">
                      Trip Details
                    </label>
                    <input
                      type="text"
                      required
                      value={tripDetails}
                      onChange={(e) => setTripDetails(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-900 text-sm font-semibold text-slate-800 dark:text-white focus:outline-none focus:border-gold-500 transition-colors"
                      placeholder="e.g. Araku Valley Tour • Ertiga"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-extrabold tracking-wider text-slate-450 dark:text-slate-500 mb-2">
                      Rating
                    </label>
                    <div className="flex text-gold-500 gap-1.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          type="button"
                          key={s}
                          onClick={() => setRating(s)}
                          className="hover:scale-110 active:scale-95 transition-transform"
                        >
                          <Star size={24} fill={s <= rating ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-extrabold tracking-wider text-slate-455 dark:text-slate-500 mb-1.5">
                      Your Review
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-900 text-sm font-semibold text-slate-800 dark:text-white focus:outline-none focus:border-gold-500 transition-colors resize-none"
                      placeholder="Share your travel experience with us..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 mt-6">
                    <button
                      type="button"
                      onClick={() => setIsWriteModalOpen(false)}
                      className="flex-1 py-3 border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-navy-900 font-bold rounded-xl text-xs transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-gold-500 hover:bg-gold-600 text-navy-850 font-bold rounded-xl text-xs shadow-md hover:shadow-lg transition-all"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
