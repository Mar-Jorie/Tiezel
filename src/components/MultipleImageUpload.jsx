import { useState } from 'react';
import { PhotoIcon, XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';

const MultipleImageUpload = ({ 
  value = [], 
  onChange, 
  label = 'Upload Images',
  required = false,
  className = '',
  maxImages = 10
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (files) => {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) return;

    // Check if adding these files would exceed the limit
    const currentCount = Array.isArray(value) ? value.length : 0;
    const remainingSlots = maxImages - currentCount;
    const filesToProcess = imageFiles.slice(0, remainingSlots);

    if (filesToProcess.length === 0) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    // Process each file
    const newImages = [];
    let processedCount = 0;

    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newImages.push(e.target.result);
        processedCount++;
        
        if (processedCount === filesToProcess.length) {
          const updatedImages = [...(Array.isArray(value) ? value : []), ...newImages];
          onChange(updatedImages);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
    // Reset the input so the same file can be selected again
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
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

  const removeImage = (indexToRemove) => {
    const updatedImages = value.filter((_, index) => index !== indexToRemove);
    onChange(updatedImages);
  };

  const images = Array.isArray(value) ? value : [];
  const canAddMore = images.length < maxImages;

  return (
    <div className={`space-y-2 relative z-10 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {/* Images Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Upload ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border border-gray-300"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
              <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {canAddMore && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragOver 
              ? 'border-primary-500 bg-primary-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={(e) => e.stopPropagation()}
        >
          <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-2">
            <label htmlFor="multiple-file-upload" className="cursor-pointer">
              <span className="text-sm font-medium text-primary-600 hover:text-primary-500">
                Click to upload
              </span>
              <span className="text-sm text-gray-500"> or drag and drop</span>
            </label>
            <input
              id="multiple-file-upload"
              name="multiple-file-upload"
              type="file"
              className="sr-only"
              accept="image/*"
              multiple
              onChange={handleFileInput}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            PNG, JPG, GIF up to 10MB each
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {images.length} / {maxImages} images uploaded
          </p>
        </div>
      )}

      {/* Max Images Reached Message */}
      {!canAddMore && (
        <div className="text-center py-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">
            Maximum {maxImages} images reached
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Remove some images to upload more
          </p>
        </div>
      )}
    </div>
  );
};

export default MultipleImageUpload;
