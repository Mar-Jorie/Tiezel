import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowPathIcon, 
  CheckIcon, 
  PencilIcon,
  EyeIcon,
  TrashIcon,
  PlusIcon,
  HomeIcon,
  BuildingOfficeIcon,
  CogIcon,
  ShoppingBagIcon,
  StarIcon,
  PhotoIcon,
  XMarkIcon,
  PhoneIcon,
  TruckIcon,
  HeartIcon,
  ShieldCheckIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  MapPinIcon,
  AcademicCapIcon,
  BeakerIcon,
  BoltIcon,
  BookOpenIcon,
  EyeIcon as PreviewIcon,
  BriefcaseIcon,
  CameraIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  FireIcon,
  GiftIcon,
  HandThumbUpIcon,
  LightBulbIcon,
  MusicalNoteIcon,
  PaintBrushIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
  SparklesIcon,
  SunIcon,
  TagIcon,
  TrophyIcon,
  WrenchScrewdriverIcon,
  Bars3Icon,
  MegaphoneIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import Button from '../components/Button';
import InputFactory from '../components/InputFactory';
import SelectInput from '../components/SelectInput';
import { useApp } from '../hooks/useApp';
import { toast } from 'react-hot-toast';
import SmartFloatingActionButton from '../components/SmartFloatingActionButton';
import LandingPagePreview from '../components/LandingPagePreview';
import ConfirmationModal from '../components/ConfirmationModal';

const ContentManagement = () => {
  const { isAdmin, landingPageContent, updateLandingPageContent } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('company');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(landingPageContent);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addModalType, setAddModalType] = useState('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Update form data when landing page content changes
  useEffect(() => {
    setFormData(landingPageContent);
    setHasChanges(false); // Reset changes when content is updated
  }, [landingPageContent]);

  // Track changes in form data
  useEffect(() => {
    const hasFormChanges = JSON.stringify(formData) !== JSON.stringify(landingPageContent);
    setHasChanges(hasFormChanges);
  }, [formData, landingPageContent]);

  // Available icons for selection
  const availableIcons = [
    { name: 'ShoppingBagIcon', component: ShoppingBagIcon, label: 'Shopping Bag' },
    { name: 'PhoneIcon', component: PhoneIcon, label: 'Phone' },
    { name: 'TruckIcon', component: TruckIcon, label: 'Truck' },
    { name: 'StarIcon', component: StarIcon, label: 'Star' },
    { name: 'HeartIcon', component: HeartIcon, label: 'Heart' },
    { name: 'ShieldCheckIcon', component: ShieldCheckIcon, label: 'Shield' },
    { name: 'ClockIcon', component: ClockIcon, label: 'Clock' },
    { name: 'UserGroupIcon', component: UserGroupIcon, label: 'Users' },
    { name: 'ChartBarIcon', component: ChartBarIcon, label: 'Chart' },
    { name: 'GlobeAltIcon', component: GlobeAltIcon, label: 'Globe' },
    { name: 'EnvelopeIcon', component: EnvelopeIcon, label: 'Envelope' },
    { name: 'MapPinIcon', component: MapPinIcon, label: 'Location' },
    { name: 'AcademicCapIcon', component: AcademicCapIcon, label: 'Education' },
    { name: 'BeakerIcon', component: BeakerIcon, label: 'Science' },
    { name: 'BoltIcon', component: BoltIcon, label: 'Lightning' },
    { name: 'BookOpenIcon', component: BookOpenIcon, label: 'Book' },
    { name: 'BriefcaseIcon', component: BriefcaseIcon, label: 'Briefcase' },
    { name: 'CameraIcon', component: CameraIcon, label: 'Camera' },
    { name: 'ComputerDesktopIcon', component: ComputerDesktopIcon, label: 'Desktop' },
    { name: 'DevicePhoneMobileIcon', component: DevicePhoneMobileIcon, label: 'Mobile' },
    { name: 'FireIcon', component: FireIcon, label: 'Fire' },
    { name: 'GiftIcon', component: GiftIcon, label: 'Gift' },
    { name: 'HandThumbUpIcon', component: HandThumbUpIcon, label: 'Thumbs Up' },
    { name: 'LightBulbIcon', component: LightBulbIcon, label: 'Light Bulb' },
    { name: 'MusicalNoteIcon', component: MusicalNoteIcon, label: 'Music' },
    { name: 'PaintBrushIcon', component: PaintBrushIcon, label: 'Paint' },
    { name: 'PuzzlePieceIcon', component: PuzzlePieceIcon, label: 'Puzzle' },
    { name: 'RocketLaunchIcon', component: RocketLaunchIcon, label: 'Rocket' },
    { name: 'SparklesIcon', component: SparklesIcon, label: 'Sparkles' },
    { name: 'SunIcon', component: SunIcon, label: 'Sun' },
    { name: 'TagIcon', component: TagIcon, label: 'Tag' },
    { name: 'TrophyIcon', component: TrophyIcon, label: 'Trophy' },
    { name: 'WrenchScrewdriverIcon', component: WrenchScrewdriverIcon, label: 'Tools' }
  ];

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  // Initialize form data when content changes
  useEffect(() => {
    setFormData(landingPageContent);
  }, [landingPageContent]);

  const handleChange = (section, field, value) => {
    const updatedData = {
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value
      }
    };
    
    // Update local state only
    setFormData(updatedData);
  };

  const handleArrayChange = (section, index, field, value) => {
    const updatedData = {
      ...formData,
      [section]: formData[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    };
    
    // Update local state only
    setFormData(updatedData);
  };


  const handleRemoveItem = (section, index) => {
    const updatedData = {
      ...formData,
      [section]: formData[section].filter((_, i) => i !== index)
    };
    
    // Update local state only
    setFormData(updatedData);
  };

  const handleSave = () => {
    setShowSaveConfirm(true);
  };

  const handleConfirmSave = async () => {
    setShowSaveConfirm(false);
    setLoading(true);
    try {
      await updateLandingPageContent(formData);
      toast.success('Content updated successfully!');
      setHasChanges(false); // Reset changes after successful save
    } catch {
      toast.error('Failed to update content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(landingPageContent);
    setHasChanges(false);
    toast.success('Changes reset to original values');
  };

  const handleAddItem = (type, newItem = null) => {
    if (newItem) {
      // Add the item directly
      setFormData(prev => ({
        ...prev,
        [type]: [...(prev[type] || []), newItem]
      }));
    } else {
      // Open modal for adding new item
      setAddModalType(type);
      setShowAddModal(true);
    }
  };

  const getModalFields = (type) => {
    switch (type) {
      case 'services':
        return [
          {
            fieldName: 'title',
            config: {
              type: 'String',
              label: 'Service Title',
              placeholder: 'Enter service title',
              required: true
            }
          },
          {
            fieldName: 'description',
            config: {
              type: 'Textarea',
              label: 'Service Description',
              placeholder: 'Enter service description',
              required: true
            }
          },
          {
            fieldName: 'icon',
            config: {
              type: 'String',
              label: 'Icon',
              placeholder: 'Enter icon name',
              required: true
            }
          }
        ];
      case 'products':
        return [
          {
            fieldName: 'name',
            config: {
              type: 'String',
              label: 'Product Name',
              placeholder: 'Enter product name',
              required: true
            }
          },
          {
            fieldName: 'price',
            config: {
              type: 'Currency',
              label: 'Price',
              placeholder: 'Enter product price',
              required: true
            }
          },
          {
            fieldName: 'description',
            config: {
              type: 'Textarea',
              label: 'Product Description',
              placeholder: 'Enter product description',
              required: true
            }
          },
          {
            fieldName: 'image',
            config: {
              type: 'FileUpload',
              label: 'Product Image',
              required: true
            }
          }
        ];
      case 'testimonials':
        return [
          {
            fieldName: 'name',
            config: {
              type: 'String',
              label: 'Customer Name',
              placeholder: 'Enter customer name',
              required: true
            }
          },
          {
            fieldName: 'company',
            config: {
              type: 'String',
              label: 'Company',
              placeholder: 'Enter company name',
              required: true
            }
          },
          {
            fieldName: 'text',
            config: {
              type: 'Textarea',
              label: 'Testimonial Text',
              placeholder: 'Enter testimonial text',
              required: true
            }
          },
          {
            fieldName: 'rating',
            config: {
              type: 'StarRating',
              label: 'Rating',
              required: true
            }
          }
        ];
      default:
        return [];
    }
  };

  // Image upload handler
  const handleImageUpload = (section, field, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleChange(section, field, e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Icon selection component
  const IconSelector = ({ value, onChange, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedIcon = availableIcons.find(icon => icon.name === value);

    return (
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm text-left bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            {selectedIcon ? (
              <>
                <selectedIcon.component className="h-4 w-4 text-gray-600" />
                <span>{selectedIcon.label}</span>
              </>
            ) : (
              <span className="text-gray-500">Select an icon</span>
            )}
          </div>
          <ArrowPathIcon className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
            <div className="p-2">
              <div className="grid grid-cols-4 gap-2">
                {availableIcons.map((icon) => (
                  <button
                    key={icon.name}
                    onClick={() => {
                      onChange(icon.name);
                      setIsOpen(false);
                    }}
                    className={`p-2 rounded-md hover:bg-gray-100 flex flex-col items-center space-y-1 ${
                      value === icon.name ? 'bg-primary-50 border border-primary-200' : ''
                    }`}
                  >
                    <icon.component className="h-5 w-5 text-gray-600" />
                    <span className="text-xs text-gray-600">{icon.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Image upload component
  const ImageUpload = ({ value, onChange, label, accept = "image/*" }) => {
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          onChange(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <div className="flex items-center space-x-4">
          {value && (
            <div className="relative">
              <img src={value} alt="Preview" className="w-16 h-16 object-cover rounded-md border border-gray-200" />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          )}
          <div className="flex-1">
            <input
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
              id={`file-${label.replace(/\s+/g, '-').toLowerCase()}`}
            />
            <label
              htmlFor={`file-${label.replace(/\s+/g, '-').toLowerCase()}`}
              className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent flex items-center justify-center cursor-pointer"
            >
              <PhotoIcon className="h-4 w-4 mr-2" />
              {value ? 'Change Image' : 'Upload Image'}
            </label>
          </div>
        </div>
      </div>
    );
  };

  if (!isAdmin) {
    return null;
  }

  const tabs = [
    { id: 'company', name: 'Company Info', icon: BuildingOfficeIcon },
    { id: 'hero', name: 'Hero Section', icon: HomeIcon },
    { id: 'services', name: 'Services', icon: CogIcon },
    { id: 'products', name: 'Products', icon: ShoppingBagIcon },
    { id: 'testimonials', name: 'Testimonials', icon: StarIcon },
    { id: 'sections', name: 'Section Headers', icon: DocumentTextIcon }
  ];

  const renderTabContent = () => {
    switch (activeTab) {

      case 'hero':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Hero Section</h3>
            <div className="space-y-6">
              {/* Title and Subtitle - Two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputFactory
                fieldName="title"
                config={{
                  type: 'String',
                  label: 'Main Title',
                  placeholder: 'Enter main title',
                  required: true
                }}
                value={formData.hero?.title || ''}
                onChange={(value) => handleChange('hero', 'title', value)}
              />
              <InputFactory
                fieldName="subtitle"
                config={{
                  type: 'String',
                  label: 'Subtitle',
                  placeholder: 'Enter subtitle',
                  required: true
                }}
                value={formData.hero?.subtitle || ''}
                onChange={(value) => handleChange('hero', 'subtitle', value)}
              />
              </div>
              
              
              {/* Hero Visual Section */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-4">Hero Visual Section</h4>
                
                {/* Visual Title and Subtitle */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputFactory
                    fieldName="visualTitle"
                    config={{
                      type: 'String',
                      label: 'Visual Title',
                      placeholder: 'Enter visual title (e.g., Your Store)',
                      required: true
                    }}
                    value={formData.hero?.visualTitle || ''}
                    onChange={(value) => handleChange('hero', 'visualTitle', value)}
                  />
                  <InputFactory
                    fieldName="visualSubtitle"
                    config={{
                      type: 'String',
                      label: 'Visual Subtitle',
                      placeholder: 'Enter visual subtitle',
                      required: true
                    }}
                    value={formData.hero?.visualSubtitle || ''}
                    onChange={(value) => handleChange('hero', 'visualSubtitle', value)}
                  />
                </div>
                
                {/* Hero Icon */}
                <div className="mt-6">
                  <IconSelector
                    value={formData.hero?.heroIcon || 'ShoppingBagIcon'}
                    onChange={(value) => handleChange('hero', 'heroIcon', value)}
                    label="Hero Icon"
                  />
                </div>
              </div>
              
            </div>
          </div>
        );

      case 'company':
        return (
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-gray-900">Company Information</h3>
            
            {/* Logo - Full width */}
            <InputFactory
              fieldName="logo"
              config={{
                type: 'FileUpload',
                label: 'Company Logo',
                required: true
              }}
              value={formData.branding?.logo || ''}
              onChange={(value) => handleChange('branding', 'logo', value)}
            />
            
            {/* Name and Phone - Two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputFactory
                fieldName="name"
                config={{
                  type: 'String',
                  label: 'Company Name',
                  placeholder: 'Enter company name',
                  required: true
                }}
                value={formData.company?.name || ''}
                onChange={(value) => handleChange('company', 'name', value)}
              />
              <InputFactory
                fieldName="phone"
                config={{
                  type: 'String',
                  label: 'Phone Number',
                  placeholder: 'Enter phone number',
                  required: true
                }}
                value={formData.company?.phone || ''}
                onChange={(value) => handleChange('company', 'phone', value)}
              />
            </div>
            
            {/* Primary Brand Color and Email - Two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Color picker */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Primary Brand Color
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={formData.branding?.primaryColor || '#6589a4'}
                    onChange={(e) => handleChange('branding', 'primaryColor', e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded-md cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.branding?.primaryColor || '#6589a4'}
                    onChange={(e) => handleChange('branding', 'primaryColor', e.target.value)}
                    placeholder="#6589a4"
                    className="flex-1 h-10 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              {/* Email */}
              <InputFactory
                fieldName="email"
                config={{
                  type: 'String',
                  label: 'Email Address',
                  placeholder: 'Enter email address',
                  required: true,
                  format: 'email'
                }}
                value={formData.company?.email || ''}
                onChange={(value) => handleChange('company', 'email', value)}
              />
            </div>
            
            {/* Company Tagline - Full width */}
            <InputFactory
              fieldName="tagline"
              config={{
                type: 'String',
                label: 'Company Tagline',
                placeholder: 'Enter company tagline',
                required: false
              }}
              value={formData.branding?.tagline || ''}
              onChange={(value) => handleChange('branding', 'tagline', value)}
            />
            
            {/* Address - Full width */}
              <InputFactory
                fieldName="address"
                config={{
                  type: 'String',
                  label: 'Address',
                  placeholder: 'Enter business address',
                  required: true
                }}
                value={formData.company?.address || ''}
                onChange={(value) => handleChange('company', 'address', value)}
              />
            
            {/* Description - Full width */}
                <InputFactory
                  fieldName="description"
                  config={{
                type: 'Textarea',
                    label: 'Company Description',
                    placeholder: 'Enter company description',
                    required: true
                  }}
                  value={formData.company?.description || ''}
                  onChange={(value) => handleChange('company', 'description', value)}
                />
            
            {/* Business Hours - Full width */}
              <InputFactory
                fieldName="hours"
                config={{
                  type: 'String',
                  label: 'Business Hours',
                  placeholder: 'Enter business hours',
                  required: true
                }}
                value={formData.company?.hours || ''}
                onChange={(value) => handleChange('company', 'hours', value)}
              />
            
            {/* Mission and Vision Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Mission & Vision</h4>
              
              {/* Mission */}
              <div className="mb-6">
                <InputFactory
                  fieldName="missionDescription"
                  config={{
                    type: 'Textarea',
                    label: 'Mission Description',
                    placeholder: 'e.g., To provide innovative technology solutions...',
                    required: true
                  }}
                  value={formData.about?.missionDescription || 'To provide innovative technology solutions that empower businesses and individuals to achieve their goals through reliable, high-quality products and exceptional customer service.'}
                  onChange={(value) => handleChange('about', 'missionDescription', value)}
                />
              </div>
              
              {/* Vision */}
              <div>
                <InputFactory
                  fieldName="visionDescription"
                  config={{
                    type: 'Textarea',
                    label: 'Vision Description',
                    placeholder: 'e.g., To be the leading technology partner...',
                    required: true
                  }}
                  value={formData.about?.visionDescription || 'To be the leading technology partner that bridges the gap between cutting-edge innovation and practical business solutions, creating a world where technology serves humanity seamlessly.'}
                  onChange={(value) => handleChange('about', 'visionDescription', value)}
                />
              </div>
            </div>
            
            {/* Company Story Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Company Story</h4>
              <div className="grid grid-cols-1 gap-6">
                <InputFactory
                  fieldName="companyDescription"
                  config={{
                    type: 'Textarea',
                    label: 'Story Part 1 - The Beginning',
                    placeholder: 'e.g., It all started in a small garage in 2020, where three friends...',
                    required: true
                  }}
                  value={formData.company?.description || 'It all started in a small garage in 2020, where three friends with a shared passion for technology came together with a simple dream: to make cutting-edge technology accessible to everyone. What began as weekend projects and late-night coding sessions quickly evolved into something much bigger.'}
                  onChange={(value) => handleChange('company', 'description', value)}
                />
                <InputFactory
                  fieldName="companyStoryPart2"
                  config={{
                    type: 'Textarea',
                    label: 'Story Part 2 - The Breakthrough',
                    placeholder: 'e.g., Our first breakthrough came when we helped a local business...',
                    required: true
                  }}
                  value={formData.company?.storyPart2 || 'Our first breakthrough came when we helped a local business digitize their operations during the pandemic. Word spread quickly, and soon we found ourselves working with dozens of companies, each with unique challenges and opportunities. We learned that technology isn\'t just about the latest gadgets—it\'s about understanding people\'s needs and crafting solutions that truly work.'}
                  onChange={(value) => handleChange('company', 'storyPart2', value)}
                />
                <InputFactory
                  fieldName="companyStoryPart3"
                  config={{
                    type: 'Textarea',
                    label: 'Story Part 3 - The Present',
                    placeholder: 'e.g., Today, we\'ve grown from that small garage into a trusted partner...',
                    required: true
                  }}
                  value={formData.company?.storyPart3 || 'Today, we\'ve grown from that small garage into a trusted partner for thousands of businesses worldwide. But we\'ve never forgotten our roots. Every product we recommend, every solution we provide, carries the same attention to detail and personal care that started it all. We\'re not just selling technology—we\'re building relationships and helping dreams become reality.'}
                  onChange={(value) => handleChange('company', 'storyPart3', value)}
                />
              </div>
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Services</h3>
            </div>
            <div className="space-y-4">
              {formData.services?.map((service, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Service {index + 1}</h4>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveItem('services', index)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* Title and Icon - Two columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputFactory
                      fieldName={`service-${index}-title`}
                      config={{
                        type: 'String',
                        label: 'Title',
                        placeholder: 'Enter service title',
                        required: true
                      }}
                      value={service.title}
                      onChange={(value) => handleArrayChange('services', index, 'title', value)}
                    />
                    <IconSelector
                      value={service.icon}
                      onChange={(value) => handleArrayChange('services', index, 'icon', value)}
                      label="Icon"
                    />
                  </div>
                  
                  {/* Description - Full width */}
                  <div className="mt-6">
                    <InputFactory
                      fieldName={`service-${index}-description`}
                      config={{
                        type: 'Textarea',
                        label: 'Description',
                        placeholder: 'Enter service description',
                        required: true
                      }}
                      value={service.description}
                      onChange={(value) => handleArrayChange('services', index, 'description', value)}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Why Choose Us Features Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Why Choose Us Features</h4>
              <div className="space-y-4">
                {formData.about?.whyChooseFeatures?.map((feature, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="font-medium text-gray-900">Feature {index + 1}</h5>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveItem('about.whyChooseFeatures', index)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputFactory
                        fieldName={`whyChooseFeature-${index}-title`}
                        config={{
                          type: 'String',
                          label: 'Feature Title',
                          placeholder: 'e.g., Quality Products',
                          required: true
                        }}
                        value={feature.title}
                        onChange={(value) => handleArrayChange('about.whyChooseFeatures', index, 'title', value)}
                      />
                      <InputFactory
                        fieldName={`whyChooseFeature-${index}-description`}
                        config={{
                          type: 'String',
                          label: 'Feature Description',
                          placeholder: 'e.g., Carefully selected items from trusted brands',
                          required: true
                        }}
                        value={feature.description}
                        onChange={(value) => handleArrayChange('about.whyChooseFeatures', index, 'description', value)}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  variant="primaryOutline"
                  size="sm"
                  onClick={() => handleAddItem('about.whyChooseFeatures', { title: '', description: '' })}
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </div>
            </div>

          </div>
        );

      case 'products':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Featured Products</h3>
            </div>
            <div className="space-y-4">
              {formData.products?.map((product, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Product {index + 1}</h4>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveItem('products', index)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* Name and Price - Two columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputFactory
                      fieldName={`product-${index}-name`}
                      config={{
                        type: 'String',
                        label: 'Product Name',
                        placeholder: 'Enter product name',
                        required: true
                      }}
                      value={product.name}
                      onChange={(value) => handleArrayChange('products', index, 'name', value)}
                    />
                    <InputFactory
                      fieldName={`product-${index}-price`}
                      config={{
                        type: 'Currency',
                        label: 'Price',
                        placeholder: 'Enter price',
                        required: true
                      }}
                      value={product.price}
                      onChange={(value) => handleArrayChange('products', index, 'price', value)}
                    />
                  </div>
                  
                  {/* Description - Full width */}
                  <div className="mt-6">
                      <InputFactory
                        fieldName={`product-${index}-description`}
                        config={{
                        type: 'Textarea',
                          label: 'Description',
                          placeholder: 'Enter product description',
                          required: true
                        }}
                        value={product.description}
                        onChange={(value) => handleArrayChange('products', index, 'description', value)}
                      />
                    </div>
                  
                  {/* Product Image - Full width */}
                  <div className="mt-6">
                    <InputFactory
                      fieldName={`product-${index}-image`}
                      config={{
                        type: 'FileUpload',
                        label: 'Product Image',
                        required: true
                      }}
                      value={product.image || ''}
                      onChange={(value) => handleArrayChange('products', index, 'image', value)}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        );

      case 'testimonials':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Customer Testimonials</h3>
            </div>
            <div className="space-y-4">
              {formData.testimonials?.map((testimonial, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Testimonial {index + 1}</h4>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveItem('testimonials', index)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputFactory
                      fieldName={`testimonial-${index}-name`}
                      config={{
                        type: 'String',
                        label: 'Customer Name',
                        placeholder: 'Enter customer name',
                        required: true
                      }}
                      value={testimonial.name}
                      onChange={(value) => handleArrayChange('testimonials', index, 'name', value)}
                    />
                    <InputFactory
                      fieldName={`testimonial-${index}-company`}
                      config={{
                        type: 'String',
                        label: 'Company',
                        placeholder: 'Enter company name',
                        required: true
                      }}
                      value={testimonial.company}
                      onChange={(value) => handleArrayChange('testimonials', index, 'company', value)}
                    />
                    <div className="md:col-span-2">
                      <InputFactory
                        fieldName={`testimonial-${index}-text`}
                        config={{
                          type: 'Textarea',
                          label: 'Testimonial Text',
                          placeholder: 'Enter testimonial text',
                          required: true
                        }}
                        value={testimonial.text}
                        onChange={(value) => handleArrayChange('testimonials', index, 'text', value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <InputFactory
                        fieldName={`testimonial-${index}-rating`}
                        config={{
                          type: 'StarRating',
                          label: 'Rating',
                          required: true
                        }}
                      value={testimonial.rating}
                      onChange={(value) => handleArrayChange('testimonials', index, 'rating', value)}
                    />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        );

      case 'sections':
        return (
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-gray-900">Section Headers & Content</h3>
            
            {/* Features Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Features Section</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputFactory
                  fieldName="featuresTitle"
                  config={{
                    type: 'String',
                    label: 'Features Section Title',
                    placeholder: 'e.g., Everything You Need to Succeed',
                    required: true
                  }}
                  value={formData.sections?.features?.title || 'Everything You Need to Succeed'}
                  onChange={(value) => handleChange('sections', 'features', 'title', value)}
                />
                <InputFactory
                  fieldName="featuresSubtitle"
                  config={{
                    type: 'String',
                    label: 'Features Section Subtitle',
                    placeholder: 'e.g., Comprehensive services designed to meet your needs',
                    required: true
                  }}
                  value={formData.sections?.features?.subtitle || 'Comprehensive services designed to meet your e-commerce needs.'}
                  onChange={(value) => handleChange('sections', 'features', 'subtitle', value)}
                />
              </div>
            </div>

            {/* Products Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Products Section</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputFactory
                  fieldName="productsTitle"
                  config={{
                    type: 'String',
                    label: 'Products Section Title',
                    placeholder: 'e.g., Featured Products',
                    required: true
                  }}
                  value={formData.sections?.products?.title || 'Featured Products'}
                  onChange={(value) => handleChange('sections', 'products', 'title', value)}
                />
                <InputFactory
                  fieldName="productsSubtitle"
                  config={{
                    type: 'String',
                    label: 'Products Section Subtitle',
                    placeholder: 'e.g., Discover our carefully curated selection',
                    required: true
                  }}
                  value={formData.sections?.products?.subtitle || 'Discover our carefully curated selection of quality products.'}
                  onChange={(value) => handleChange('sections', 'products', 'subtitle', value)}
                />
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">About Section</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputFactory
                  fieldName="aboutTitle"
                  config={{
                    type: 'String',
                    label: 'About Section Title',
                    placeholder: 'e.g., About TechStore',
                    required: true
                  }}
                  value={formData.about?.title || 'About TechStore'}
                  onChange={(value) => handleChange('about', 'title', value)}
                />
                <InputFactory
                  fieldName="aboutSubtitle"
                  config={{
                    type: 'String',
                    label: 'About Section Subtitle',
                    placeholder: 'e.g., Learn more about our company and mission.',
                    required: true
                  }}
                  value={formData.about?.subtitle || 'Learn more about our company and mission.'}
                  onChange={(value) => handleChange('about', 'subtitle', value)}
                />
              </div>
            </div>


            {/* Testimonials Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Testimonials Section</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputFactory
                  fieldName="testimonialsTitle"
                  config={{
                    type: 'String',
                    label: 'Testimonials Section Title',
                    placeholder: 'e.g., What Our Customers Say',
                    required: true
                  }}
                  value={formData.sections?.testimonials?.title || 'What Our Customers Say'}
                  onChange={(value) => handleChange('sections', 'testimonials', 'title', value)}
                />
                <InputFactory
                  fieldName="testimonialsSubtitle"
                  config={{
                    type: 'String',
                    label: 'Testimonials Section Subtitle',
                    placeholder: 'e.g., Don\'t just take our word for it',
                    required: true
                  }}
                  value={formData.sections?.testimonials?.subtitle || 'Don\'t just take our word for it - hear from our satisfied customers.'}
                  onChange={(value) => handleChange('sections', 'testimonials', 'subtitle', value)}
                />
              </div>
            </div>

            {/* CTA Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Call to Action Section</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputFactory
                  fieldName="ctaTitle"
                  config={{
                    type: 'String',
                    label: 'CTA Title',
                    placeholder: 'e.g., Ready to Start Shopping?',
                    required: true
                  }}
                  value={formData.cta?.title || 'Ready to Start Shopping?'}
                  onChange={(value) => handleChange('cta', 'title', value)}
                />
                <InputFactory
                  fieldName="ctaSubtitle"
                  config={{
                    type: 'String',
                    label: 'CTA Subtitle',
                    placeholder: 'e.g., Join thousands of satisfied customers',
                    required: true
                  }}
                  value={formData.cta?.subtitle || 'Join thousands of satisfied customers'}
                  onChange={(value) => handleChange('cta', 'subtitle', value)}
                />
              </div>
            </div>

            {/* Contact Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Contact Section</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputFactory
                  fieldName="contactTitle"
                  config={{
                    type: 'String',
                    label: 'Contact Section Title',
                    placeholder: 'e.g., Get in Touch',
                    required: true
                  }}
                  value={formData.contact?.title || 'Get in Touch'}
                  onChange={(value) => handleChange('contact', 'title', value)}
                />
                <InputFactory
                  fieldName="contactSubtitle"
                  config={{
                    type: 'String',
                    label: 'Contact Section Subtitle',
                    placeholder: 'e.g., Have questions? We\'d love to hear from you.',
                    required: true
                  }}
                  value={formData.contact?.subtitle || 'Have questions? We\'d love to hear from you.'}
                  onChange={(value) => handleChange('contact', 'subtitle', value)}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Footer</h4>
              <InputFactory
                fieldName="footerCopyright"
                config={{
                  type: 'String',
                  label: 'Footer Copyright Text',
                  placeholder: 'e.g., © 2024 {brandName}. All rights reserved.',
                  required: true
                }}
                value={formData.sections?.footer?.copyright || '© 2024 {brandName}. All rights reserved.'}
                onChange={(value) => handleChange('sections', 'footer', 'copyright', value)}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
          Content Management
        </h1>
        <p className="text-gray-600">
          Manage your landing page content and company information.
        </p>
      </div>

      <div className="space-y-6">
        {/* Content Management Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 overflow-x-auto scrollbar-hide" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                    <div className="flex items-center space-x-2">
                      <tab.icon className="h-4 w-4" />
                      <span>{tab.name}</span>
                    </div>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {renderTabContent()}
          </div>

          {/* Action Buttons */}
          <div className="border-t border-gray-200 p-6 flex justify-end space-x-4">
            <Button
              variant="secondaryOutline"
              size="md"
              onClick={handleReset}
              disabled={!hasChanges}
            >
              Reset Changes
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleSave}
              disabled={loading || !hasChanges}
            >
              {loading ? (
                <div className="flex items-center">
                  <ArrowPathIcon className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </div>
              ) : (
                <div className="flex items-center">
                  <CheckIcon className="h-4 w-4 mr-2" />
                  Save Changes
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Smart Floating Action Button */}
      {(activeTab === 'services' || activeTab === 'products' || activeTab === 'testimonials') ? (
        <SmartFloatingActionButton 
          variant="dots"
          icon="EllipsisVerticalIcon"
          label="Toggle quick actions"
          selectedCount={0}
          bulkActions={[]}
          quickActions={[
            { name: 'Preview Website', icon: 'EyeIcon', action: () => setShowPreviewModal(true), color: 'bg-blue-600' },
            ...(activeTab === 'services' ? [{ 
              name: 'Add Service', 
              icon: 'PlusIcon', 
              action: () => handleAddItem('services', {
                title: '',
                description: '',
                icon: 'CogIcon'
              }), 
              color: 'bg-primary-600' 
            }] : []),
            ...(activeTab === 'products' ? [{ 
              name: 'Add Product', 
              icon: 'PlusIcon', 
              action: () => handleAddItem('products', {
                name: '',
                price: { amount: '', currency: 'PHP' },
                description: '',
                image: ''
              }), 
              color: 'bg-primary-600' 
            }] : []),
            ...(activeTab === 'testimonials' ? [{ 
              name: 'Add Testimonial', 
              icon: 'PlusIcon', 
              action: () => handleAddItem('testimonials', {
                name: '',
                role: '',
                company: '',
                content: '',
                rating: 5
              }), 
              color: 'bg-primary-600' 
            }] : [])
          ]}
        />
      ) : (
        <SmartFloatingActionButton 
          variant="single"
          icon="EyeIcon"
          label="Preview Website"
          action={() => setShowPreviewModal(true)}
          selectedCount={0}
          bulkActions={[]}
          quickActions={[]}
        />
      )}

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 py-4">
            {/* Backdrop */}
            <div className="fixed inset-0 z-40 transition-opacity bg-black/50" onClick={() => setShowPreviewModal(false)}></div>
            
            {/* Modal Content */}
            <div className="relative z-50 w-full max-w-7xl h-[90vh] flex flex-col text-left transition-all transform bg-white shadow-xl rounded-xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
                <h3 className="text-lg font-semibold text-gray-900">Website Preview</h3>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              {/* Modal Content - Landing Page Preview */}
              <div className="flex-1 overflow-y-auto">
                <LandingPagePreview landingPageContent={landingPageContent} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Confirmation Modal */}
      <ConfirmationModal
        isOpen={showSaveConfirm}
        onClose={() => setShowSaveConfirm(false)}
        onConfirm={handleConfirmSave}
        title="Save Changes"
        message="Are you sure you want to save these changes? This will update your website content."
        confirmLabel="Save Changes"
        cancelLabel="Cancel"
        variant="info"
      />
    </>
  );
};

export default ContentManagement;
