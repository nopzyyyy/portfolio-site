import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  initialRating?: number;
  onChange: (rating: number) => void;
  readOnly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ initialRating = 0, onChange, readOnly = false }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  
  const handleClick = (value: number) => {
    if (readOnly) return;
    setRating(value);
    onChange(value);
  };
  
  const handleMouseEnter = (value: number) => {
    if (readOnly) return;
    setHoverRating(value);
  };
  
  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverRating(0);
  };
  
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          disabled={readOnly}
          className={`p-1 ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
          aria-label={`${star} star${star !== 1 ? 's' : ''}`}
        >
          <Star
            size={24}
            className={`
              ${
                (hoverRating || rating) >= star
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-neutral-300 dark:text-neutral-600'
              }
              transition-colors duration-150
            `}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;