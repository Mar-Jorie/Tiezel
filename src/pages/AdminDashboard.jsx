import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  ArrowPathIcon, 
  CheckIcon, 
  PencilIcon,
  EyeIcon,
  TrashIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import Button from '../components/Button';
import InputFactory from '../components/InputFactory';
import SelectInput from '../components/SelectInput';
import { useApp } from '../hooks/useApp';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  const { isAdmin, adminUser, logoutAdmin, landingPageContent, updateLandingPageContent } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

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
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleAddItem = (section, newItem) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const handleRemoveItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateLandingPageContent(formData);
      toast.success('Content updated successfully!');
    } catch {
      toast.error('Failed to update content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  if (!isAdmin) {
    return null;
  }

  const tabs = [
    { id: 'hero', name: 'Hero Section', icon: '🏠' },
    { id: 'company', name: 'Company Info', icon: '🏢' },
    { id: 'services', name: 'Services', icon: '⚙️' },
    { id: 'products', name: 'Products', icon: '🛍️' },
    { id: 'testimonials', name: 'Testimonials', icon: '⭐' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'hero':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Hero Section</h3>
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
              <InputFactory
                fieldName="ctaPrimary"
                config={{
                  type: 'String',
                  label: 'Primary CTA Button',
                  placeholder: 'Enter primary button text',
                  required: true
                }}
                value={formData.hero?.ctaPrimary || ''}
                onChange={(value) => handleChange('hero', 'ctaPrimary', value)}
              />
              <InputFactory
                fieldName="ctaSecondary"
                config={{
                  type: 'String',
                  label: 'Secondary CTA Button',
                  placeholder: 'Enter secondary button text',
                  required: true
                }}
                value={formData.hero?.ctaSecondary || ''}
                onChange={(value) => handleChange('hero', 'ctaSecondary', value)}
              />
            </div>
          </div>
        );

      case 'company':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
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
              <div className="md:col-span-2">
                <InputFactory
                  fieldName="description"
                  config={{
                    type: 'String',
                    label: 'Company Description',
                    placeholder: 'Enter company description',
                    required: true
                  }}
                  value={formData.company?.description || ''}
                  onChange={(value) => handleChange('company', 'description', value)}
                />
              </div>
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
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Services</h3>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleAddItem('services', {
                  title: 'New Service',
                  description: 'Service description',
                  icon: '🔧'
                })}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Service
              </Button>
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <InputFactory
                      fieldName={`service-${index}-description`}
                      config={{
                        type: 'String',
                        label: 'Description',
                        placeholder: 'Enter service description',
                        required: true
                      }}
                      value={service.description}
                      onChange={(value) => handleArrayChange('services', index, 'description', value)}
                    />
                    <InputFactory
                      fieldName={`service-${index}-icon`}
                      config={{
                        type: 'String',
                        label: 'Icon',
                        placeholder: 'Enter emoji icon',
                        required: true
                      }}
                      value={service.icon}
                      onChange={(value) => handleArrayChange('services', index, 'icon', value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Featured Products</h3>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleAddItem('products', {
                  name: 'New Product',
                  price: '$0',
                  description: 'Product description',
                  image: '/api/placeholder/300/200'
                })}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Product
              </Button>
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
                        type: 'String',
                        label: 'Price',
                        placeholder: 'Enter price',
                        required: true
                      }}
                      value={product.price}
                      onChange={(value) => handleArrayChange('products', index, 'price', value)}
                    />
                    <div className="md:col-span-2">
                      <InputFactory
                        fieldName={`product-${index}-description`}
                        config={{
                          type: 'String',
                          label: 'Description',
                          placeholder: 'Enter product description',
                          required: true
                        }}
                        value={product.description}
                        onChange={(value) => handleArrayChange('products', index, 'description', value)}
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
              <h3 className="text-lg font-semibold text-gray-900">Customer Testimonials</h3>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleAddItem('testimonials', {
                  name: 'Customer Name',
                  rating: 5,
                  text: 'Testimonial text',
                  company: 'Company Name'
                })}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Testimonial
              </Button>
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
                          type: 'String',
                          label: 'Testimonial Text',
                          placeholder: 'Enter testimonial text',
                          required: true
                        }}
                        value={testimonial.text}
                        onChange={(value) => handleArrayChange('testimonials', index, 'text', value)}
                      />
                    </div>
                    <SelectInput
                      label="Rating"
                      options={[
                        { value: 1, label: '1 Star' },
                        { value: 2, label: '2 Stars' },
                        { value: 3, label: '3 Stars' },
                        { value: 4, label: '4 Stars' },
                        { value: 5, label: '5 Stars' }
                      ]}
                      value={testimonial.rating}
                      onChange={(value) => handleArrayChange('testimonials', index, 'rating', value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Site
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {adminUser?.name}</span>
              <Button variant="danger" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="mr-3">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              {renderTabContent()}
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end space-x-4">
              <Button
                variant="secondaryOutline"
                size="md"
                onClick={() => window.location.reload()}
              >
                Reset Changes
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleSave}
                disabled={loading}
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
      </div>
    </div>
  );
};

export default AdminDashboard;
