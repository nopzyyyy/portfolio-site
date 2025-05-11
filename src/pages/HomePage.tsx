import React, { useState, useEffect } from 'react';
import MasonryGrid from '../components/MasonryGrid';
import { useGalleryStore } from '../stores/galleryStore';
import { ArrowUp } from 'lucide-react';

const HomePage: React.FC = () => {
  const { photos } = useGalleryStore();
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="container mx-auto max-w-7xl px-4 pb-20">
      <header className="mb-8 mt-4 md:mt-0">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-3">
          Photo Gallery
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl">
          A collection of my best work. Click on any image to see more details, leave a rating, or add a comment.
        </p>
      </header>
      
      <MasonryGrid photos={photos} />
      
      {photos.length === 0 && (
        <div className="text-center py-20">
          <p className="text-neutral-600 dark:text-neutral-400">
            No photos available. Log in to the admin panel to add some!
          </p>
        </div>
      )}
      
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-20 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-full p-3 shadow-lg opacity-80 hover:opacity-100 transition-opacity"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default HomePage;