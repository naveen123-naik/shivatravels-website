'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  Vehicle,
  Review,
  GalleryItem,
  Destination,
  Driver,
  ContactMessage,
  defaultVehicles,
  defaultDestinations,
  defaultReviews,
  defaultGalleryItems,
  defaultDrivers,
  defaultContactMessages
} from '../data/defaultMockData';

interface MockDBContextProps {
  vehicles: Vehicle[];
  destinations: Destination[];
  reviews: Review[];
  gallery: GalleryItem[];
  drivers: Driver[];
  isLoaded: boolean;
  databaseConfigured: boolean;
  
  // Vehicles
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  updateVehicle: (vehicle: Vehicle) => void;
  deleteVehicle: (id: string) => void;
  
  // Reviews
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  
  // Gallery
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;

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
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
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
          
          setVehicles(json.data.vehicles || []);
          setDestinations(json.data.destinations || []);
          setReviews(json.data.reviews || []);
          setGallery(json.data.gallery || []);
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
        const localVehicles = localStorage.getItem('snt_vehicles');
        const localDestinations = localStorage.getItem('snt_destinations');
        const localReviews = localStorage.getItem('snt_reviews');
        const localGallery = localStorage.getItem('snt_gallery');
        const localDrivers = localStorage.getItem('snt_drivers');
        const localMessages = localStorage.getItem('snt_messages');

        if (localVehicles) setVehicles(JSON.parse(localVehicles));
        else {
          setVehicles(defaultVehicles);
          localStorage.setItem('snt_vehicles', JSON.stringify(defaultVehicles));
        }

        const parsedDests = localDestinations ? JSON.parse(localDestinations) : [];
        const hasGoa = parsedDests.some((d: any) => d.name === 'Goa');
        if (localDestinations && parsedDests.length === defaultDestinations.length && !hasGoa) {
          setDestinations(parsedDests);
        } else {
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
        setVehicles(defaultVehicles);
        setDestinations(defaultDestinations);
        setReviews(defaultReviews);
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
  const addGalleryItem = async (itemData: Omit<GalleryItem, 'id'>) => {
    const randomId = `g-${Math.floor(100 + Math.random() * 900)}`;
    const newItem: GalleryItem = {
      ...itemData,
      id: randomId
    };
    
    // Optimistic UI update
    const updated = [newItem, ...gallery];
    setGallery(updated);
    saveToStorage('snt_gallery', updated);

    if (databaseConfigured) {
      try {
        const res = await fetch('/api/db', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ entity: 'gallery', data: newItem })
        });
        const json = await res.json();
        if (!json.success) {
          throw new Error(json.error || 'API failed');
        }
      } catch (err) {
        console.error('Failed to sync gallery item to DB:', err);
        // Rollback optimistic update on failure
        const rollback = gallery.filter(g => g.id !== randomId);
        setGallery(rollback);
        saveToStorage('snt_gallery', rollback);
        throw err;
      }
    }
  };

  const deleteGalleryItem = async (id: string) => {
    if (databaseConfigured) {
      try {
        const res = await fetch(`/api/db?entity=gallery&id=${encodeURIComponent(id)}`, {
          method: 'DELETE'
        });
        const json = await res.json();
        if (!json.success) {
          throw new Error(json.error || 'API failed');
        }
      } catch (err) {
        console.error('Failed to delete gallery item from DB:', err);
        throw err;
      }
    }
    const updated = gallery.filter(g => g.id !== id);
    setGallery(updated);
    saveToStorage('snt_gallery', updated);
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
        vehicles,
        destinations,
        reviews,
        gallery,
        drivers,
        isLoaded,
        databaseConfigured,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        addReview,
        addGalleryItem,
        deleteGalleryItem,
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
