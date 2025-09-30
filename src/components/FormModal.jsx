import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import Button from './Button';
import InputFactory from './InputFactory';
import SelectInput from './SelectInput';
import CurrencyInput from './CurrencyInput';
import Calendar from './Calendar';
import ConfirmationModal from './ConfirmationModal';

const FormModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  fields = [],
  initialData = {},
  loading = false,
  isUpdate = false
}) => {
  const [formData, setFormData] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize form data
  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
      setHasChanges(false);
    }
  }, [isOpen, initialData]);

  // Check for changes
  useEffect(() => {
    if (isUpdate && formData && initialData) {
      const hasFormChanges = fields.some(field => {
        const fieldValue = formData[field.name];
        const initialValue = initialData[field.name];
        return fieldValue !== initialValue;
      });
      setHasChanges(hasFormChanges);
    } else {
      setHasChanges(true); // Create forms always have changes
    }
  }, [formData, initialData, isUpdate, fields]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  // Handle confirmation
  const handleConfirm = async () => {
    try {
      await onSubmit(formData);
      setShowConfirmModal(false);
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  // Handle field change
  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  // Render field based on type
  const renderField = (field) => {
    const commonProps = {
      value: formData ? (formData[field.name] || '') : '',
      onChange: (value) => handleFieldChange(field.name, value),
      className: field.className || ''
    };

    switch (field.type) {
      case 'String':
        return (
          <InputFactory
            key={field.name}
            fieldName={field.name}
            config={{
              type: 'String',
              label: field.label,
              placeholder: field.placeholder,
              required: field.required,
              format: field.format,
              showPasswordToggle: field.showPasswordToggle
            }}
            {...commonProps}
          />
        );

      case 'Number':
        return (
          <InputFactory
            key={field.name}
            fieldName={field.name}
            config={{
              type: 'Number',
              label: field.label,
              placeholder: field.placeholder,
              required: field.required
            }}
            {...commonProps}
          />
        );

      case 'Boolean':
        return (
          <InputFactory
            key={field.name}
            fieldName={field.name}
            config={{
              type: 'Boolean',
              label: field.label,
              required: field.required
            }}
            {...commonProps}
          />
        );

      case 'Date':
        return (
          <Calendar
            key={field.name}
            mode="single"
            value={formData && formData[field.name] ? new Date(formData[field.name]) : null}
            onChange={(date) => handleFieldChange(field.name, date)}
            placeholder={field.placeholder || 'Select date'}
            disabled={loading}
            className={field.className}
          />
        );

      case 'Currency':
        return (
          <CurrencyInput
            key={field.name}
            value={formData ? (formData[field.name] || { amount: '', currency: 'USD' }) : { amount: '', currency: 'USD' }}
            onChange={(value) => handleFieldChange(field.name, value)}
            label={field.label}
            placeholder={field.placeholder}
            required={field.required}
            disabled={loading}
            showLabel={true}
            className={field.className}
          />
        );

      case 'Select':
        return (
          <SelectInput
            key={field.name}
            label={field.label}
            options={field.options || []}
            value={formData ? (formData[field.name] || '') : ''}
            onChange={(value) => handleFieldChange(field.name, value)}
            placeholder={field.placeholder}
            searchable={field.searchable}
            multiple={field.multiple}
            required={field.required}
            className={field.className}
          />
        );

      default:
        return (
          <InputFactory
            key={field.name}
            fieldName={field.name}
            config={{
              type: 'String',
              label: field.label,
              placeholder: field.placeholder,
              required: field.required
            }}
            {...commonProps}
          />
        );
    }
  };

  // Check if form is valid
  const isFormValid = fields.every(field => {
    if (!field.required) return true;
    if (!formData) return false; // If formData is null/undefined, form is not valid
    const value = formData[field.name];
    if (field.type === 'Boolean') return true; // Boolean fields are always valid
    return value !== undefined && value !== null && value !== '';
  });

  // Check if button should be disabled
  const isButtonDisabled = loading || !isFormValid || !hasChanges;

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Backdrop */}
        <div className="fixed inset-0 z-40 transition-opacity bg-black/50" onClick={onClose}></div>
        
        {/* Modal Content */}
        <div className="relative z-50 w-full max-w-lg sm:max-w-xl overflow-hidden text-left transition-all transform bg-white shadow-xl rounded-xl flex flex-col max-h-[90vh]">
          {/* Fixed Header */}
          <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200 flex-shrink-0">
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable Content Area */}
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
            <div className="flex-1 overflow-y-auto scrollbar-hide px-6 py-4 space-y-4">
              {fields.map(renderField)}
            </div>

            {/* Fixed Footer */}
            <div className="p-6 pt-4 border-t border-gray-200 flex justify-end space-x-3 flex-shrink-0">
              <Button
                type="button"
                variant="secondaryOutline"
                size="sm"
                onClick={onClose}
                className="w-full"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="w-full"
                disabled={isButtonDisabled}
                loading={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <ArrowPathIcon className="h-4 w-4 animate-spin mr-2" />
                    {isUpdate ? 'Updating...' : 'Creating...'}
                  </div>
                ) : (
                  isUpdate ? 'Update' : 'Create'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirm}
        title={`Confirm ${isUpdate ? 'Update' : 'Creation'}`}
        message={`Are you sure you want to ${isUpdate ? 'update' : 'create'} this item?`}
        confirmLabel={isUpdate ? 'Update' : 'Create'}
        cancelLabel="Cancel"
        variant="info"
      />
    </div>,
    document.body
  );
};

export default FormModal;
