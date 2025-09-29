import { useState } from 'react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline';

// SelectInput Component - MANDATORY PATTERN
const SelectInput = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  searchable = false,
  multiple = false,
  required = false,
  className = '',
  error = null
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = searchable 
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  const handleSelect = (option) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(option.value)
        ? currentValues.filter(v => v !== option.value)
        : [...currentValues, option.value];
      onChange(newValues);
    } else {
      onChange(option.value);
      setIsOpen(false);
    }
  };

  const handleRemove = (valueToRemove) => {
    const newValues = value.filter(v => v !== valueToRemove);
    onChange(newValues);
  };

  const getDisplayValue = () => {
    if (multiple) {
      if (!Array.isArray(value) || value.length === 0) return placeholder;
      return `${value.length} selected`;
    }
    
    const selectedOption = options.find(option => option.value === value);
    return selectedOption ? selectedOption.label : placeholder;
  };

  const isSelected = (optionValue) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(optionValue);
    }
    return value === optionValue;
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full h-10 px-3 text-left text-sm border rounded-md transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            ${error 
              ? 'border-red-300 focus:ring-red-500' 
              : 'border-gray-300 focus:ring-primary-500'
            }
            ${isOpen ? 'ring-2 ring-primary-500 border-primary-500' : ''}
          `}
        >
          <span className={`block truncate ${value ? 'text-gray-900' : 'text-gray-500'}`}>
            {getDisplayValue()}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            {searchable && (
              <div className="p-2 border-b border-gray-200">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search options..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            )}
            
            <div className="py-1">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500">No options found</div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    className={`
                      w-full text-left px-3 py-2 text-sm transition-colors duration-200
                      ${isSelected(option.value)
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-900 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option.label}</span>
                      {isSelected(option.value) && (
                        <CheckIcon className="h-4 w-4 text-primary-600" />
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {multiple && Array.isArray(value) && value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {value.map((selectedValue) => {
            const option = options.find(opt => opt.value === selectedValue);
            return (
              <span
                key={selectedValue}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-800"
              >
                {option?.label || selectedValue}
                <button
                  type="button"
                  onClick={() => handleRemove(selectedValue)}
                  className="ml-1 h-3 w-3 rounded-full hover:bg-primary-200 flex items-center justify-center"
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default SelectInput;
