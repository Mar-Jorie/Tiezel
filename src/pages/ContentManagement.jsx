import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import auditService from '../services/auditService';
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
  PhotoIcon,
  XMarkIcon,
  EyeIcon as PreviewIcon,
  Bars3Icon,
  MegaphoneIcon,
  DocumentTextIcon,
  ShoppingBagIcon,
  StarIcon,
  UserIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import { availableIcons } from '../components/IconLibrary';
import Button from '../components/Button';
import InputFactory from '../components/InputFactory';
import SelectInput from '../components/SelectInput';
import ColorPicker from '../components/ColorPicker';
import { useApp } from '../hooks/useApp';
import { toast } from 'react-hot-toast';
import SmartFloatingActionButton from '../components/SmartFloatingActionButton';
import LandingPage from './LandingPage';
import ConfirmationModal from '../components/ConfirmationModal';

const ContentManagement = () => {
  const { isAdmin, landingPageContent, updateLandingPageContent, resetLandingPageContent } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(landingPageContent);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addModalType, setAddModalType] = useState('');
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Check for old data and clear it on component mount
  useEffect(() => {
    const savedContent = localStorage.getItem('landingPageContent');
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        const hasOldData = (
          (parsedContent.hero && parsedContent.hero.visualTitle === "HerbalMed") ||
          (parsedContent.hero && parsedContent.hero.visualSubtitle === "Pure, natural, effective") ||
          (parsedContent.hero && parsedContent.hero.heroIcon === "ShieldCheckIcon") ||
          (parsedContent.hero && parsedContent.hero.ctaPrimary === "Shop Now") ||
          (parsedContent.hero && parsedContent.hero.ctaSecondary === "Learn More")
        );
        
        if (hasOldData) {
          console.log('Detected old content in ContentManagement, clearing localStorage');
          localStorage.removeItem('landingPageContent');
          // Force a page reload to get fresh default data
          window.location.reload();
        }
      } catch (error) {
        console.error('Error checking saved content:', error);
        localStorage.removeItem('landingPageContent');
      }
    }
  }, []);

  // Update form data when landing page content changes
  useEffect(() => {
    setFormData(landingPageContent);
    setHasChanges(false); // Reset changes when content is updated
  }, [landingPageContent]);

  // Track changes in form data
  useEffect(() => {
    const hasFormChanges = JSON.stringify(formData) !== JSON.stringify(landingPageContent);
    console.log('Change detection useEffect:', { hasFormChanges });
    // Only set to false if there are no changes, don't override manual changes
    if (!hasFormChanges) {
      setHasChanges(false);
    }
  }, [formData, landingPageContent]);

  // Force change detection for benefits and quality assurance
  const forceChangeDetection = () => {
    console.log('Force change detection triggered');
    // Use a timeout to ensure the state update has been processed
    setTimeout(() => {
      console.log('Setting hasChanges to true');
      setHasChanges(true);
    }, 0);
  };

  // Save function
  const handleSave = async () => {
    try {
      setLoading(true);
      
      // Log content update with before/after data
      const oldContent = landingPageContent;
      const newContent = formData;
      
      // Track changes for audit logging
      const changes = [];
      Object.keys(newContent).forEach(section => {
        if (JSON.stringify(oldContent[section]) !== JSON.stringify(newContent[section])) {
          changes.push(section);
        }
      });
      
      // ContentManagement calling updateLandingPageContent
      console.log('ContentManagement calling updateLandingPageContent with:', formData);
      await updateLandingPageContent(formData);
      setHasChanges(false);
      
      // Log the content update
      auditService.logContentUpdate(
        'Landing Page Content',
        `Updated sections: ${changes.join(', ')}`,
        oldContent,
        newContent
      );
      
      toast.success('Content saved successfully!');
    } catch (error) {
      toast.error('Failed to save content. Please try again.');
      console.error('Save error:', error);
    } finally {
      setLoading(false);
    }
  };


  // Available icons for selection

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
    forceChangeDetection();
  };


  const handleRemoveItem = (section, index) => {
    const itemToRemove = formData[section][index];
    const updatedData = {
      ...formData,
      [section]: formData[section].filter((_, i) => i !== index)
    };
    
    // Update local state only
    setFormData(updatedData);
    forceChangeDetection();
    
    // Log content deletion
    auditService.logContentDelete(
      section,
      `Removed ${section} item: ${itemToRemove.title || itemToRemove.name || 'Item'}`
    );
  };

  const handleConfirmSave = async () => {
    setShowSaveConfirm(false);
    setLoading(true);
    try {
      // Log content update with before/after data
      const oldContent = landingPageContent;
      const newContent = formData;
      
      // Track changes for audit logging
      const changes = [];
      Object.keys(newContent).forEach(section => {
        if (JSON.stringify(oldContent[section]) !== JSON.stringify(newContent[section])) {
          changes.push(section);
        }
      });
      
      // ContentManagement calling updateLandingPageContent
      console.log('ContentManagement calling updateLandingPageContent with:', formData);
      await updateLandingPageContent(formData);
      setHasChanges(false);
      
      // Log the content update
      auditService.logContentUpdate(
        'Landing Page Content',
        `Updated sections: ${changes.join(', ')}`,
        oldContent,
        newContent
      );
      
      toast.success('Content updated successfully!');
    } catch (error) {
      toast.error('Failed to update content. Please try again.');
      console.error('Save error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    // Clear localStorage completely to remove any old data
    localStorage.removeItem('landingPageContent');
    
    // Reset to default content
    resetLandingPageContent();
    
    // Reset form data to context content (new default)
    // Use the context data instead of hardcoded values
    setFormData(landingPageContent);
    setHasChanges(false);
    
    // Log content reset
    auditService.logContentUpdate(
      'Landing Page Content',
      'Reset to default content',
      formData,
      landingPageContent
    );
    
    toast.success('Content reset to default successfully!');
  };

  const handleAddItem = (type, newItem = null) => {
    if (newItem) {
      // Add the item directly
      const oldData = formData;
      const updatedData = {
        ...formData,
        [type]: [...(formData[type] || []), newItem]
      };
      
      setFormData(updatedData);
      
      // Log content creation
      auditService.logContentCreate(
        type,
        `Added new ${type} item: ${newItem.title || newItem.name || 'New Item'}`
      );
    } else {
      // Open modal for adding new item
      setAddModalType(type);
      setShowAddModal(true);
    }
  };

  const handleAddOrderMethod = () => {
    const newMethod = {
      title: '',
      description: ''
    };
    
    const updatedData = {
      ...formData,
      modals: {
        ...formData.modals,
        shopNow: {
          ...formData.modals?.shopNow,
          methods: [...(formData.modals?.shopNow?.methods || []), newMethod]
        }
      }
    };
    
    setFormData(updatedData);
    forceChangeDetection();
    toast.success('New order method added');
  };

  const handleRemoveOrderMethod = (index) => {
    const updatedData = {
      ...formData,
      modals: {
        ...formData.modals,
        shopNow: {
          ...formData.modals?.shopNow,
          methods: formData.modals?.shopNow?.methods?.filter((_, i) => i !== index) || []
        }
      }
    };
    
    setFormData(updatedData);
    forceChangeDetection();
    toast.success('Order method removed');
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
                {React.createElement(selectedIcon.component, { className: "h-4 w-4 text-gray-600" })}
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
                    {React.createElement(icon.component, { className: "h-5 w-5 text-gray-600" })}
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
    { id: 'personal', name: 'Personal Info', icon: UserIcon },
    { id: 'hero', name: 'Hero Section', icon: HomeIcon },
    { id: 'about', name: 'About', icon: DocumentTextIcon },
    { id: 'projects', name: 'Projects', icon: BriefcaseIcon },
    { id: 'experience', name: 'Experience', icon: AcademicCapIcon },
    { id: 'skills', name: 'Skills', icon: CodeBracketIcon },
    { id: 'sections', name: 'Section Headers', icon: DocumentTextIcon }
  ];

  const renderTabContent = () => {
    switch (activeTab) {

      case 'hero':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Hero Section</h3>
            <div className="space-y-6">
              {/* Hero Title */}
              <InputFactory
                fieldName="heroTitle"
                config={{
                  type: 'String',
                  label: 'Hero Title',
                  placeholder: 'e.g., Hi, I\'m [Your Name]',
                  required: true
                }}
                value={formData.hero?.title || ''}
                onChange={(value) => {
                  const updatedData = {
                    ...formData,
                    hero: {
                      ...formData.hero,
                      title: value
                    }
                  };
                  setFormData(updatedData);
                  forceChangeDetection();
                }}
              />

              {/* Professional Title */}
              <InputFactory
                fieldName="professionalTitle"
                config={{
                  type: 'String',
                  label: 'Professional Title',
                  placeholder: 'e.g., UI/UX Designer & Developer',
                  required: true
                }}
                value={formData.hero?.professionalTitle || ''}
                onChange={(value) => {
                  const updatedData = {
                    ...formData,
                    hero: {
                      ...formData.hero,
                      professionalTitle: value
                    }
                  };
                  setFormData(updatedData);
                  forceChangeDetection();
                }}
              />

              {/* Hero Description */}
              <InputFactory
                fieldName="heroDescription"
                config={{
                  type: 'Textarea',
                  label: 'Hero Description',
                  placeholder: 'Enter your professional description and what you do...',
                  required: true
                }}
                value={formData.hero?.subtitle || ''}
                onChange={(value) => {
                  const updatedData = {
                    ...formData,
                    hero: {
                      ...formData.hero,
                      subtitle: value
                    }
                  };
                  setFormData(updatedData);
                  forceChangeDetection();
                }}
              />

              
              
            </div>
          </div>
        );

      case 'personal':
        return (
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-gray-900">Personal Information</h3>
            
            {/* Personal Photo - Full width */}
            <InputFactory
              fieldName="photo"
              config={{
                type: 'FileUpload',
                label: 'Personal Photo',
                required: true
              }}
              value={formData.personal_info?.photo || ''}
              onChange={(value) => {
                const updatedData = {
                  ...formData,
                  personal_info: {
                    ...formData.personal_info,
                    photo: value
                  }
                };
                setFormData(updatedData);
                forceChangeDetection();
              }}
            />
            
            {/* Name and Professional Title - Two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputFactory
                fieldName="name"
                config={{
                  type: 'String',
                  label: 'Full Name',
                  placeholder: 'Enter your full name',
                  required: true
                }}
                value={formData.personal_info?.name || ''}
                onChange={(value) => {
                  const updatedData = {
                    ...formData,
                    personal_info: {
                      ...formData.personal_info,
                      name: value
                    }
                  };
                  setFormData(updatedData);
                  forceChangeDetection();
                }}
              />
              <InputFactory
                fieldName="title"
                config={{
                  type: 'String',
                  label: 'Professional Title',
                  placeholder: 'e.g., Software Developer, Designer',
                  required: true
                }}
                value={formData.personal_info?.title || ''}
                onChange={(value) => {
                  const updatedData = {
                    ...formData,
                    personal_info: {
                      ...formData.personal_info,
                      title: value
                    }
                  };
                  setFormData(updatedData);
                  forceChangeDetection();
                }}
              />
            </div>
            
            {/* Email and Phone - Two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputFactory
                fieldName="email"
                config={{
                  type: 'String',
                  label: 'Email Address',
                  placeholder: 'Enter email address',
                  required: true,
                  format: 'email'
                }}
                value={formData.personal_info?.email || ''}
                onChange={(value) => {
                  const updatedData = {
                    ...formData,
                    personal_info: {
                      ...formData.personal_info,
                      email: value
                    }
                  };
                  setFormData(updatedData);
                  forceChangeDetection();
                }}
              />
              <InputFactory
                fieldName="phone"
                config={{
                  type: 'String',
                  label: 'Phone Number',
                  placeholder: 'Enter phone number',
                  required: false
                }}
                value={formData.personal_info?.phone || '+1 (555) 123-4567'}
                onChange={(value) => {
                  const updatedData = {
                    ...formData,
                    personal_info: {
                      ...formData.personal_info,
                      phone: value
                    }
                  };
                  setFormData(updatedData);
                  forceChangeDetection();
                }}
              />
            </div>
            
            {/* Location and Experience - Two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputFactory
                fieldName="location"
                config={{
                  type: 'String',
                  label: 'Location',
                  placeholder: 'e.g., San Francisco, CA',
                  required: true
                }}
                value={formData.personal_info?.location || ''}
                onChange={(value) => {
                  const updatedData = {
                    ...formData,
                    personal_info: {
                      ...formData.personal_info,
                      location: value
                    }
                  };
                  setFormData(updatedData);
                  forceChangeDetection();
                }}
              />
              <InputFactory
                fieldName="experience"
                config={{
                  type: 'String',
                  label: 'Years of Experience',
                  placeholder: 'e.g., 5+ Years',
                  required: true
                }}
                value={formData.personal_info?.experience || ''}
                onChange={(value) => {
                  const updatedData = {
                    ...formData,
                    personal_info: {
                      ...formData.personal_info,
                      experience: value
                    }
                  };
                  setFormData(updatedData);
                  forceChangeDetection();
                }}
              />
            </div>
            
            {/* Education - Full width */}
            <InputFactory
              fieldName="education"
              config={{
                type: 'String',
                label: 'Education',
                placeholder: 'e.g., Bachelor\'s in Computer Science',
                required: true
              }}
              value={formData.personal_info?.education || ''}
              onChange={(value) => {
                const updatedData = {
                  ...formData,
                  personal_info: {
                    ...formData.personal_info,
                    education: value
                  }
                };
                setFormData(updatedData);
                forceChangeDetection();
              }}
            />
            
            {/* Bio/Summary - Full width */}
            <InputFactory
              fieldName="bio"
              config={{
                type: 'Textarea',
                label: 'Professional Bio/Summary',
                placeholder: 'Write a brief professional summary about yourself...',
                required: true
              }}
              value={formData.personal_info?.bio || ''}
              onChange={(value) => {
                const updatedData = {
                  ...formData,
                  personal_info: {
                    ...formData.personal_info,
                    bio: value
                  }
                };
                setFormData(updatedData);
                forceChangeDetection();
              }}
            />
            
            {/* Social Links Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Social Links</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputFactory
                  fieldName="linkedin"
                  config={{
                    type: 'String',
                    label: 'LinkedIn Profile',
                    placeholder: 'https://linkedin.com/in/yourname',
                    required: false
                  }}
                  value={formData.personal_info?.linkedin || ''}
                  onChange={(value) => {
                    const updatedData = {
                      ...formData,
                      personal_info: {
                        ...formData.personal_info,
                        linkedin: value
                      }
                    };
                    setFormData(updatedData);
                    forceChangeDetection();
                  }}
                />
                
                <InputFactory
                  fieldName="github"
                  config={{
                    type: 'String',
                    label: 'GitHub Profile',
                    placeholder: 'https://github.com/yourname',
                    required: false
                  }}
                  value={formData.personal_info?.github || ''}
                  onChange={(value) => {
                    const updatedData = {
                      ...formData,
                      personal_info: {
                        ...formData.personal_info,
                        github: value
                      }
                    };
                    setFormData(updatedData);
                    forceChangeDetection();
                  }}
                />
                
                <InputFactory
                  fieldName="website"
                  config={{
                    type: 'String',
                    label: 'Personal Website',
                    placeholder: 'https://yourwebsite.com',
                    required: false
                  }}
                  value={formData.personal_info?.website || ''}
                  onChange={(value) => {
                    const updatedData = {
                      ...formData,
                      personal_info: {
                        ...formData.personal_info,
                        website: value
                      }
                    };
                    setFormData(updatedData);
                    forceChangeDetection();
                  }}
                />
                
                <InputFactory
                  fieldName="twitter"
                  config={{
                    type: 'String',
                    label: 'Twitter/X Profile',
                    placeholder: 'https://twitter.com/yourname',
                    required: false
                  }}
                  value={formData.personal_info?.twitter || ''}
                  onChange={(value) => {
                    const updatedData = {
                      ...formData,
                      personal_info: {
                        ...formData.personal_info,
                        twitter: value
                      }
                    };
                    setFormData(updatedData);
                    forceChangeDetection();
                  }}
                />
              </div>
            </div>
            
            {/* Branding Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Branding & Logo</h4>
              
              {/* Primary Color */}
              <div className="space-y-4 mb-6">
                <h5 className="text-sm font-medium text-gray-700">Primary Brand Color</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Color
                    </label>
                    <ColorPicker
                      value={formData.branding?.primaryColor || '#6589a4'}
                      onChange={(color) => {
                        const updatedData = {
                          ...formData,
                          branding: {
                            ...formData.branding,
                            primaryColor: color
                          }
                        };
                        setFormData(updatedData);
                        forceChangeDetection();
                      }}
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-16 h-16 rounded-lg border border-gray-200 shadow-sm"
                      style={{ backgroundColor: formData.branding?.primaryColor || '#6589a4' }}
                    ></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Current Color</p>
                      <p className="text-xs text-gray-500 font-mono">
                        {formData.branding?.primaryColor || '#6589a4'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Logo */}
              <div className="space-y-4">
                <h5 className="text-sm font-medium text-gray-700">Logo</h5>
                <InputFactory
                  fieldName="logo"
                  config={{
                    type: 'FileUpload',
                    label: 'Brand Logo',
                    required: false
                  }}
                  value={formData.branding?.logo || ''}
                  onChange={(value) => {
                    const updatedData = {
                      ...formData,
                      branding: {
                        ...formData.branding,
                        logo: value
                      }
                    };
                    setFormData(updatedData);
                    forceChangeDetection();
                  }}
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

          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Featured Projects</h3>
            </div>
            <div className="space-y-4">
              {(!formData.projects || formData.projects.length === 0) ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-4">No projects added yet</p>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => handleAddItem('projects')}
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add New Project
                  </Button>
                </div>
              ) : (
                formData.projects.map((project, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Project {index + 1}</h4>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveItem('projects', index)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Project Information */}
                  <div className="space-y-4">
                    <h5 className="text-sm font-medium text-gray-700">Project Information</h5>
                    
                    {/* Project Title - Full width */}
                    <div>
                      <InputFactory
                        fieldName={`project-${index}-title`}
                        config={{
                          type: 'String',
                          label: 'Project Title',
                          placeholder: 'Enter project title',
                          required: true
                        }}
                        value={project.title || project.name}
                        onChange={(value) => handleArrayChange('projects', index, 'title', value)}
                      />
                    </div>
                    
                    {/* Cover Image - Full width */}
                    <div>
                      <InputFactory
                        fieldName={`project-${index}-coverImage`}
                        config={{
                          type: 'FileUpload',
                          label: 'Cover Image',
                          placeholder: 'Upload a cover image for this project',
                          required: true
                        }}
                        value={project.coverImage || ''}
                        onChange={(value) => handleArrayChange('projects', index, 'coverImage', value)}
                      />
                    </div>
                    
                    {/* Project Description - Full width */}
                    <div>
                      <InputFactory
                        fieldName={`project-${index}-description`}
                        config={{
                          type: 'Textarea',
                          label: 'Project Description',
                          placeholder: 'Enter detailed project description',
                          required: true
                        }}
                        value={project.description}
                        onChange={(value) => handleArrayChange('projects', index, 'description', value)}
                      />
                    </div>
                    
                    {/* Showcase Images - Full width */}
                    <div>
                      <InputFactory
                        fieldName={`project-${index}-showcaseImages`}
                        config={{
                          type: 'FileUpload',
                          label: 'Showcase Images (Multiple)',
                          placeholder: 'Upload multiple images to showcase the project',
                          required: true,
                          multiple: true
                        }}
                        value={project.showcaseImages || project.images || []}
                        onChange={(value) => handleArrayChange('projects', index, 'showcaseImages', value)}
                      />
                    </div>
                  </div>
                  
                  {/* Other Info (Bullet Type) */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="text-sm font-medium text-gray-700">Other Info (Bullet Type)</h5>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          const updatedProjects = [...formData.projects];
                          if (!updatedProjects[index].details) {
                            updatedProjects[index].details = [];
                          }
                          updatedProjects[index].details.push('');
                          setFormData(prev => ({
                            ...prev,
                            projects: updatedProjects
                          }));
                          // Force change detection
                          forceChangeDetection();
                        }}
                      >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Info
                      </Button>
                    </div>
                    
                    {project.details && project.details.length > 0 ? (
                      <div className="space-y-3">
                        {project.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-primary-600 font-semibold text-xs">{detailIndex + 1}</span>
                              </div>
                              <div className="flex-1">
                                <InputFactory
                                  fieldName={`detail-${detailIndex}`}
                                  config={{
                                    type: 'String',
                                    label: '',
                                    placeholder: 'e.g., Built with React and Node.js, Responsive design, Mobile-first approach',
                                    required: true
                                  }}
                                  value={detail || ''}
                                  onChange={(value) => {
                                    const updatedProjects = [...formData.projects];
                                    if (!updatedProjects[index].details) {
                                      updatedProjects[index].details = [];
                                    }
                                    updatedProjects[index].details[detailIndex] = value;
                                    setFormData(prev => ({
                                      ...prev,
                                      projects: updatedProjects
                                    }));
                                    // Force change detection
                                    forceChangeDetection();
                                  }}
                                />
                              </div>
                              <div className="flex items-center justify-center h-10">
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => {
                                    const updatedProjects = [...formData.projects];
                                    if (updatedProjects[index].details) {
                                      updatedProjects[index].details.splice(detailIndex, 1);
                                      setFormData(prev => ({
                                        ...prev,
                                        projects: updatedProjects
                                      }));
                                      // Force change detection
                                      forceChangeDetection();
                                    }
                                  }}
                                  className="!w-auto flex-shrink-0 h-10"
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                          <PlusIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-600 mb-2">No benefits added yet</p>
                        <p className="text-xs text-gray-500">Click "Add Benefit" to get started</p>
                      </div>
                    )}
                  </div>
                  
                  
                </div>
                ))
              )}
            </div>

          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Professional Experience</h3>
            </div>
            <div className="space-y-4">
              {(!formData.experience || formData.experience.length === 0) ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-4">No experience added yet</p>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => handleAddItem('experience')}
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add New Experience
                  </Button>
                </div>
              ) : (
                formData.experience.map((exp, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900">Experience {index + 1}</h4>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveItem('experience', index)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Basic Experience Information */}
                  <div className="space-y-4">
                    <h5 className="text-sm font-medium text-gray-700">Basic Information</h5>
                    
                    {/* Experience Type - Full width */}
                    <div>
                      <SelectInput
                        label="Experience Type"
                        value={exp.type || 'work'}
                        onChange={(value) => handleArrayChange('experience', index, 'type', value)}
                        options={[
                          { value: 'work', label: 'Work Experience' },
                          { value: 'education', label: 'Education' },
                          { value: 'certification', label: 'Certification' },
                          { value: 'volunteer', label: 'Volunteer Work' }
                        ]}
                        placeholder="Select experience type"
                        required
                      />
                    </div>
                    
                    {/* Title and Company - Two columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputFactory
                        fieldName={`experience-${index}-title`}
                        config={{
                          type: 'String',
                          label: 'Title/Position',
                          placeholder: 'e.g., Senior Software Developer',
                          required: true
                        }}
                        value={exp.title || ''}
                        onChange={(value) => handleArrayChange('experience', index, 'title', value)}
                      />
                      <InputFactory
                        fieldName={`experience-${index}-company`}
                        config={{
                          type: 'String',
                          label: 'Company/Institution',
                          placeholder: 'e.g., Tech Company Inc.',
                          required: true
                        }}
                        value={exp.company || ''}
                        onChange={(value) => handleArrayChange('experience', index, 'company', value)}
                      />
                    </div>
                    
                    {/* Duration and Location - Two columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputFactory
                        fieldName={`experience-${index}-duration`}
                        config={{
                          type: 'String',
                          label: 'Duration',
                          placeholder: 'e.g., 2022 - Present',
                          required: true
                        }}
                        value={exp.duration || ''}
                        onChange={(value) => handleArrayChange('experience', index, 'duration', value)}
                      />
                      <InputFactory
                        fieldName={`experience-${index}-location`}
                        config={{
                          type: 'String',
                          label: 'Location',
                          placeholder: 'e.g., San Francisco, CA',
                          required: false
                        }}
                        value={exp.location || ''}
                        onChange={(value) => handleArrayChange('experience', index, 'location', value)}
                      />
                    </div>
                    
                    {/* Description - Full width */}
                    <div>
                      <InputFactory
                        fieldName={`experience-${index}-description`}
                        config={{
                          type: 'Textarea',
                          label: 'Description',
                          placeholder: 'Brief description of your role and responsibilities...',
                          required: true
                        }}
                        value={exp.description || ''}
                        onChange={(value) => handleArrayChange('experience', index, 'description', value)}
                      />
                    </div>
                  </div>
                  
                  {/* Achievements/Responsibilities */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="text-sm font-medium text-gray-700">Key Achievements</h5>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          const updatedExperience = [...formData.experience];
                          if (!updatedExperience[index].achievements) {
                            updatedExperience[index].achievements = [];
                          }
                          updatedExperience[index].achievements.push('');
                          setFormData(prev => ({
                            ...prev,
                            experience: updatedExperience
                          }));
                          forceChangeDetection();
                        }}
                      >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Achievement
                      </Button>
                    </div>
                    
                    {exp.achievements && exp.achievements.length > 0 ? (
                      <div className="space-y-3">
                        {exp.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-primary-600 font-semibold text-xs">{achievementIndex + 1}</span>
                              </div>
                              <div className="flex-1">
                                <InputFactory
                                  fieldName={`achievement-${achievementIndex}`}
                                  config={{
                                    type: 'String',
                                    label: '',
                                    placeholder: 'e.g., Improved system performance by 40%',
                                    required: true
                                  }}
                                  value={achievement || ''}
                                  onChange={(value) => {
                                    const updatedExperience = [...formData.experience];
                                    if (!updatedExperience[index].achievements) {
                                      updatedExperience[index].achievements = [];
                                    }
                                    updatedExperience[index].achievements[achievementIndex] = value;
                                    setFormData(prev => ({
                                      ...prev,
                                      experience: updatedExperience
                                    }));
                                    forceChangeDetection();
                                  }}
                                />
                              </div>
                              <div className="flex items-center justify-center h-10">
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => {
                                    const updatedExperience = [...formData.experience];
                                    if (updatedExperience[index].achievements) {
                                      updatedExperience[index].achievements.splice(achievementIndex, 1);
                                      setFormData(prev => ({
                                        ...prev,
                                        experience: updatedExperience
                                      }));
                                      forceChangeDetection();
                                    }
                                  }}
                                  className="!w-auto flex-shrink-0 h-10"
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="flex items-center justify-center mb-4">
                          <PlusIcon className="h-8 w-8 text-primary-400" />
                        </div>
                        <p className="text-sm text-gray-600 mb-2">No achievements added yet</p>
                        <p className="text-xs text-gray-500">Click "Add Achievement" to get started</p>
                      </div>
                    )}
                  </div>
                </div>
                ))
              )}
            </div>
            <div className="mt-8 text-center">
              <Button
                variant="secondary"
                size="md"
                onClick={() => handleAddItem('experience', {
                  type: 'work',
                  title: '',
                  company: '',
                  duration: '',
                  location: '',
                  description: '',
                  achievements: []
                })}
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add New Experience
              </Button>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Skills & Expertise</h3>
            </div>
            
            {/* Skills title and subtitle moved to Section Headers tab */}
            
            {/* Skills Categories */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-700">Skill Categories</h4>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    const updatedData = {
                      ...formData,
                      skills: [
                        ...(formData.skills || []),
                        {
                          category: '',
                          skills: []
                        }
                      ]
                    };
                    setFormData(updatedData);
                    forceChangeDetection();
                  }}
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>
              
              {formData.skills?.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-medium text-gray-900">Category {categoryIndex + 1}</h5>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        const updatedCategories = [...(formData.skills || [])];
                        updatedCategories.splice(categoryIndex, 1);
                        const updatedData = {
                          ...formData,
                          skills: updatedCategories
                        };
                        setFormData(updatedData);
                        forceChangeDetection();
                      }}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Category Name */}
                  <div className="mb-4">
                    <InputFactory
                      fieldName={`category-${categoryIndex}-name`}
                      config={{
                        type: 'String',
                        label: 'Category Name',
                        placeholder: 'e.g., Frontend, Backend, Database',
                        required: true
                      }}
                      value={category.category || ''}
                      onChange={(value) => {
                        const updatedCategories = [...(formData.skills || [])];
                        updatedCategories[categoryIndex] = {
                          ...updatedCategories[categoryIndex],
                          category: value
                        };
                        const updatedData = {
                          ...formData,
                          skills: updatedCategories
                        };
                        setFormData(updatedData);
                        forceChangeDetection();
                      }}
                    />
                  </div>
                  
                  {/* Skills in Category */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h6 className="text-sm font-medium text-gray-600">Skills</h6>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          const updatedCategories = [...(formData.skills || [])];
                          if (!updatedCategories[categoryIndex].skills) {
                            updatedCategories[categoryIndex].skills = [];
                          }
                          updatedCategories[categoryIndex].skills.push('');
                          const updatedData = {
                            ...formData,
                            skills: updatedCategories
                          };
                          setFormData(updatedData);
                          forceChangeDetection();
                        }}
                      >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Skill
                      </Button>
                    </div>
                    
                    {category.skills && category.skills.length > 0 ? (
                      <div className="space-y-2">
                        {category.skills.map((skill, skillIndex) => (
                          <div key={skillIndex} className="flex items-center space-x-2">
                            <div className="flex-1">
                              <InputFactory
                                fieldName={`skill-${categoryIndex}-${skillIndex}`}
                                config={{
                                  type: 'String',
                                  label: '',
                                  placeholder: 'e.g., React, JavaScript, Python',
                                  required: true
                                }}
                                value={skill || ''}
                                onChange={(value) => {
                                  const updatedCategories = [...(formData.skills || [])];
                                  if (!updatedCategories[categoryIndex].skills) {
                                    updatedCategories[categoryIndex].skills = [];
                                  }
                                  updatedCategories[categoryIndex].skills[skillIndex] = value;
                                  const updatedData = {
                                    ...formData,
                                    skills: updatedCategories
                                  };
                                  setFormData(updatedData);
                                  forceChangeDetection();
                                }}
                              />
                            </div>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => {
                                const updatedCategories = [...(formData.skills || [])];
                                if (updatedCategories[categoryIndex].skills) {
                                  updatedCategories[categoryIndex].skills.splice(skillIndex, 1);
                                  const updatedData = {
                                    ...formData,
                                    skills: updatedCategories
                                  };
                                  setFormData(updatedData);
                                  forceChangeDetection();
                                }
                              }}
                              className="!w-auto flex-shrink-0"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                        <p className="text-sm text-gray-600">No skills added yet</p>
                        <p className="text-xs text-gray-500">Click "Add Skill" to get started</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {(!formData.skills || formData.skills.length === 0) && (
                <div className="text-center py-8">
                  <div className="flex items-center justify-center mb-4">
                    <CodeBracketIcon className="h-8 w-8 text-primary-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">No skill categories added yet</p>
                  <p className="text-xs text-gray-500">Click "Add Category" to get started</p>
                </div>
              )}
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
            

            {/* Projects Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Projects Section</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputFactory
                  fieldName="projectsTitle"
                  config={{
                    type: 'String',
                    label: 'Projects Section Title',
                    placeholder: 'e.g., Featured Projects',
                    required: true
                  }}
                  value={formData.sections?.projects?.title || ''}
                  onChange={(value) => {
                    const updatedData = {
                      ...formData,
                      sections: {
                        ...formData.sections,
                        projects: {
                          ...formData.sections?.projects,
                          title: value
                        }
                      }
                    };
                    setFormData(updatedData);
                    forceChangeDetection();
                  }}
                />
                <InputFactory
                  fieldName="projectsSubtitle"
                  config={{
                    type: 'String',
                    label: 'Projects Section Subtitle',
                    placeholder: 'e.g., A showcase of my recent work...',
                    required: true
                  }}
                  value={formData.sections?.projects?.subtitle || ''}
                  onChange={(value) => {
                    const updatedData = {
                      ...formData,
                      sections: {
                        ...formData.sections,
                        projects: {
                          ...formData.sections?.projects,
                          subtitle: value
                        }
                      }
                    };
                    setFormData(updatedData);
                    forceChangeDetection();
                  }}
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
                  value={formData.sections?.about?.title || 'About Me'}
                  onChange={(value) => {
                    const updatedData = {
                      ...formData,
                      sections: {
                        ...formData.sections,
                        about: {
                          ...formData.sections?.about,
                          title: value
                        }
                      }
                    };
                    setFormData(updatedData);
                    forceChangeDetection();
                  }}
                />
                <InputFactory
                  fieldName="aboutSubtitle"
                  config={{
                    type: 'String',
                    label: 'About Section Subtitle',
                    placeholder: 'e.g., Passionate about creating meaningful connections...',
                    required: true
                  }}
                  value={formData.sections?.about?.subtitle || 'Get to know me better'}
                  onChange={(value) => {
                    const updatedData = {
                      ...formData,
                      sections: {
                        ...formData.sections,
                        about: {
                          ...formData.sections?.about,
                          subtitle: value
                        }
                      }
                    };
                    setFormData(updatedData);
                    forceChangeDetection();
                  }}
                />
              </div>
              
            </div>

            {/* Experience Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Experience Section</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputFactory
                  fieldName="experienceTitle"
                  config={{
                    type: 'String',
                    label: 'Experience Section Title',
                    placeholder: 'e.g., Experience & Achievements',
                    required: true
                  }}
                  value={formData.sections?.experience?.title || ''}
                  onChange={(value) => {
                    const updatedData = {
                      ...formData,
                      sections: {
                        ...formData.sections,
                        experience: {
                          ...formData.sections?.experience,
                          title: value
                        }
                      }
                    };
                    setFormData(updatedData);
                    forceChangeDetection();
                  }}
                />
                <InputFactory
                  fieldName="experienceSubtitle"
                  config={{
                    type: 'String',
                    label: 'Experience Section Subtitle',
                    placeholder: 'e.g., A timeline of my professional growth...',
                    required: true
                  }}
                  value={formData.sections?.experience?.subtitle || 'A timeline of my professional growth, key roles, and significant contributions across different organizations.'}
                  onChange={(value) => {
                    const updatedData = {
                      ...formData,
                      sections: {
                        ...formData.sections,
                        experience: {
                          ...formData.sections?.experience,
                          subtitle: value
                        }
                      }
                    };
                    setFormData(updatedData);
                    forceChangeDetection();
                  }}
                />
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Skills Section</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputFactory
                  fieldName="skillsTitle"
                  config={{
                    type: 'String',
                    label: 'Skills Section Title',
                    placeholder: 'e.g., Skills & Expertise',
                    required: true
                  }}
                  value={formData.sections?.skills?.title || 'Skills & Expertise'}
                  onChange={(value) => {
                    const updatedData = {
                      ...formData,
                      sections: {
                        ...formData.sections,
                        skills: {
                          ...formData.sections?.skills,
                          title: value
                        }
                      }
                    };
                    setFormData(updatedData);
                    forceChangeDetection();
                  }}
                />
                <InputFactory
                  fieldName="skillsSubtitle"
                  config={{
                    type: 'String',
                    label: 'Skills Section Subtitle',
                    placeholder: 'e.g., A comprehensive toolkit of modern technologies...',
                    required: true
                  }}
                  value={formData.sections?.skills?.subtitle || 'A comprehensive toolkit of modern technologies and frameworks I use to build exceptional digital experiences.'}
                  onChange={(value) => {
                    const updatedData = {
                      ...formData,
                      sections: {
                        ...formData.sections,
                        skills: {
                          ...formData.sections?.skills,
                          subtitle: value
                        }
                      }
                    };
                    setFormData(updatedData);
                    forceChangeDetection();
                  }}
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
                    placeholder: 'e.g., Get In Touch',
                    required: true
                  }}
                  value={formData.sections?.contact?.title || 'Get In Touch'}
                  onChange={(value) => {
                    const updatedData = {
                      ...formData,
                      sections: {
                        ...formData.sections,
                        contact: {
                          ...formData.sections?.contact,
                          title: value
                        }
                      }
                    };
                    setFormData(updatedData);
                    forceChangeDetection();
                  }}
                />
                <InputFactory
                  fieldName="contactSubtitle"
                  config={{
                    type: 'String',
                    label: 'Contact Section Subtitle',
                    placeholder: 'e.g., Ready to work together? Let\'s discuss your project.',
                    required: true
                  }}
                  value={formData.sections?.contact?.subtitle || 'Ready to work together? Let\'s discuss your project.'}
                  onChange={(value) => {
                    const updatedData = {
                      ...formData,
                      sections: {
                        ...formData.sections,
                        contact: {
                          ...formData.sections?.contact,
                          subtitle: value
                        }
                      }
                    };
                    setFormData(updatedData);
                    forceChangeDetection();
                  }}
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
                  onChange={(value) => {
                    const updatedData = {
                      ...formData,
                      cta: {
                        ...formData.cta,
                        title: value
                      }
                    };
                    setFormData(updatedData);
                    forceChangeDetection();
                  }}
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
                  onChange={(value) => {
                    const updatedData = {
                      ...formData,
                      cta: {
                        ...formData.cta,
                        subtitle: value
                      }
                    };
                    setFormData(updatedData);
                    forceChangeDetection();
                  }}
                />
              </div>
            </div>


          </div>
        );

      case 'orderMethods':
        return (
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-gray-900">Order Methods Management</h3>
            
            {/* Shop Now Modal Content */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700">Shop Now Modal</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-4">
                  <InputFactory
                    fieldName="shopNowModalTitle"
                    config={{
                      type: 'String',
                      label: 'Modal Title',
                      placeholder: 'e.g., How to Order',
                      required: true
                    }}
                    value={formData.modals?.shopNow?.title || 'How to Order'}
                    onChange={(value) => {
                      const updatedData = {
                        ...formData,
                        modals: {
                          ...formData.modals,
                          shopNow: {
                            ...formData.modals?.shopNow,
                            title: value
                          }
                        }
                      };
                      setFormData(updatedData);
                      forceChangeDetection();
                    }}
                  />
                  
                  <InputFactory
                    fieldName="shopNowModalDescription"
                    config={{
                      type: 'Textarea',
                      label: 'Modal Description',
                      placeholder: 'e.g., Ready to start your wellness journey? Here\'s where you can order our premium herbal medicines:',
                      required: true
                    }}
                    value={formData.modals?.shopNow?.description || 'Ready to start your wellness journey? Here\'s where you can order our premium herbal medicines:'}
                    onChange={(value) => {
                      const updatedData = {
                        ...formData,
                        modals: {
                          ...formData.modals,
                          shopNow: {
                            ...formData.modals?.shopNow,
                            description: value
                          }
                        }
                      };
                      setFormData(updatedData);
                      forceChangeDetection();
                    }}
                  />
                  
                  {/* Ordering Methods */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-base font-semibold text-gray-900">Ordering Methods</h5>
                        <p className="text-sm text-gray-600 mt-1">Configure how customers can place orders</p>
                      </div>
                    </div>
                    
                    {formData.modals?.shopNow?.methods?.length > 0 ? (
                      <div className="space-y-4">
                        {formData.modals?.shopNow?.methods?.map((method, index) => (
                          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                  <span className="text-primary-600 font-semibold text-sm">
                                    {method.title?.charAt(0)?.toUpperCase() || 'M'}
                                  </span>
                                </div>
                                <div>
                                  <h6 className="font-semibold text-gray-900">Method {index + 1}</h6>
                                  <p className="text-sm text-gray-500">Ordering method configuration</p>
                                </div>
                              </div>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleRemoveOrderMethod(index)}
                                className="!w-auto"
                              >
                                <TrashIcon className="h-4 w-4 mr-2" />
                                Remove
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div>
                                <InputFactory
                                  fieldName={`method-${index}-title`}
                                  config={{
                                    type: 'String',
                                    label: 'Method Title',
                                    placeholder: 'e.g., WhatsApp Orders',
                                    required: true
                                  }}
                                  value={method.title || ''}
                                  onChange={(value) => {
                                    const updatedData = {
                                      ...formData,
                                      modals: {
                                        ...formData.modals,
                                        shopNow: {
                                          ...formData.modals?.shopNow,
                                          methods: formData.modals?.shopNow?.methods?.map((method, i) => 
                                            i === index ? { ...method, title: value } : method
                                          ) || []
                                        }
                                      }
                                    };
                                    setFormData(updatedData);
                                    forceChangeDetection();
                                  }}
                                />
                              </div>
                              <div>
                                <InputFactory
                                  fieldName={`method-${index}-description`}
                                  config={{
                                    type: 'String',
                                    label: 'Method Description',
                                    placeholder: 'e.g., Message us on WhatsApp for quick orders',
                                    required: true
                                  }}
                                  value={method.description || ''}
                                  onChange={(value) => {
                                    const updatedData = {
                                      ...formData,
                                      modals: {
                                        ...formData.modals,
                                        shopNow: {
                                          ...formData.modals?.shopNow,
                                          methods: formData.modals?.shopNow?.methods?.map((method, i) => 
                                            i === index ? { ...method, description: value } : method
                                          ) || []
                                        }
                                      }
                                    };
                                    setFormData(updatedData);
                                    forceChangeDetection();
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <PlusIcon className="h-6 w-6 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No ordering methods configured</h3>
                        <p className="text-gray-600 mb-4">Add your first ordering method to get started</p>
                        <p className="text-sm text-gray-500">Use the floating action button (3 dots) to add methods</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        );

      case 'about':
        return (
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-gray-900">About Section</h3>
            
            {/* Professional Bio/Summary */}
            <InputFactory
              fieldName="professionalBio"
              config={{
                type: 'Textarea',
                label: 'Professional Bio/Summary',
                placeholder: 'Write a comprehensive professional summary about yourself, your background, and what makes you unique...',
                required: true
              }}
              value={formData.about?.professionalBio || ''}
              onChange={(value) => {
                const updatedData = {
                  ...formData,
                  about: {
                    ...formData.about,
                    professionalBio: value
                  }
                };
                setFormData(updatedData);
                forceChangeDetection();
              }}
            />
            
            {/* Education Background */}
            <InputFactory
              fieldName="educationBackground"
              config={{
                type: 'Textarea',
                label: 'Education Background',
                placeholder: 'Describe your educational background, degrees, certifications, and relevant coursework...',
                required: true
              }}
              value={formData.about?.educationBackground || ''}
              onChange={(value) => {
                const updatedData = {
                  ...formData,
                  about: {
                    ...formData.about,
                    educationBackground: value
                  }
                };
                setFormData(updatedData);
                forceChangeDetection();
              }}
            />
            
            {/* Personal Saying/Quote */}
            <InputFactory
              fieldName="personalQuote"
              config={{
                type: 'Textarea',
                label: 'Personal Saying/Quote',
                placeholder: 'Share a personal motto, favorite quote, or philosophy that drives your work...',
                required: false
              }}
              value={formData.about?.personalQuote || ''}
              onChange={(value) => {
                const updatedData = {
                  ...formData,
                  about: {
                    ...formData.about,
                    personalQuote: value
                  }
                };
                setFormData(updatedData);
                forceChangeDetection();
              }}
            />
            
            {/* Additional About Information */}
            <InputFactory
              fieldName="additionalInfo"
              config={{
                type: 'Textarea',
                label: 'Additional Information',
                placeholder: 'Any additional information you\'d like to share about yourself, interests, or values...',
                required: false
              }}
              value={formData.about?.additionalInfo || ''}
              onChange={(value) => {
                const updatedData = {
                  ...formData,
                  about: {
                    ...formData.about,
                    additionalInfo: value
                  }
                };
                setFormData(updatedData);
                forceChangeDetection();
              }}
            />
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
      {(activeTab === 'services' || activeTab === 'products' || activeTab === 'testimonials' || activeTab === 'orderMethods') ? (
        <SmartFloatingActionButton 
          icon="EllipsisVerticalIcon"
          label="Toggle quick actions"
          selectedCount={0}
          bulkActions={[]}
          quickActions={[
            ...(hasChanges ? [{ name: 'Save All Changes', icon: 'DocumentArrowDownIcon', action: () => setShowSaveConfirm(true), color: 'bg-green-600' }] : []),
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
            ...(activeTab === 'projects' ? [{ 
              name: 'Add Project', 
              icon: 'PlusIcon', 
              action: () => handleAddItem('projects', {
                name: '',
                description: '',
                images: [],
                details: [],
                category: '',
                technologies: '',
                status: 'completed'
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
            }] : []),
            ...(activeTab === 'orderMethods' ? [{ 
              name: 'Add Method', 
              icon: 'PlusIcon', 
              action: handleAddOrderMethod, 
              color: 'bg-primary-600' 
            }] : [])
          ]}
        />
      ) : (
        <SmartFloatingActionButton 
          icon="EllipsisVerticalIcon"
          label="Toggle quick actions"
          selectedCount={0}
          bulkActions={[]}
          quickActions={[
            ...(hasChanges ? [{ name: 'Save All Changes', icon: 'DocumentArrowDownIcon', action: () => setShowSaveConfirm(true), color: 'bg-green-600' }] : []),
            { name: 'Preview Website', icon: 'EyeIcon', action: () => setShowPreviewModal(true), color: 'bg-blue-600' }
          ]}
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
                <LandingPage />
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
