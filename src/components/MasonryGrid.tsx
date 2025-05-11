import React from 'react';
import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';
import { Photo } from '../stores/galleryStore';
import { Star } from 'lucide-react';

interface MasonryGridProps {
  photos: Photo[];
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ photos }) => {
  const breakpointColumns = {
    default: 4,
    1280: 3,
    1024: 3,
    768: 2,
    640: 1
  };
  
  const getAverageRating = (ratings: { value: number }[]): number => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, curr) => acc + curr.value, 0);
    return Math.round((sum / ratings.length) * 10) / 10;
  };
  
  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="masonry-grid"
      columnClassName="masonry-grid-column"
    >
      {photos.map((photo) => (
        <div 
          key={photo.id} 
          className="mb-4 overflow-hidden rounded-xl card group animate-fade-in"
        >
          <Link to={`/photo/${photo.id}`} className="block relative">
            <div className="overflow-hidden">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white font-medium text-lg mb-1">{photo.title}</h3>
              <p className="text-white/80 text-sm line-clamp-2">{photo.description}</p>
            </div>
            
            {photo.ratings.length > 0 && (
              <div className="absolute top-3 right-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                <Star size={12} className="text-yellow-400 mr-1" />
                {getAverageRating(photo.ratings)}
              </div>
            )}
          </Link>
        </div>
      ))}
    </Masonry>
  );
};

export default MasonryGrid;