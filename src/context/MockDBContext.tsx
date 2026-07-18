'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  Vehicle,
  Review,
  GalleryItem,
  TourPackage,
  Destination,
  Coupon,
  Booking,
  Driver,
  ContactMessage,
  defaultVehicles,
  defaultDestinations,
  defaultTourPackages,
  defaultReviews,
  defaultGalleryItems,
  defaultCoupons,
  defaultBookings,
  defaultDrivers,
  defaultContactMessages
} from '../data/defaultMockData';

interface MockDBContextProps {
  bookings: Booking[];
  vehicles: Vehicle[];
  packages: TourPackage[];
  destinations: Destination[];
  reviews: Review[];
  gallery: GalleryItem[];
  coupons: Coupon[];
  drivers: Driver[];
  isLoaded: boolean;
  databaseConfigured: boolean;
  
  // Bookings
  addBooking: (booking: Omit<Booking, 'id' | 'status' | 'bookingDate'>) => Booking;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  toggleFavoriteBooking: (id: string) => void;
  
  // Vehicles
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  updateVehicle: (vehicle: Vehicle) => void;
  deleteVehicle: (id: string) => void;
  
  // Packages
  addPackage: (pkg: Omit<TourPackage, 'id'>) => void;
  updatePackage: (pkg: TourPackage) => void;
  deletePackage: (id: string) => void;
  
  // Reviews
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  
  // Gallery
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
  
  // Coupons
  addCoupon: (coupon: Coupon) => void;
  updateCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;

  // Drivers
  addDriver: (driver: Omit<Driver, 'id'>) => void;
  updateDriver: (driver: Driver) => void;
  deleteDriver: (id: string) => void;

  // Messages
  messages: ContactMessage[];
  addMessage: (message: Omit<ContactMessage, 'id' | 'date' | 'status'>) => void;
  updateMessageStatus: (id: string, status: ContactMessage['status']) => void;
  deleteMessage: (id: string) => void;
}

const MockDBContext = createContext<MockDBContextProps | undefined>(undefined);

export const MockDBProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [databaseConfigured, setDatabaseConfigured] = useState(false);
  // Track whether gallery was loaded from DB so we don't double-init
  const galleryLoadedFromDb = useRef(false);

  // Probe the database API route to determine if PostgreSQL is configured and load all tables
  useEffect(() => {
    const initDatabase = async () => {
      try {
        const res = await fetch('/api/db');
        const json = await res.json();
        if (json.databaseConfigured && json.success && json.data) {
          console.log('PostgreSQL database detected. Syncing all tables with Supabase.');
          setDatabaseConfigured(true);
          
          setBookings(json.data.bookings || []);
          setVehicles(json.data.vehicles || []);
          setPackages(json.data.packages || []);
          setDestinations(json.data.destinations || []);
          setReviews(json.data.reviews || []);
          setGallery(json.data.gallery || []);
          setCoupons(json.data.coupons || []);
          setDrivers(json.data.drivers || []);
          setMessages(json.data.messages || []);
          
          galleryLoadedFromDb.current = true;
          setIsLoaded(true);
          return; // Skip LocalStorage loading
        }
      } catch (e) {
        console.log('Database probe failed, falling back to LocalStorage:', e);
      }

      // If database not configured or offline, load from LocalStorage
      loadFromLocalStorage();
    };

    const loadFromLocalStorage = () => {
      try {
        console.log('Running in client-side LocalStorage database mode.');
        const localBookings = localStorage.getItem('snt_bookings');
        const localVehicles = localStorage.getItem('snt_vehicles');
        const localPackages = localStorage.getItem('snt_packages');
        const localDestinations = localStorage.getItem('snt_destinations');
        const localReviews = localStorage.getItem('snt_reviews');
        const localGallery = localStorage.getItem('snt_gallery');
        const localCoupons = localStorage.getItem('snt_coupons');
        const localDrivers = localStorage.getItem('snt_drivers');
        const localMessages = localStorage.getItem('snt_messages');

        if (localBookings) setBookings(JSON.parse(localBookings));
        else {
          setBookings(defaultBookings);
          localStorage.setItem('snt_bookings', JSON.stringify(defaultBookings));
        }

        if (localVehicles) setVehicles(JSON.parse(localVehicles));
        else {
          setVehicles(defaultVehicles);
          localStorage.setItem('snt_vehicles', JSON.stringify(defaultVehicles));
        }

        if (localPackages) setPackages(JSON.parse(localPackages));
        else {
          setPackages(defaultTourPackages);
          localStorage.setItem('snt_packages', JSON.stringify(defaultTourPackages));
        }

        if (localDestinations) setDestinations(JSON.parse(localDestinations));
        else {
          setDestinations(defaultDestinations);
          localStorage.setItem('snt_destinations', JSON.stringify(defaultDestinations));
        }

        if (localReviews) setReviews(JSON.parse(localReviews));
        else {
          setReviews(defaultReviews);
          localStorage.setItem('snt_reviews', JSON.stringify(defaultReviews));
        }

        if (!galleryLoadedFromDb.current) {
          if (localGallery) {
            setGallery(JSON.parse(localGallery));
          } else {
            setGallery(defaultGalleryItems);
            localStorage.setItem('snt_gallery', JSON.stringify(defaultGalleryItems));
          }
        }

        if (localCoupons) setCoupons(JSON.parse(localCoupons));
        else {
          setCoupons(defaultCoupons);
          localStorage.setItem('snt_coupons', JSON.stringify(defaultCoupons));
        }

        if (localDrivers) setDrivers(JSON.parse(localDrivers));
        else {
          setDrivers(defaultDrivers);
          localStorage.setItem('snt_drivers', JSON.stringify(defaultDrivers));
        }

        if (localMessages) setMessages(JSON.parse(localMessages));
        else {
          setMessages(defaultContactMessages);
          localStorage.setItem('snt_messages', JSON.stringify(defaultContactMessages));
        }
      } catch (e) {
        console.warn('LocalStorage database read/seed blocked, using memory variables:', e);
        // fallback states
        setBookings(defaultBookings);
        setVehicles(defaultVehicles);
        setPackages(defaultTourPackages);
        setDestinations(defaultDestinations);
        setReviews(defaultReviews);
        setCoupons(defaultCoupons);
        setDrivers(defaultDrivers);
        setMessages(defaultContactMessages);
        if (!galleryLoadedFromDb.current) setGallery(defaultGalleryItems);
      } finally {
        setIsLoaded(true);
      }
    };

    initDatabase();
  }, []);

  // Helper to write to local storage
  const saveToStorage = (key: string, data: any) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (e) {
        console.warn('LocalStorage write blocked:', e);
      }
    }
  };

  // BOOKINGS
  const addBooking = (newBookingData: Omit<Booking, 'id' | 'status' | 'bookingDate'>) => {
    const randomId = `SNT-${Math.floor(10000 + Math.random() * 90000)}`;
    const newBooking: Booking = {
      ...newBookingData,
      id: randomId,
      status: 'Pending',
      bookingDate: new Date().toISOString(),
      favorite: false
    };
    
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    saveToStorage('snt_bookings', updated);

    if (databaseConfigured) {
      fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity: 'bookings', data: newBooking })
      }).catch(err => console.error('Failed to sync booking to PostgreSQL:', err));
    }

    return newBooking;
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    setBookings(updated);
    saveToStorage('snt_bookings', updated);

    if (databaseConfigured) {
      const target = updated.find(b => b.id === id);
      if (target) {
        fetch('/api/db', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ entity: 'bookings', data: target })
        }).catch(err => console.error('Failed to update booking status in DB:', err));
      }
    }
  };

  const toggleFavoriteBooking = (id: string) => {
    const booking = bookings.find(b => b.id === id);
    const newFav = booking ? !booking.favorite : false;
    const updated = bookings.map(b => b.id === id ? { ...b, favorite: newFav } : b);
    setBookings(updated);
    saveToStorage('snt_bookings', updated);

    if (databaseConfigured) {
      const target = updated.find(b => b.id === id);
      if (target) {
        fetch('/api/db', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ entity: 'bookings', data: target })
        }).catch(err => console.error('Failed to toggle favorite in DB:', err));
      }
    }
  };

  // VEHICLES
  const addVehicle = (vehicleData: Omit<Vehicle, 'id'>) => {
    const randomId = `v-${Math.floor(100 + Math.random() * 900)}`;
    const newVehicle: Vehicle = {
      ...vehicleData,
      id: randomId
    };
    const updated = [...vehicles, newVehicle];
    setVehicles(updated);
    saveToStorage('snt_vehicles', updated);

    if (databaseConfigured) {
      fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity: 'vehicles', data: newVehicle })
      }).catch(err => console.error('Failed to add vehicle to DB:', err));
    }
  };

  const updateVehicle = (updatedVehicle: Vehicle) => {
    const updated = vehicles.map(v => v.id === updatedVehicle.id ? updatedVehicle : v);
    setVehicles(updated);
    saveToStorage('snt_vehicles', updated);

    if (databaseConfigured) {
      fetch('/api/db', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity: 'vehicles', data: updatedVehicle })
      }).catch(err => console.error('Failed to update vehicle in DB:', err));
    }
  };

  const deleteVehicle = (id: string) => {
    const updated = vehicles.filter(v => v.id !== id);
    setVehicles(updated);
    saveToStorage('snt_vehicles', updated);

    if (databaseConfigured) {
      fetch(`/api/db?entity=vehicles&id=${encodeURIComponent(id)}`, {
        method: 'DELETE'
      }).catch(err => console.error('Failed to delete vehicle from DB:', err));
    }
  };

  // PACKAGES
  const addPackage = (pkgData: Omit<TourPackage, 'id'>) => {
    const randomId = `p-${Math.floor(100 + Math.random() * 900)}`;
    const newPkg: TourPackage = {
      ...pkgData,
      id: randomId
    };
    const updated = [...packages, newPkg];
    setPackages(updated);
    saveToStorage('snt_packages', updated);

    if (databaseConfigured) {
      fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity: 'packages', data: newPkg })
      }).catch(err => console.error('Failed to add package to DB:', err));
    }
  };

  const deletePackage = (id: string) => {
    const updated = packages.filter(p => p.id !== id);
    setPackages(updated);
    saveToStorage('snt_packages', updated);

    if (databaseConfigured) {
      fetch(`/api/db?entity=packages&id=${encodeURIComponent(id)}`, {
        method: 'DELETE'
      }).catch(err => console.error('Failed to delete package from DB:', err));
    }
  };

  const updatePackage = (updatedPkg: TourPackage) => {
    const updated = packages.map(p => p.id === updatedPkg.id ? updatedPkg : p);
    setPackages(updated);
    saveToStorage('snt_packages', updated);

    if (databaseConfigured) {
      fetch('/api/db', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity: 'packages', data: updatedPkg })
      }).catch(err => console.error('Failed to update package in DB:', err));
    }
  };

  // REVIEWS
  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const randomId = `r-${Math.floor(100 + Math.random() * 900)}`;
    const newReview: Review = {
      ...reviewData,
      id: randomId,
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    saveToStorage('snt_reviews', updated);

    if (databaseConfigured) {
      fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity: 'reviews', data: newReview })
      }).catch(err => console.error('Failed to sync review to DB:', err));
    }
  };

  // GALLERY
  const addGalleryItem = async (itemData: Omit<GalleryItem, 'id'>): Promise<void> => {
    if (databaseConfigured) {
      try {
        const res = await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(itemData),
        });
        const json = await res.json();
        if (json.success && json.data) {
          setGallery(prev => [json.data as GalleryItem, ...prev]);
          return;
        }
        throw new Error(json.error || 'API error');
      } catch (e) {
        console.error('Failed to add gallery item via API, falling back to LocalStorage:', e);
      }
    }
    const randomId = `g-${Math.floor(100 + Math.random() * 900)}`;
    const newItem: GalleryItem = { ...itemData, id: randomId };
    const updated = [newItem, ...gallery];
    setGallery(updated);
    saveToStorage('snt_gallery', updated);
  };

  const deleteGalleryItem = async (id: string): Promise<void> => {
    if (databaseConfigured) {
      try {
        const res = await fetch(`/api/gallery?id=${encodeURIComponent(id)}`, {
          method: 'DELETE',
        });
        const json = await res.json();
        if (json.success) {
          setGallery(prev => prev.filter(g => g.id !== id));
          return;
        }
        throw new Error(json.error || 'API error');
      } catch (e) {
        console.error('Failed to delete gallery item via API, falling back to LocalStorage:', e);
      }
    }
    const updated = gallery.filter(g => g.id !== id);
    setGallery(updated);
    saveToStorage('snt_gallery', updated);
  };

  // COUPONS
  const addCoupon = (coupon: Coupon) => {
    const updated = [...coupons, coupon];
    setCoupons(updated);
    saveToStorage('snt_coupons', updated);

    if (databaseConfigured) {
      fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity: 'coupons', data: coupon })
      }).catch(err => console.error('Failed to sync coupon to DB:', err));
    }
  };

  const deleteCoupon = (code: string) => {
    const updated = coupons.filter(c => c.code !== code);
    setCoupons(updated);
    saveToStorage('snt_coupons', updated);

    if (databaseConfigured) {
      fetch(`/api/db?entity=coupons&id=${encodeURIComponent(code)}`, {
        method: 'DELETE'
      }).catch(err => console.error('Failed to delete coupon from DB:', err));
    }
  };

  const updateCoupon = (updatedCoupon: Coupon) => {
    const updated = coupons.map(c => c.code === updatedCoupon.code ? updatedCoupon : c);
    setCoupons(updated);
    saveToStorage('snt_coupons', updated);

    if (databaseConfigured) {
      fetch('/api/db', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity: 'coupons', data: updatedCoupon })
      }).catch(err => console.error('Failed to update coupon in DB:', err));
    }
  };

  // DRIVERS
  const addDriver = (driverData: Omit<Driver, 'id'>) => {
    const randomId = `d-${Math.floor(100 + Math.random() * 900)}`;
    const newDriver: Driver = {
      ...driverData,
      id: randomId
    };
    const updated = [...drivers, newDriver];
    setDrivers(updated);
    saveToStorage('snt_drivers', updated);

    if (databaseConfigured) {
      fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity: 'drivers', data: newDriver })
      }).catch(err => console.error('Failed to sync driver to DB:', err));
    }
  };

  const updateDriver = (updatedDriver: Driver) => {
    const updated = drivers.map(d => d.id === updatedDriver.id ? updatedDriver : d);
    setDrivers(updated);
    saveToStorage('snt_drivers', updated);

    if (databaseConfigured) {
      fetch('/api/db', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity: 'drivers', data: updatedDriver })
      }).catch(err => console.error('Failed to update driver in DB:', err));
    }
  };

  const deleteDriver = (id: string) => {
    const updated = drivers.filter(d => d.id !== id);
    setDrivers(updated);
    saveToStorage('snt_drivers', updated);

    if (databaseConfigured) {
      fetch(`/api/db?entity=drivers&id=${encodeURIComponent(id)}`, {
        method: 'DELETE'
      }).catch(err => console.error('Failed to delete driver from DB:', err));
    }
  };

  // MESSAGES
  const addMessage = (msgData: Omit<ContactMessage, 'id' | 'date' | 'status'>) => {
    const randomId = `msg-${Math.floor(100 + Math.random() * 900)}`;
    const newMsg: ContactMessage = {
      ...msgData,
      id: randomId,
      date: new Date().toISOString(),
      status: 'Unread'
    };
    const updated = [newMsg, ...messages];
    setMessages(updated);
    saveToStorage('snt_messages', updated);

    if (databaseConfigured) {
      fetch('/api/db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity: 'messages', data: newMsg })
      }).catch(err => console.error('Failed to sync message to DB:', err));
    }
  };

  const updateMessageStatus = (id: string, status: ContactMessage['status']) => {
    const updated = messages.map(m => m.id === id ? { ...m, status } : m);
    setMessages(updated);
    saveToStorage('snt_messages', updated);

    if (databaseConfigured) {
      const target = updated.find(m => m.id === id);
      if (target) {
        fetch('/api/db', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ entity: 'messages', data: target })
        }).catch(err => console.error('Failed to update message status in DB:', err));
      }
    }
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    saveToStorage('snt_messages', updated);

    if (databaseConfigured) {
      fetch(`/api/db?entity=messages&id=${encodeURIComponent(id)}`, {
        method: 'DELETE'
      }).catch(err => console.error('Failed to delete message from DB:', err));
    }
  };

  return (
    <MockDBContext.Provider
      value={{
        bookings,
        vehicles,
        packages,
        destinations,
        reviews,
        gallery,
        coupons,
        drivers,
        isLoaded,
        databaseConfigured,
        addBooking,
        updateBookingStatus,
        toggleFavoriteBooking,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        addPackage,
        updatePackage,
        deletePackage,
        addReview,
        addGalleryItem,
        deleteGalleryItem,
        addCoupon,
        updateCoupon,
        deleteCoupon,
        addDriver,
        updateDriver,
        deleteDriver,
        messages,
        addMessage,
        updateMessageStatus,
        deleteMessage
      }}
    >
      {children}
    </MockDBContext.Provider>
  );
};

export const useMockDB = () => {
  const context = useContext(MockDBContext);
  if (!context) {
    throw new Error('useMockDB must be used within a MockDBProvider');
  }
  return context;
};
