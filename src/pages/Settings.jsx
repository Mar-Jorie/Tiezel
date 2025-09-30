import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CogIcon,
  BellIcon,
  CheckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import Button from '../components/Button';
import InputFactory from '../components/InputFactory';
import SelectInput from '../components/SelectInput';
import ImageUpload from '../components/ImageUpload';
import ColorPicker from '../components/ColorPicker';
import { useApp } from '../hooks/useApp';
import auditService from '../services/auditService';
import { toast } from 'react-hot-toast';
import settingsService from '../services/settingsService';

const Settings = () => {
  const { isAdmin } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(settingsService.getAllSettings());

  const [validationErrors, setValidationErrors] = useState({});

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  const validateSettings = () => {
    const errors = {};
    
    // General validation
    if (!settings.general.siteName.trim()) {
      errors.siteName = 'Site name is required';
    }
    if (!settings.general.siteUrl.trim() || !settings.general.siteUrl.startsWith('http')) {
      errors.siteUrl = 'Valid site URL is required';
    }
    if (!settings.general.adminEmail.trim() || !settings.general.adminEmail.includes('@')) {
      errors.adminEmail = 'Valid admin email is required';
    }
    
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSave = async () => {
    if (!validateSettings()) {
      toast.error('Please fix validation errors before saving');
      return;
    }
    
    setLoading(true);
    try {
      
      // Get old values before saving
      const oldSettings = settingsService.getAllSettings();
      const oldGeneral = oldSettings.general || {};
      
      // Save settings using the service
      const success = settingsService.saveSettings(settings);
      
      if (success) {
        // Log settings update with old and new values
        auditService.logSettingsUpdate('General Settings', '', oldGeneral, settings.general);
        
        // Reload settings to ensure they're updated
        settingsService.reloadSettings();
        
        // Apply dynamic primary color immediately
        const primaryColor = settings.general?.primaryColor || settingsService.getPrimaryColor();
        document.documentElement.style.setProperty('--dynamic-primary-color', primaryColor);
        document.documentElement.style.setProperty('--dynamic-primary-color-dark', primaryColor);
        document.body.classList.add('dynamic-primary');
        
        
        // Manually trigger storage event for same-tab updates
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'app-settings',
          newValue: JSON.stringify(settings),
          oldValue: localStorage.getItem('app-settings')
        }));
        
        // Also trigger a custom event for immediate updates
        window.dispatchEvent(new CustomEvent('settingsUpdated', {
          detail: { settings }
        }));
        
        toast.success('Settings saved successfully! Changes will be applied immediately.');
        setValidationErrors({});
      } else {
        toast.error('Failed to save settings');
      }
    } catch {
      toast.error('Failed to save settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    // Log settings reset
    auditService.logSettingsReset();
    
    settingsService.resetToDefaults();
    setSettings(settingsService.getAllSettings());
    setValidationErrors({});
    
    // Apply default primary color
    const defaultColor = settingsService.getPrimaryColor();
    document.documentElement.style.setProperty('--dynamic-primary-color', defaultColor);
    document.documentElement.style.setProperty('--dynamic-primary-color-dark', defaultColor);
    document.body.classList.add('dynamic-primary');
    
    // Manually trigger storage event for same-tab updates
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'app-settings',
      newValue: JSON.stringify(settingsService.getAllSettings()),
      oldValue: localStorage.getItem('app-settings')
    }));
    
    // Also trigger a custom event for immediate updates
    window.dispatchEvent(new CustomEvent('settingsUpdated', {
      detail: { settings: settingsService.getAllSettings() }
    }));
    
    toast.success('Settings reset to defaults');
  };

  const tabs = [
    { id: 'general', name: 'General', icon: CogIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputFactory
                fieldName="siteName"
                config={{
                  type: 'String',
                  label: 'Site Name',
                  placeholder: 'Enter site name',
                  required: true
                }}
                value={settings.general.siteName}
                onChange={(value) => handleChange('general', 'siteName', value)}
                error={validationErrors.siteName}
              />
              <InputFactory
                fieldName="siteUrl"
                config={{
                  type: 'String',
                  label: 'Site URL',
                  placeholder: 'https://example.com',
                  required: true
                }}
                value={settings.general.siteUrl}
                onChange={(value) => handleChange('general', 'siteUrl', value)}
                error={validationErrors.siteUrl}
              />
              <div className="md:col-span-2">
                <InputFactory
                  fieldName="siteDescription"
                  config={{
                    type: 'String',
                    label: 'Site Description',
                    placeholder: 'Enter site description',
                    required: true
                  }}
                  value={settings.general.siteDescription}
                  onChange={(value) => handleChange('general', 'siteDescription', value)}
                />
              </div>
              <InputFactory
                fieldName="adminEmail"
                config={{
                  type: 'String',
                  label: 'Admin Email',
                  placeholder: 'admin@example.com',
                  required: true,
                  format: 'email'
                }}
                value={settings.general.adminEmail}
                onChange={(value) => handleChange('general', 'adminEmail', value)}
                error={validationErrors.adminEmail}
              />
              <InputFactory
                fieldName="contactPhone"
                config={{
                  type: 'String',
                  label: 'Contact Phone',
                  placeholder: '+1 (555) 123-4567',
                  required: false
                }}
                value={settings.general.contactPhone}
                onChange={(value) => handleChange('general', 'contactPhone', value)}
              />
              <SelectInput
                label="Timezone"
                options={[
                  { value: 'UTC', label: 'UTC' },
                  { value: 'EST', label: 'Eastern Time' },
                  { value: 'PST', label: 'Pacific Time' },
                  { value: 'GMT', label: 'Greenwich Mean Time' },
                  { value: 'CET', label: 'Central European Time' },
                  { value: 'JST', label: 'Japan Standard Time' }
                ]}
                value={settings.general.timezone}
                onChange={(value) => handleChange('general', 'timezone', value)}
              />
              <SelectInput
                label="Language"
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'es', label: 'Spanish' },
                  { value: 'fr', label: 'French' },
                  { value: 'de', label: 'German' },
                  { value: 'it', label: 'Italian' },
                  { value: 'pt', label: 'Portuguese' }
                ]}
                value={settings.general.language}
                onChange={(value) => handleChange('general', 'language', value)}
              />
              <div className="md:col-span-2">
              <InputFactory
                  fieldName="contactAddress"
                config={{
                    type: 'String',
                    label: 'Contact Address',
                    placeholder: '123 Business St, City, State 12345',
                    required: false
                  }}
                  value={settings.general.contactAddress}
                  onChange={(value) => handleChange('general', 'contactAddress', value)}
                />
              </div>
              
              {/* Visual Branding Section */}
              <div className="md:col-span-2">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Visual Branding</h4>
              </div>
              
              <ColorPicker
                label="Primary Brand Color"
                value={settings.general.primaryColor}
                onChange={(value) => handleChange('general', 'primaryColor', value)}
                required={true}
              />
              
              <div className="md:col-span-2">
                <ImageUpload
                  label="Logo"
                  value={settings.general.logoUrl}
                  onChange={(value) => handleChange('general', 'logoUrl', value)}
                  accept="image/*"
                  placeholder="Upload your logo"
                />
              </div>
            </div>
          </div>
        );


      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive notifications via email</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.emailNotifications}
                  onChange={(e) => handleChange('notifications', 'emailNotifications', e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Content Updates</h4>
                  <p className="text-sm text-gray-600">Notify when content is updated</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.contentUpdates}
                  onChange={(e) => handleChange('notifications', 'contentUpdates', e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Security Alerts</h4>
                  <p className="text-sm text-gray-600">Notify about security events</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.securityAlerts}
                  onChange={(e) => handleChange('notifications', 'securityAlerts', e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">System Maintenance</h4>
                  <p className="text-sm text-gray-600">Notify about maintenance windows</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.systemMaintenance}
                  onChange={(e) => handleChange('notifications', 'systemMaintenance', e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Weekly Reports</h4>
                  <p className="text-sm text-gray-600">Receive weekly activity reports</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.weeklyReports}
                  onChange={(e) => handleChange('notifications', 'weeklyReports', e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Notification Sound</h4>
                  <p className="text-sm text-gray-600">Play sound for browser notifications</p>
            </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.notificationSound}
                  onChange={(e) => handleChange('notifications', 'notificationSound', e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
          </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectInput
                  label="Email Frequency"
                options={[
                    { value: 'immediate', label: 'Immediate' },
                    { value: 'hourly', label: 'Hourly' },
                    { value: 'daily', label: 'Daily' },
                    { value: 'weekly', label: 'Weekly' }
                  ]}
                  value={settings.notifications.emailFrequency}
                  onChange={(value) => handleChange('notifications', 'emailFrequency', value)}
                />
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
          Settings
        </h1>
        <p className="text-gray-600">
          Configure your landing page system settings and preferences.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        {/* Settings Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Main actions */}
            <div className="flex flex-wrap gap-3">
          <Button
            variant="secondaryOutline"
            size="md"
            onClick={handleReset}
          >
            Reset to Defaults
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
                Save Settings
              </div>
            )}
          </Button>
            </div>
          </div>

          {/* Validation Errors Display */}
          {Object.keys(validationErrors).length > 0 && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="text-sm font-medium text-red-800 mb-2">Validation Errors:</h4>
              <ul className="text-sm text-red-700 space-y-1">
                {Object.entries(validationErrors).map(([field, error]) => (
                  <li key={field}>• {field}: {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;
