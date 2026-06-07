import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { assets } from '../assets';

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
}

interface DataContextType {
  gallery: GalleryImage[];
  events: EventItem[];
  addGalleryImage: (image: GalleryImage) => Promise<void>;
  removeGalleryImage: (id: string) => Promise<void>;
  addEvent: (event: EventItem) => Promise<void>;
  removeEvent: (id: string) => Promise<void>;
  isLoading: boolean;
}

const defaultGallery: GalleryImage[] = [
  { id: '1', url: assets.bayelsaNewsImage, title: 'Institutional Engagement' },
  { id: '2', url: assets.capacityImage, title: 'Capacity Development Session' },
  { id: '3', url: assets.policyImage, title: 'STI Policy Programme' },
  { id: '4', url: assets.seminarImage, title: 'Research Seminar Series' },
  { id: '5', url: assets.dashboardImage, title: 'STI Intelligence Platform' },
  { id: '6', url: assets.ntaImage, title: 'Media Engagement' },
];

const defaultEvents: EventItem[] = [
  { id: '1', title: 'National Innovation Summit', date: 'August 15, 2026', description: 'Annual gathering of STI stakeholders across the nation to discuss technology management and policy implementation.', location: 'Abuja, Nigeria' },
  { id: '2', title: 'Capacity Building Workshop', date: 'September 10, 2026', description: 'Training public servants on technology management, systems thinking, and data-driven decision making.', location: 'Lagos, Nigeria' },
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [gallery, setGallery] = useState<GalleryImage[]>(defaultGallery);
  const [events, setEvents] = useState<EventItem[]>(defaultEvents);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (supabase) {
        setIsLoading(true);
        try {
          const { data: gData, error: gError } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
          if (!gError && gData && gData.length > 0) {
            setGallery(gData);
          }

          const { data: eData, error: eError } = await supabase.from('events').select('*').order('created_at', { ascending: false });
          if (!eError && eData && eData.length > 0) {
            setEvents(eData);
          }
        } catch (error) {
          console.error("Error fetching from Supabase:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const addGalleryImage = async (image: GalleryImage) => {
    // Optimistic update
    setGallery([image, ...gallery]);
    if (supabase) {
      const { id, ...rest } = image; // Omit client-generated ID
      const { data, error } = await supabase.from('gallery').insert([rest]).select();
      if (!error && data) {
        // Replace with DB record to get real ID
        setGallery(prev => prev.map(img => img.id === image.id ? data[0] : img));
      } else {
        console.error("Failed to add image", error);
        setGallery(gallery); // Revert
      }
    }
  };

  const removeGalleryImage = async (id: string) => {
    const backup = [...gallery];
    setGallery(gallery.filter(img => img.id !== id));
    if (supabase) {
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (error) {
        console.error("Failed to delete image", error);
        setGallery(backup);
      }
    }
  };
  
  const addEvent = async (event: EventItem) => {
    setEvents([event, ...events]);
    if (supabase) {
      const { id, ...rest } = event;
      const { data, error } = await supabase.from('events').insert([rest]).select();
      if (!error && data) {
        setEvents(prev => prev.map(evt => evt.id === event.id ? data[0] : evt));
      } else {
        console.error("Failed to add event", error);
        setEvents(events); // Revert
      }
    }
  };

  const removeEvent = async (id: string) => {
    const backup = [...events];
    setEvents(events.filter(evt => evt.id !== id));
    if (supabase) {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) {
        console.error("Failed to delete event", error);
        setEvents(backup);
      }
    }
  };

  return (
    <DataContext.Provider value={{ gallery, events, addGalleryImage, removeGalleryImage, addEvent, removeEvent, isLoading }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
