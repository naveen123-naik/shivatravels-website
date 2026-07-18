'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useMockDB } from '@/context/MockDBContext';
import { Vehicle, Review, GalleryItem } from '@/data/defaultMockData';
import {
  LogOut, Car, Plus, Edit, Trash2, Check, X,
  Star, Image as ImageIcon, Mail, RefreshCw, ShieldCheck, ArrowLeft
} from 'lucide-react';

export default function AdminPage() {
  const {
    vehicles, reviews, gallery, isLoaded,
    addVehicle, updateVehicle, deleteVehicle,
    addGalleryItem, deleteGalleryItem,
    messages, updateMessageStatus, deleteMessage
  } = useMockDB();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<'fleet' | 'reviews' | 'gallery' | 'messages'>('fleet');

  // Form states for Gallery
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryCategory, setGalleryCategory] = useState<'Cars' | 'Places' | 'Customers' | 'Roads'>('Cars');
  const [galleryImage, setGalleryImage] = useState('');

  // Form states for Fleet Manager
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleCategory, setVehicleCategory] = useState<Vehicle['category']>('Sedan');
  const [vehicleImage, setVehicleImage] = useState('');
  const [vehicleSeats, setVehicleSeats] = useState(4);
  const [vehicleLuggage, setVehicleLuggage] = useState('2 Bags');
  const [vehicleAc, setVehicleAc] = useState(true);
  const [vehicleFuel, setVehicleFuel] = useState('Petrol');
  const [vehiclePrice, setVehiclePrice] = useState(13);
  const [vehicleAllowance, setVehicleAllowance] = useState(350);
  const [vehicleFeatures, setVehicleFeatures] = useState('');

  // Check past session login
  useEffect(() => {
    const savedSession = sessionStorage.getItem('snt_admin_auth');
    if (savedSession === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const json = await res.json();
      if (json.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('snt_admin_auth', 'true');
        setLoginError('');
      } else {
        setLoginError(json.error || 'Invalid username or password');
      }
    } catch (err) {
      console.error('Authentication request error:', err);
      setLoginError('Unable to connect to authentication service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('snt_admin_auth');
  };



  // -------------------------------------------------------------
  // VEHICLE CRUD HANDLERS
  // -------------------------------------------------------------
  const openAddVehicleModal = () => {
    setEditingVehicle(null);
    setVehicleName('');
    setVehicleCategory('Sedan');
    setVehicleImage('https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=600&auto=format&fit=crop');
    setVehicleSeats(4);
    setVehicleLuggage('2 Bags');
    setVehicleAc(true);
    setVehicleFuel('Diesel');
    setVehiclePrice(13);
    setVehicleAllowance(350);
    setVehicleFeatures('Power Steering, USB Ports, Extra Legroom');
    setIsVehicleModalOpen(true);
  };

  const openEditVehicleModal = (v: Vehicle) => {
    setEditingVehicle(v);
    setVehicleName(v.name);
    setVehicleCategory(v.category);
    setVehicleImage(v.image);
    setVehicleSeats(v.seatingCapacity);
    setVehicleLuggage(v.luggageCapacity);
    setVehicleAc(v.ac);
    setVehicleFuel(v.fuelType);
    setVehiclePrice(v.pricePerKm);
    setVehicleAllowance(v.driverAllowance);
    setVehicleFeatures(v.features.join(', '));
    setIsVehicleModalOpen(true);
  };

  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const featuresArray = vehicleFeatures.split(',').map((f) => f.trim()).filter(Boolean);

    if (editingVehicle) {
      updateVehicle({
        ...editingVehicle,
        name: vehicleName,
        category: vehicleCategory,
        image: vehicleImage,
        seatingCapacity: vehicleSeats,
        luggageCapacity: vehicleLuggage,
        ac: vehicleAc,
        fuelType: vehicleFuel,
        pricePerKm: vehiclePrice,
        driverAllowance: vehicleAllowance,
        features: featuresArray,
      });
    } else {
      addVehicle({
        name: vehicleName,
        category: vehicleCategory,
        image: vehicleImage,
        seatingCapacity: vehicleSeats,
        luggageCapacity: vehicleLuggage,
        ac: vehicleAc,
        fuelType: vehicleFuel,
        pricePerKm: vehiclePrice,
        driverAllowance: vehicleAllowance,
        features: featuresArray,
        available: true,
      });
    }

    setIsVehicleModalOpen(false);
  };







  // -------------------------------------------------------------
  // GALLERY CRUD HANDLERS
  // -------------------------------------------------------------
  const handleGalleryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setGalleryImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryImage) return;

    addGalleryItem({
      title: galleryTitle,
      category: galleryCategory,
      image: galleryImage,
    });

    // Reset Form
    setGalleryTitle('');
    setGalleryCategory('Cars');
    setGalleryImage('');
    setIsGalleryModalOpen(false);
  };

  if (!isLoaded) {
    return (
      <div className="min-screen bg-slate-900 text-white flex items-center justify-center h-screen flex-col gap-3">
        <RefreshCw className="animate-spin text-gold-500" size={36} />
        <span className="font-extrabold text-sm uppercase tracking-widest text-slate-400">Loading Database...</span>
      </div>
    );
  }

  // -------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-navy-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="flex justify-center items-center cursor-pointer mb-6">
            <Link href="/" className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center mr-2 shadow-lg">
                <span className="font-extrabold text-navy-850 text-2xl">S</span>
              </div>
              <div className="text-left">
                <span className="font-extrabold text-2xl tracking-tight text-white">
                  SHIVA NAIK
                </span>
                <span className="block text-[10px] uppercase tracking-[0.25em] text-gold-500 font-bold leading-none mt-0.5">
                  Travels
                </span>
              </div>
            </Link>
          </div>
          
          <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
            Admin Portal Gateway
          </h2>
          <p className="mt-2 text-center text-xs text-slate-400 font-semibold">
            Authorized Personnel Access Only
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
          <div className="bg-slate-900 border border-slate-800 py-8 px-6 shadow-2xl rounded-3xl sm:px-10">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-navy-950 text-sm font-semibold text-white focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="shiva123"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-navy-950 text-sm font-semibold text-white focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>

              {loginError && (
                <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl font-semibold leading-relaxed">
                  {loginError}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gold-500 hover:bg-gold-600 disabled:opacity-50 text-navy-850 font-extrabold rounded-xl shadow-lg hover:shadow-gold-500/25 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-navy-850 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ShieldCheck size={16} />
                  )}
                  {isSubmitting ? 'Verifying...' : 'Authorize Login'}
                </button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-800 text-center">
              <Link href="/" className="text-xs text-slate-400 hover:text-gold-500 transition-colors flex items-center justify-center gap-1.5 font-bold">
                <ArrowLeft size={12} />
                Back to Public Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // DASHBOARD MAIN CONTROL TERMINAL
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Dashboard Top bar */}
      <header className="bg-navy-950 border-b border-slate-900 py-4 px-6 sm:px-8 z-30 sticky top-0 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center cursor-pointer mr-8">
            <div className="w-9 h-9 rounded-full bg-gold-500 flex items-center justify-center mr-2 shadow-md">
              <span className="font-extrabold text-navy-850 text-lg">S</span>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                SHIVA NAIK
              </span>
              <span className="block text-[8px] uppercase tracking-[0.2em] text-gold-500 font-bold leading-none mt-0.5">
                Admin Console
              </span>
            </div>
          </Link>
          
          {/* Header Action Menu */}
          <span className="hidden sm:inline-block bg-slate-900 border border-slate-800 text-[10px] text-green-400 px-3 py-1 rounded-full font-bold">
            🛡️ Database Live
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 py-2 px-4 border border-slate-800 hover:border-red-500/30 bg-slate-900 hover:bg-red-500/10 text-slate-400 hover:text-red-400 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer"
        >
          <LogOut size={14} />
          <span>Exit Console</span>
        </button>
      </header>

      {/* Main Body */}
      <div className="flex-grow flex flex-col md:flex-row">
        
        {/* Left Side Sidebar Panel */}
        <aside className="w-full md:w-64 bg-navy-950/40 border-r border-slate-900 p-6 flex flex-col space-y-2">
          <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-500 px-4 mb-2">
            Navigation Menu
          </span>

          <button
            onClick={() => setActiveTab('fleet')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left transition-all ${
              activeTab === 'fleet'
                ? 'bg-gold-500 text-navy-850 shadow-md font-extrabold'
                : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Car size={16} />
            <span>Fleet Inventory ({vehicles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left transition-all ${
              activeTab === 'reviews'
                ? 'bg-gold-500 text-navy-850 shadow-md font-extrabold'
                : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Star size={16} />
            <span>Reviews ({reviews.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left transition-all ${
              activeTab === 'gallery'
                ? 'bg-gold-500 text-navy-850 shadow-md font-extrabold'
                : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon size={16} />
            <span>Gallery Manager ({gallery ? gallery.length : 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left transition-all ${
              activeTab === 'messages'
                ? 'bg-gold-500 text-navy-850 shadow-md font-extrabold'
                : 'hover:bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Mail size={16} />
            <span>Contact Messages ({messages ? messages.length : 0})</span>
          </button>
        </aside>

        {/* Right Side Work Area */}
        <main className="flex-grow p-6 sm:p-8 relative">
          




          {/* TAB 3: FLEET CRUD INVENTORY */}
          {activeTab === 'fleet' && (
            <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
              <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-4">
                <h3 className="text-xl font-extrabold text-white tracking-wide">
                  Fleet Inventory Management
                </h3>
                <button
                  onClick={openAddVehicleModal}
                  className="bg-gold-500 hover:bg-gold-600 text-navy-850 font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 text-xs cursor-pointer"
                >
                  <Plus size={16} />
                  Add New Fleet Vehicle
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vehicles.map((v) => (
                  <div
                    key={v.id}
                    className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col sm:flex-row gap-5 items-stretch justify-between relative group"
                  >
                    {/* Image block */}
                    <div className="w-full sm:w-36 h-28 shrink-0 rounded-2xl overflow-hidden bg-slate-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Content specs */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-extrabold text-sm text-white">{v.name}</h4>
                          <span className="bg-slate-850 border border-slate-800 text-slate-400 font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md">
                            {v.category}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-450 mt-1 font-semibold">
                          Seats: {v.seatingCapacity} | Luggage: {v.luggageCapacity} | AC: {v.ac ? 'Yes' : 'No'} | Fuel: {v.fuelType}
                        </p>
                        <p className="text-xs text-gold-500 font-extrabold mt-2">
                          ₹{v.pricePerKm}/km | Allowance: ₹{v.driverAllowance}
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="flex gap-2 mt-4 pt-3 border-t border-slate-800/80">
                        <button
                          onClick={() => openEditVehicleModal(v)}
                          className="flex-grow py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Edit size={12} />
                          Edit specs
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${v.name}?`)) {
                              deleteVehicle(v.id);
                            }
                          }}
                          className="py-2 px-3 border border-slate-800 hover:border-red-500/20 bg-slate-950 hover:bg-red-500/10 text-slate-450 hover:text-red-400 font-bold rounded-xl transition-all cursor-pointer"
                          title="Remove vehicle"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: REVIEWS CONTROLLER */}
          {activeTab === 'reviews' && (
            <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
              <h3 className="text-xl font-extrabold text-white tracking-wide border-b border-slate-900 pb-4 mb-4">
                Customer Reviews Terminal
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2.5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={r.photo} alt={r.name} className="w-9 h-9 rounded-full object-cover border border-gold-500" />
                          <div>
                            <span className="block font-bold text-white text-xs">{r.name}</span>
                            <span className="block text-[8px] text-slate-400 uppercase font-extrabold">{r.tripDetails}</span>
                          </div>
                        </div>

                        <div className="flex text-gold-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={10} fill={i < Math.floor(r.rating) ? 'currentColor' : 'none'} />
                          ))}
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-350 italic font-semibold leading-relaxed mt-4">
                        "{r.review}"
                      </p>
                    </div>

                    <div className="text-[9px] text-slate-500 border-t border-slate-800/60 pt-3 flex justify-between items-center font-bold">
                      <span>Date: {r.date}</span>
                      <span>Verified Client</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}



          {/* TAB: GALLERY MANAGER */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <h3 className="text-xl font-extrabold text-white tracking-wide">
                  Gallery Asset Manager
                </h3>
                <button
                  onClick={() => setIsGalleryModalOpen(true)}
                  className="bg-gold-500 hover:bg-gold-600 text-navy-850 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-all duration-200"
                >
                  <Plus size={14} /> Add Gallery Image
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {gallery && gallery.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between group relative"
                  >
                    {/* Image */}
                    <div className="w-full aspect-[4/3] bg-slate-800 relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-slate-900/90 border border-slate-800/80 text-gold-500 font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md">
                        {item.category}
                      </span>
                    </div>

                    {/* Metadata & delete */}
                    <div className="p-4 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs text-white truncate" title={item.title}>
                          {item.title}
                        </h4>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to remove this gallery image: "${item.title}"?`)) {
                            deleteGalleryItem(item.id);
                          }
                        }}
                        className="p-2 border border-slate-800 hover:border-red-500/20 text-slate-400 hover:text-red-400 bg-slate-950 rounded-xl transition-all cursor-pointer shrink-0"
                        title="Delete image"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CONTACT MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <h3 className="text-xl font-extrabold text-white tracking-wide">
                  Contact Messages ({messages ? messages.length : 0} Messages)
                </h3>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-navy-950 text-slate-400 font-extrabold uppercase border-b border-slate-800">
                        <th className="p-4">Sender Info</th>
                        <th className="p-4">Message</th>
                        <th className="p-4">Date</th>
                        <th className="p-4 text-center">Status</th>
                        <th className="p-4 text-center">Action Controls</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-semibold text-slate-300">
                      {messages && messages.length > 0 ? (
                        messages.map((msg) => (
                          <tr key={msg.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="p-4 text-xs">
                              <span className="block text-white font-bold">{msg.name}</span>
                              <span className="block text-[10px] text-slate-400 mt-0.5">{msg.phone}</span>
                              {msg.email && <span className="block text-[10px] text-slate-400">{msg.email}</span>}
                            </td>
                            <td className="p-4 max-w-md whitespace-pre-wrap leading-relaxed text-xs">
                              {msg.message}
                            </td>
                            <td className="p-4 text-slate-450 text-xs">
                              {new Date(msg.date).toLocaleString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </td>
                            <td className="p-4 text-center">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                                msg.status === 'Unread'
                                  ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                                  : 'bg-green-500/10 border-green-500/20 text-green-400'
                              }`}>
                                {msg.status}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex justify-center items-center gap-1.5">
                                <button
                                  onClick={() => updateMessageStatus(msg.id, msg.status === 'Unread' ? 'Read' : 'Unread')}
                                  className={`p-1.5 border rounded-lg transition-colors cursor-pointer ${
                                    msg.status === 'Unread'
                                      ? 'bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500 hover:text-white'
                                      : 'bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500 hover:text-white'
                                  }`}
                                  title={msg.status === 'Unread' ? "Mark as Read" : "Mark as Unread"}
                                >
                                  {msg.status === 'Unread' ? <Check size={14} /> : <X size={14} />}
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm('Are you sure you want to delete this message?')) {
                                      deleteMessage(msg.id);
                                    }
                                  }}
                                  className="p-1.5 border border-slate-800 hover:border-red-500/20 text-slate-450 hover:text-red-450 bg-slate-950 rounded-lg transition-all cursor-pointer"
                                  title="Delete Message"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-slate-500">
                            No contact messages found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* -------------------------------------------------------------
          FLEET MODAL DIALOG
      ------------------------------------------------------------- */}
      {isVehicleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsVehicleModalOpen(false)} />
          
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 w-full max-w-lg relative z-10 shadow-2xl max-h-[85vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-3 flex items-center gap-2">
              <Car size={18} className="text-gold-500" />
              {editingVehicle ? 'Edit Fleet Vehicle Specs' : 'Register New Fleet Vehicle'}
            </h3>

            <form onSubmit={handleSaveVehicle} className="space-y-4 text-xs font-semibold">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1.5 uppercase font-bold">Vehicle Model Name</label>
                  <input
                    type="text"
                    required
                    value={vehicleName}
                    onChange={(e) => setVehicleName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-navy-950 text-xs font-bold text-white focus:outline-none"
                    placeholder="e.g. Toyota Innova Crysta"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1.5 uppercase font-bold">Category Class</label>
                  <select
                    value={vehicleCategory}
                    onChange={(e) => setVehicleCategory(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-navy-950 text-xs font-bold text-white focus:outline-none"
                  >
                    <option value="Hatchback">Hatchback</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Luxury SUV">Luxury SUV</option>
                    <option value="Tempo Traveller">Tempo Traveller</option>
                    <option value="Mini Bus">Mini Bus</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1.5 uppercase font-bold">Vehicle Image URL</label>
                <input
                  type="text"
                  required
                  value={vehicleImage}
                  onChange={(e) => setVehicleImage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-navy-950 text-xs font-bold text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1.5 uppercase font-bold">Seating Capacity</label>
                  <input
                    type="number"
                    required
                    value={vehicleSeats}
                    onChange={(e) => setVehicleSeats(parseInt(e.target.value) || 4)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-navy-950 text-xs font-bold text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1.5 uppercase font-bold">Luggage Capacity</label>
                  <input
                    type="text"
                    required
                    value={vehicleLuggage}
                    onChange={(e) => setVehicleLuggage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-navy-950 text-xs font-bold text-white focus:outline-none"
                    placeholder="e.g. 3 Bags"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1.5 uppercase font-bold">Fuel Type</label>
                  <input
                    type="text"
                    required
                    value={vehicleFuel}
                    onChange={(e) => setVehicleFuel(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-navy-950 text-xs font-bold text-white focus:outline-none"
                    placeholder="e.g. Diesel/CNG"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1.5 uppercase font-bold">AC / Non-AC</label>
                  <select
                    value={vehicleAc ? 'yes' : 'no'}
                    onChange={(e) => setVehicleAc(e.target.value === 'yes')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-navy-950 text-xs font-bold text-white focus:outline-none"
                  >
                    <option value="yes">Air Conditioned (AC)</option>
                    <option value="no">Non-AC Available</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1.5 uppercase font-bold">Price Per KM (₹)</label>
                  <input
                    type="number"
                    required
                    value={vehiclePrice}
                    onChange={(e) => setVehiclePrice(parseInt(e.target.value) || 12)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-navy-950 text-xs font-bold text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1.5 uppercase font-bold">Driver Allowance / Day (₹)</label>
                  <input
                    type="number"
                    required
                    value={vehicleAllowance}
                    onChange={(e) => setVehicleAllowance(parseInt(e.target.value) || 300)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-navy-950 text-xs font-bold text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1.5 uppercase font-bold">Features (comma separated)</label>
                <input
                  type="text"
                  value={vehicleFeatures}
                  onChange={(e) => setVehicleFeatures(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-navy-950 text-xs font-bold text-white focus:outline-none"
                  placeholder="e.g. Leather Captain Seats, Rear AC Vents, USB charger"
                />
              </div>

              <div className="flex gap-3 mt-6 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsVehicleModalOpen(false)}
                  className="flex-1 py-3 border border-slate-800 text-slate-400 hover:bg-slate-800 rounded-xl transition-colors font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gold-500 hover:bg-gold-600 text-navy-850 rounded-xl transition-colors font-extrabold shadow-md hover:shadow-lg"
                >
                  Save Vehicle Specs
                </button>
              </div>
            </form>
          </div>
        </div>
      )}





      {/* -------------------------------------------------------------
          GALLERY MODAL DIALOG
      ------------------------------------------------------------- */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => {
            setGalleryTitle('');
            setGalleryCategory('Cars');
            setGalleryImage('');
            setIsGalleryModalOpen(false);
          }} />
          
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 w-full max-w-md relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-3 flex items-center gap-2">
              <ImageIcon size={18} className="text-gold-500" />
              Add Gallery Image
            </h3>

            <form onSubmit={handleSaveGalleryItem} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1.5 uppercase font-bold">Image Title</label>
                <input
                  type="text"
                  required
                  value={galleryTitle}
                  onChange={(e) => setGalleryTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-navy-950 text-xs font-bold text-white focus:outline-none"
                  placeholder="e.g. Scenic Temple Drive"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1.5 uppercase font-bold">Category</label>
                <select
                  value={galleryCategory}
                  onChange={(e) => setGalleryCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-navy-950 text-xs font-bold text-white focus:outline-none"
                >
                  <option value="Cars">Cars</option>
                  <option value="Places">Places</option>
                  <option value="Customers">Customers</option>
                  <option value="Roads">Roads</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1.5 uppercase font-bold">Image Source</label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[9px] text-slate-550 mb-1 font-bold">Paste Image URL or Path</label>
                    <input
                      type="text"
                      value={galleryImage.startsWith('data:') ? '' : galleryImage}
                      onChange={(e) => setGalleryImage(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-800 bg-navy-950 text-[11px] font-bold text-white focus:outline-none animate-all"
                      placeholder="e.g. /gallery/my-car.png or https://..."
                      disabled={galleryImage.startsWith('data:')}
                    />
                  </div>
                  
                  <div className="relative flex items-center justify-between gap-4">
                    <span className="text-[9px] text-slate-550 font-bold">Or Upload Local Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleGalleryImageUpload}
                      className="text-[10px] text-slate-400 file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-gold-500 file:text-navy-850 hover:file:bg-gold-600 cursor-pointer"
                    />
                  </div>

                  {galleryImage && (
                    <div className="pt-2">
                      <span className="block text-[9px] text-slate-500 mb-1 font-bold">Image Preview:</span>
                      <div className="w-full h-28 rounded-xl overflow-hidden bg-slate-850 border border-slate-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={galleryImage} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <button
                        type="button"
                        onClick={() => setGalleryImage('')}
                        className="text-[9px] text-red-450 hover:text-red-400 font-bold mt-1.5 underline cursor-pointer"
                      >
                        Clear Image
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setGalleryTitle('');
                    setGalleryCategory('Cars');
                    setGalleryImage('');
                    setIsGalleryModalOpen(false);
                  }}
                  className="flex-1 py-3 border border-slate-800 text-slate-400 hover:bg-slate-800 rounded-xl transition-colors font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!galleryImage}
                  className="flex-1 py-3 bg-gold-500 hover:bg-gold-600 disabled:bg-slate-800 disabled:text-slate-500 text-navy-850 rounded-xl transition-colors font-extrabold shadow-md hover:shadow-lg cursor-pointer"
                >
                  Save Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
