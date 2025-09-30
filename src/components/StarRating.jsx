import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';

const StarRating = ({ 
  value = 0, 
  onChange, 
  label = 'Rating', 
  required = false,
  maxStars = 5,
  className = '',
  disabled = false
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (rating) => {
    if (!disabled) {
      onChange(rating);
    }
  };

  const handleStarHover = (rating) => {
    if (!disabled) {
      setHoverRating(rating);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHoverRating(0);
    }
  };

  const displayRating = hoverRating || value;

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="flex items-center space-x-1">
        {[...Array(maxStars)].map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= displayRating;
          
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleStarClick(starValue)}
              onMouseEnter={() => handleStarHover(starValue)}
              onMouseLeave={handleMouseLeave}
              disabled={disabled}
              className={`
                transition-all duration-200 focus:outline-none rounded
                ${disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-110'}
                ${!disabled ? 'min-w-[44px] min-h-[44px]' : ''}
                ${value > 0 ? 'focus:ring-0' : 'focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'}
              `}
              aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
            >
              {isFilled ? (
                <StarIcon className="h-6 w-6 text-yellow-400" />
              ) : (
                <StarIconOutline className="h-6 w-6 text-gray-300 hover:text-yellow-300" />
              )}
            </button>
          );
        })}
        
        {value > 0 && (
          <span className="ml-2 text-sm text-gray-600">
            {value} star{value > 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  );
};

export default StarRating;
