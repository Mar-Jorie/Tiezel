import { useState } from 'react';
import { EyeIcon, EyeSlashIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

// InputFactory Component - MANDATORY PATTERN
export default function InputFactory({ fieldName, config, value, onChange, className = '' }) {
  const {
    type = 'String',
    label,
    placeholder,
    required = false,
    format,
    showPasswordToggle = false,
    ...otherProps
  } = config;

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    let newValue = e.target.value;
    
    if (type === 'Number') {
      newValue = newValue === '' ? '' : parseFloat(newValue);
      if (isNaN(newValue)) return;
    } else if (type === 'Boolean') {
      newValue = e.target.checked;
    }
    
    // Clear error when user starts typing
    if (error) setError(null);
    
    onChange(newValue);
  };

  const validateField = () => {
    if (required && (!value || value === '')) {
      setError(`${label || fieldName} is required`);
      return false;
    }
    
    if (format === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError('Please enter a valid email address');
        return false;
      }
    }
    
    setError(null);
    return true;
  };

  const handleBlur = () => {
    validateField();
  };

  const inputId = `field-${fieldName}`;
  const commonProps = {
    id: inputId,
    name: fieldName,
    value: value || '',
    onChange: handleChange,
    onBlur: handleBlur,
    className: `w-full h-10 px-3 border border-gray-300 rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${error ? 'border-red-300 focus:ring-red-500' : ''} ${className}`,
    placeholder: placeholder || `Enter ${label || fieldName}`,
    required: required,
    ...otherProps
  };

  const renderInput = () => {
    if (type === 'Boolean') {
      return (
        <div className="flex items-center">
          <input
            {...commonProps}
            type="checkbox"
            checked={value || false}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor={inputId} className="ml-2 block text-sm text-gray-700">
            {label || fieldName}
          </label>
        </div>
      );
    }

    if (format === 'password' || showPasswordToggle) {
      return (
        <div className="relative">
          <input
            {...commonProps}
            type={showPassword ? 'text' : 'password'}
            className={`${commonProps.className} pr-10`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeSlashIcon className="h-4 w-4 text-gray-400" />
            ) : (
              <EyeIcon className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
      );
    }

    if (type === 'Number') {
      return (
        <input
          {...commonProps}
          type="number"
          step="any"
        />
      );
    }

    if (format === 'email') {
      return (
        <input
          {...commonProps}
          type="email"
        />
      );
    }

    if (type === 'Date') {
      return (
        <input
          {...commonProps}
          type="date"
        />
      );
    }

    // Default text input
    return (
      <input
        {...commonProps}
        type="text"
      />
    );
  };

  return (
    <div>
      {type !== 'Boolean' && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label || fieldName}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {renderInput()}
      
      {error && (
        <div className="mt-1 flex items-center">
          <ExclamationCircleIcon className="h-4 w-4 text-red-500 mr-1" />
          <span className="text-sm text-red-600">{error}</span>
        </div>
      )}
    </div>
  );
}
