import { useState } from 'react';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import Calendar from './Calendar';

const DateRangeFilter = ({ 
  value = { start: null, end: null }, 
  onChange, 
  label = 'Date Range',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateRangeChange = (dateRange) => {
    onChange(dateRange);
    if (dateRange.start && dateRange.end) {
      setIsOpen(false);
    }
  };

  const getDisplayValue = () => {
    if (value?.start && value?.end) {
      return `${value.start.toLocaleDateString()} - ${value.end.toLocaleDateString()}`;
    } else if (value?.start) {
      return `${value.start.toLocaleDateString()} - `;
    }
    return 'Select date range';
  };

  return (
    <div className={`space-y-1 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 text-left text-sm border border-gray-300 rounded-md bg-white text-gray-900 hover:border-gray-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
        >
          <div className="flex items-center justify-between">
            <span className={value?.start && value?.end ? 'text-gray-900' : 'text-gray-500'}>
              {getDisplayValue()}
            </span>
            <CalendarDaysIcon className="h-4 w-4 text-gray-400" />
          </div>
        </button>

        {/* Date Range Calendar */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-4">
              <Calendar
                mode="range"
                value={value}
                onChange={handleDateRangeChange}
                placeholder="Select date range"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangeFilter;
