import { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  ChevronDownIcon,
  CalendarDaysIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Button from './Button';

const Calendar = ({ 
  mode = 'single', // 'single', 'range', 'datetime'
  value = null,
  onChange,
  placeholder = 'Select date',
  className = '',
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [selectedTime, setSelectedTime] = useState('12:00');
  const [tempRange, setTempRange] = useState({ start: null, end: null });
  
  const calendarRef = useRef(null);
  const yearDropdownRef = useRef(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const daysInMonth = getDaysInMonth(currentMonth);

  // Navigation
  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  // Date selection
  const handleDateClick = (date) => {
    if (!date) return;

    if (mode === 'single') {
      onChange(date);
      setIsOpen(false);
    } else if (mode === 'range') {
      if (!tempRange.start || (tempRange.start && tempRange.end)) {
        setTempRange({ start: date, end: null });
      } else {
        const start = tempRange.start;
        const end = date;
        if (start > end) {
          setTempRange({ start: end, end: start });
        } else {
          setTempRange({ start, end });
        }
        onChange({ start: start > end ? end : start, end: start > end ? start : end });
        setIsOpen(false);
      }
    } else if (mode === 'datetime') {
      const dateTime = new Date(date);
      const [hours, minutes] = selectedTime.split(':');
      dateTime.setHours(parseInt(hours), parseInt(minutes));
      onChange(dateTime);
      setIsOpen(false);
    }
  };

  // Time change
  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  // Clear range
  const handleClear = () => {
    setTempRange({ start: null, end: null });
    onChange({ start: null, end: null });
  };

  // Get display value
  const getDisplayValue = () => {
    if (mode === 'single') {
      return value ? value.toLocaleDateString() : placeholder;
    } else if (mode === 'range') {
      if (value?.start && value?.end) {
        return `${value.start.toLocaleDateString()} - ${value.end.toLocaleDateString()}`;
      } else if (value?.start) {
        return `${value.start.toLocaleDateString()} - `;
      }
      return placeholder;
    } else if (mode === 'datetime') {
      return value ? value.toLocaleString() : placeholder;
    }
    return placeholder;
  };

  // Check if date is selected
  const isSelected = (date) => {
    if (!date) return false;
    if (mode === 'single') {
      return value && date.toDateString() === value.toDateString();
    } else if (mode === 'range') {
      return (value?.start && date.toDateString() === value.start.toDateString()) ||
             (value?.end && date.toDateString() === value.end.toDateString());
    } else if (mode === 'datetime') {
      return value && date.toDateString() === value.toDateString();
    }
    return false;
  };

  // Check if date is in range
  const isInRange = (date) => {
    if (!date || mode !== 'range' || !value?.start || !value?.end) return false;
    return date >= value.start && date <= value.end;
  };

  // Check if date is today
  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
        setShowYearDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={calendarRef}>
      {/* Calendar Input Field */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-3 py-2 text-left text-sm border border-gray-300 rounded-md
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          transition-colors duration-200
          ${disabled 
            ? 'bg-gray-50 text-gray-400 cursor-not-allowed' 
            : 'bg-white text-gray-900 hover:border-gray-400 cursor-pointer'
          }
        `}
      >
        <div className="flex items-center justify-between">
          <span className={value ? 'text-gray-900' : 'text-gray-500'}>
            {getDisplayValue()}
          </span>
          <CalendarDaysIcon className="h-4 w-4 text-gray-400" />
        </div>
      </button>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {/* Header with Month Navigation */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => navigateMonth(-1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              
              {/* Month and Year Selection */}
              <div className="flex items-center space-x-2">
                <span className="text-base font-semibold text-gray-900">
                  {months[currentMonth.getMonth()]}
                </span>
                <div className="relative" ref={yearDropdownRef}>
                  <button 
                    onClick={() => setShowYearDropdown(!showYearDropdown)}
                    className="flex items-center space-x-1 hover:bg-gray-100 px-2 py-1 rounded"
                  >
                    <span>{currentMonth.getFullYear()}</span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                  
                  {/* Year Dropdown */}
                  {showYearDropdown && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[100px]">
                      <div className="py-1 max-h-40 overflow-y-auto">
                        {Array.from({ length: 20 }, (_, i) => {
                          const year = new Date().getFullYear() - 10 + i;
                          return (
                            <button
                              key={year}
                              onClick={() => {
                                setCurrentMonth(new Date(year, currentMonth.getMonth()));
                                setShowYearDropdown(false);
                              }}
                              className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                                year === currentMonth.getFullYear() ? 'bg-primary-50 text-primary-700' : 'text-gray-900'
                              }`}
                            >
                              {year}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <button 
                onClick={() => navigateMonth(1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="p-4">
            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1 mb-3">
              {days.map(day => (
                <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {daysInMonth.map((date, index) => (
                <button
                  key={index}
                  onClick={() => handleDateClick(date)}
                  disabled={!date}
                  className={`
                    h-8 w-8 text-sm rounded-md transition-colors duration-200 flex items-center justify-center
                    ${!date ? 'cursor-default' : 'cursor-pointer'}
                    ${isSelected(date) ? 'bg-primary-600 text-white font-semibold' : 
                      isInRange(date) ? 'bg-primary-100 text-primary-700 font-medium' :
                      isToday(date) ? 'bg-gray-100 text-gray-900 font-semibold' :
                      date ? 'text-gray-700 hover:bg-gray-100 font-medium' : 'text-gray-300'}
                  `}
                >
                  {date ? date.getDate() : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection (for datetime mode) */}
          {mode === 'datetime' && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <ClockIcon className="h-4 w-4 text-gray-400" />
                <label className="text-sm font-medium text-gray-700">Time:</label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
            <Button variant="secondaryOutline" size="sm" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            {mode === 'range' && tempRange.start && !tempRange.end && (
              <Button variant="primary" size="sm" onClick={handleClear}>
                Clear
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
