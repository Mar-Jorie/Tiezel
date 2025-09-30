import { useState, useEffect } from 'react';
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
import ColorPicker from '../components/ColorPicker';
import { useApp } from '../hooks/useApp';
import { toast } from 'react-hot-toast';
import SmartFloatingActionButton from '../components/SmartFloatingActionButton';
import LandingPage from './LandingPage';
import ConfirmationModal from '../components/ConfirmationModal';

const ContentManagement = () => {
  const { isAdmin, landingPageContent, updateLandingPageContent, resetLandingPageContent } = useApp();
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
    const itemToRemove = formData[section][index];
    const updatedData = {
      ...formData,
      [section]: formData[section].filter((_, i) => i !== index)
    };
    
    // Update local state only
    setFormData(updatedData);
    
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
      
      await updateLandingPageContent(formData);
      
      // Log the content update
      auditService.logContentUpdate(
        'Landing Page Content',
        `Updated sections: ${changes.join(', ')}`,
        oldContent,
        newContent
      );
      
      toast.success('Content updated successfully!');
      setHasChanges(false); // Reset changes after successful save
    } catch {
      toast.error('Failed to update content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    // Reset to default content
    resetLandingPageContent();
    
    // Reset form data to default content
    const defaultContent = {
      branding: {
        logo: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=200&h=200&fit=crop&crop=center",
        brandName: "HerbalMed",
        tagline: "Nature's Healing Power",
        primaryColor: "#6589a4"
      },
      hero: {
        title: "Welcome to HerbalMed - Premium Herbal Medicine",
        subtitle: "Discover the healing power of nature with our premium collection of herbal medicines and natural remedies",
        ctaPrimary: "Shop Now",
        ctaSecondary: "Learn More",
        visualTitle: "HerbalMed",
        visualSubtitle: "Pure, natural, effective",
        heroIcon: "ShieldCheckIcon"
      },
      company: {
        name: "HerbalMed",
        description: "Your trusted source for premium herbal medicines and natural healing solutions.",
        address: "123 Wellness Street, Green City, State 12345",
        phone: "(555) 123-4567",
        email: "info@herbalmed.com",
        hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
      },
      services: [
        {
          title: "Premium Quality",
          description: "100% natural, organic herbal medicines",
          icon: "ShieldCheckIcon"
        },
        {
          title: "Expert Consultation",
          description: "Professional herbal medicine guidance",
          icon: "PhoneIcon"
        },
        {
          title: "Fast Delivery",
          description: "Quick and secure shipping worldwide",
          icon: "TruckIcon"
        },
        {
          title: "Quality Content",
          description: "Rigorous fact-checking and verification",
          icon: "StarIcon"
        }
      ],
      products: [
        {
          name: "Turmeric Golden Blend",
          image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=300&fit=crop&crop=center",
          description: "Premium organic turmeric with anti-inflammatory properties",
          benefits: [
            "Reduces inflammation naturally",
            "Supports joint health and mobility",
            "Boosts immune system function",
            "Promotes healthy digestion"
          ]
        },
        {
          name: "Ginger Root Extract", 
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
          description: "Pure ginger root extract for digestive health",
          benefits: [
            "Soothes digestive discomfort",
            "Reduces nausea and motion sickness",
            "Supports healthy metabolism",
            "Natural anti-inflammatory properties"
          ]
        },
        {
          name: "Echinacea Immune Support",
          image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop&crop=center",
          description: "Natural immune system booster from echinacea",
          benefits: [
            "Strengthens immune system",
            "Reduces cold and flu duration",
            "Supports respiratory health",
            "Natural antioxidant properties"
          ]
        },
        {
          name: "Ashwagandha Stress Relief",
          image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop&crop=center",
          description: "Ancient herb for stress management and vitality",
          benefits: [
            "Reduces stress and anxiety",
            "Improves sleep quality",
            "Boosts energy and vitality",
            "Supports adrenal gland function"
          ]
        },
        {
          name: "Ginkgo Biloba Memory",
          image: "https://images.unsplash.com/photo-1594736797933-d0d4b7a8b4b4?w=400&h=300&fit=crop&crop=center",
          description: "Traditional herb for cognitive function and memory",
          benefits: [
            "Enhances memory and focus",
            "Improves blood circulation",
            "Supports brain health",
            "Natural antioxidant protection"
          ]
        }
      ],
      testimonials: [
        {
          name: "Sarah Johnson",
          rating: 5,
          text: "Excellent service and fast delivery. Highly recommended!",
          company: "Tech Solutions Inc."
        },
        {
          name: "Mike Chen",
          rating: 5,
          text: "Great products and outstanding customer support.",
          company: "Digital Innovations"
        },
        {
          name: "Emily Davis",
          rating: 5,
          text: "Best technology information and support I've experienced. Highly recommended!",
          company: "Creative Agency"
        }
      ],
      navigation: {
        link1: 'Features',
        link2: 'Products', 
        link3: 'About',
        link4: 'Contact',
        ctaButton1: 'Learn More',
        ctaButton2: 'Learn More'
      },
      cta: {
        title: 'Ready to Learn More?',
        subtitle: 'Get in touch with us to learn more about our products and services.',
        button1: 'Learn More',
        button2: 'Contact Us'
      },
      about: {
        title: 'About TechStore',
        subtitle: 'Learn more about our company and mission.',
        heading: 'Our Story',
        description: 'We are a technology company dedicated to providing quality products and exceptional service to our customers.',
        feature1: 'Quality Products',
        feature2: 'Expert Support',
        feature3: 'Customer Satisfaction',
        visualTitle: 'Trusted Partner',
        visualSubtitle: 'Your technology needs, our expertise'
      },
      contact: {
        title: 'Get In Touch',
        subtitle: 'Have questions? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
        infoTitle: 'Contact Information',
        phone: '+1 (555) 123-4567',
        email: 'info@techstore.com',
        address: '123 Tech Street, Digital City, DC 12345',
        formTitle: 'Send us a message',
        namePlaceholder: 'Your Name',
        emailPlaceholder: 'Your Email',
        subjectPlaceholder: 'Subject',
        messagePlaceholder: 'Your Message',
        submitButton: 'Send Message'
      },
      modals: {
        shopNow: {
          title: 'How to Order',
          description: 'Ready to start your wellness journey? Here\'s where you can order our premium herbal medicines:',
          methods: [
            {
              title: 'Facebook Page',
              description: 'Message us on Facebook for orders and inquiries'
            },
            {
              title: 'Phone Orders',
              description: 'Call us directly for personalized service'
            },
            {
              title: 'Email Orders',
              description: 'Send us an email with your requirements'
            }
          ]
        }
      },
      sections: {
        features: {
          title: 'Everything You Need to Know',
          subtitle: 'Comprehensive information designed to help you make informed decisions.'
        },
        products: {
          title: 'Featured Herbal Products',
          subtitle: 'Premium quality herbal medicines and natural remedies for your wellness journey.'
        },
        about: {
          title: 'About {company.name}',
          subtitle: 'Why Choose Us?'
        },
        testimonials: {
          title: 'What Our Customers Say',
          subtitle: 'Don\'t just take our word for it - hear from our satisfied customers.'
        },
        footer: {
          copyright: '© 2024 {brandName}. All rights reserved.'
        }
      }
    };
    
    setFormData(defaultContent);
    setHasChanges(false);
    
    // Log content reset
    auditService.logContentUpdate(
      'Landing Page Content',
      'Reset all changes to default values',
      formData,
      defaultContent
    );
    
    toast.success('Content reset to default values');
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
    { id: 'sections', name: 'Section Headers', icon: DocumentTextIcon },
    { id: 'orderMethods', name: 'Order Methods', icon: MegaphoneIcon }
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
              <ColorPicker
                label="Primary Brand Color"
                    value={formData.branding?.primaryColor || '#6589a4'}
                onChange={(value) => handleChange('branding', 'primaryColor', value)}
                required={true}
              />
              
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
                  
                  {/* Basic Product Information */}
                  <div className="space-y-4">
                    <h5 className="text-sm font-medium text-gray-700">Basic Information</h5>
                    
                    {/* Product Name - Full width */}
                    <div>
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
                    </div>
                    
                    {/* Description - Full width */}
                    <div>
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
                    <div>
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
                  
                  {/* Product Benefits */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="text-sm font-medium text-gray-700">Product Benefits</h5>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          const updatedProducts = [...formData.products];
                          if (!updatedProducts[index].benefits) {
                            updatedProducts[index].benefits = [];
                          }
                          updatedProducts[index].benefits.push('');
                          setFormData(prev => ({
                            ...prev,
                            products: updatedProducts
                          }));
                        }}
                      >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Benefit
                      </Button>
                    </div>
                    
                    {product.benefits && product.benefits.length > 0 ? (
                      <div className="space-y-3">
                        {product.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-primary-600 font-semibold text-xs">{benefitIndex + 1}</span>
                              </div>
                              <div className="flex-1">
                                <InputFactory
                                  fieldName={`benefit-${benefitIndex}`}
                                  config={{
                                    type: 'String',
                                    label: '',
                                    placeholder: 'e.g., Boosts immune system naturally',
                                    required: true
                                  }}
                                  value={benefit || ''}
                                  onChange={(value) => {
                                    const updatedProducts = [...formData.products];
                                    if (!updatedProducts[index].benefits) {
                                      updatedProducts[index].benefits = [];
                                    }
                                    updatedProducts[index].benefits[benefitIndex] = value;
                                    setFormData(prev => ({
                                      ...prev,
                                      products: updatedProducts
                                    }));
                                  }}
                                />
                              </div>
                              <div className="flex items-center justify-center h-10">
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => {
                                    const updatedProducts = [...formData.products];
                                    if (updatedProducts[index].benefits) {
                                      updatedProducts[index].benefits.splice(benefitIndex, 1);
                                      setFormData(prev => ({
                                        ...prev,
                                        products: updatedProducts
                                      }));
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
                  
                  {/* Quality Assurance */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h5 className="text-sm font-medium text-gray-700 mb-4">Quality Assurance</h5>
                    <div className="space-y-4">
                      <InputFactory
                        fieldName={`product-${index}-qualityTitle`}
                        config={{
                          type: 'String',
                          label: 'Quality Assurance Title',
                          placeholder: 'e.g., Quality Guarantee',
                          required: true
                        }}
                        value={product.qualityTitle || ''}
                        onChange={(value) => handleArrayChange('products', index, 'qualityTitle', value)}
                      />
                      
                      <InputFactory
                        fieldName={`product-${index}-qualityDescription`}
                        config={{
                          type: 'Textarea',
                          label: 'Quality Assurance Description',
                          placeholder: 'e.g., Premium quality herbal medicine',
                          required: true
                        }}
                        value={product.qualityDescription || ''}
                        onChange={(value) => handleArrayChange('products', index, 'qualityDescription', value)}
                      />
                    </div>
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
                    onChange={(value) => handleChange('modals', 'shopNow', 'title', value)}
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
                    onChange={(value) => handleChange('modals', 'shopNow', 'description', value)}
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
                                onClick={() => handleRemoveItem('modals.shopNow.methods', index)}
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
                                  onChange={(value) => handleArrayChange('modals.shopNow.methods', index, 'title', value)}
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
                                  onChange={(value) => handleArrayChange('modals.shopNow.methods', index, 'description', value)}
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
            }] : []),
            ...(activeTab === 'orderMethods' ? [{ 
              name: 'Add Method', 
              icon: 'PlusIcon', 
              action: () => handleAddItem('modals.shopNow.methods', {
                title: '',
                description: ''
              }), 
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
