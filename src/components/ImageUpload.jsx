import { useState } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ImageUpload = ({ 
  value = '', 
  onChange, 
  label = 'Upload Image',
  required = false,
  className = ''
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const removeImage = () => {
    onChange('');
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Upload preview"
            className="w-full h-32 object-cover rounded-lg border border-gray-300"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragOver 
              ? 'border-primary-500 bg-primary-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-2">
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-sm font-medium text-primary-600 hover:text-primary-500">
                Click to upload
              </span>
              <span className="text-sm text-gray-500"> or drag and drop</span>
            </label>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              accept="image/*"
              onChange={handleFileInput}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
