import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Download, Share2 } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { newsArticles } from '../data/news';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

type GalleryTab = 'all' | 'news' | 'events' | 'programs';

interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: GalleryTab;
  description?: string;
}

export default function Gallery() {
  const { gallery } = useData();
  const [activeTab, setActiveTab] = useState<GalleryTab>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // Categorize gallery items
  const newsImages: GalleryItem[] = newsArticles.map((article) => ({
    id: article.id,
    url: article.image,
    title: article.title,
    category: 'news',
    description: article.summary,
  }));

  const eventImages: GalleryItem[] = gallery.filter((img) =>
    img.title.toLowerCase().includes('event') || img.title.toLowerCase().includes('seminar')
  ).map((img) => ({
    ...img,
    category: 'events' as GalleryTab,
  }));

  const programImages: GalleryItem[] = gallery.filter((img) =>
    img.title.toLowerCase().includes('program') || 
    img.title.toLowerCase().includes('capacity') ||
    img.title.toLowerCase().includes('training')
  ).map((img) => ({
    ...img,
    category: 'programs' as GalleryTab,
  }));

  // Combine all gallery items
  const allGalleryItems: GalleryItem[] = [
    ...newsImages,
    ...eventImages,
    ...programImages,
    ...gallery
      .filter(
        (img) =>
          !newsImages.some((ni) => ni.id === img.id) &&
          !eventImages.some((ei) => ei.id === img.id) &&
          !programImages.some((pi) => pi.id === img.id)
      )
      .map((img) => ({ ...img, category: 'all' as GalleryTab })),
  ];

  // Filter images based on active tab
  const filteredImages =
    activeTab === 'all'
      ? allGalleryItems
      : allGalleryItems.filter((img) => img.category === activeTab);

  const tabs: { id: GalleryTab; label: string; count: number }[] = [
    { id: 'all', label: 'All Images', count: allGalleryItems.length },
    { id: 'news', label: 'News & Updates', count: newsImages.length },
    { id: 'events', label: 'Events & Seminars', count: eventImages.length },
    { id: 'programs', label: 'Programs & Training', count: programImages.length },
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 border-b-8 border-gold">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 to-slate-900"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-3xl mx-auto">
            <div className="inline-flex items-center text-gold text-xs font-bold uppercase tracking-widest mb-6 border-b border-gold pb-1 px-1">
              Visual Highlights
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-6">
              Image Gallery
            </h1>
            <p className="text-lg text-slate-100/90 leading-relaxed">
              Explore visual highlights from our events, programmes, institutional engagements, and capacity-building initiatives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="sticky top-20 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
                <span className="ml-2 text-xs">({tab.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredImages.length > 0 ? (
                filteredImages.map((image, idx) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    onClick={() => setSelectedImage(image)}
                    className="group relative overflow-hidden rounded-lg cursor-pointer bg-slate-100 aspect-square"
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-white text-sm font-bold line-clamp-2 mb-3">{image.title}</h3>
                      <div className="flex gap-2">
                        <button className="p-2 bg-white/20 hover:bg-white/30 rounded-md transition-colors backdrop-blur-sm">
                          <Share2 className="w-4 h-4 text-white" />
                        </button>
                        <a
                          href={image.url}
                          download
                          className="p-2 bg-white/20 hover:bg-white/30 rounded-md transition-colors backdrop-blur-sm"
                        >
                          <Download className="w-4 h-4 text-white" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-slate-600 text-lg">No images available in this category.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Modal for Full Image View */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-lg overflow-hidden max-w-4xl max-h-[90vh] w-full"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-slate-900/50 hover:bg-slate-900/70 rounded-md transition-colors"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex flex-col md:flex-row h-full">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full md:w-2/3 h-auto md:h-full object-cover"
                />
                <div className="w-full md:w-1/3 p-6 bg-slate-50 flex flex-col justify-between">
                  <div>
                    <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full mb-4">
                      {selectedImage.category.charAt(0).toUpperCase() + selectedImage.category.slice(1)}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-serif text-slate-900 mb-4">
                      {selectedImage.title}
                    </h2>
                    {selectedImage.description && (
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        {selectedImage.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-3 pt-6 border-t border-slate-200">
                    <button className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-sm transition-colors flex items-center justify-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                    <a
                      href={selectedImage.url}
                      download
                      className="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 text-sm font-bold rounded-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
