import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CogIcon,
  UserIcon,
  ShieldCheckIcon,
  BellIcon,
  GlobeAltIcon,
  KeyIcon,
  CheckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import Button from '../components/Button';
import InputFactory from '../components/InputFactory';
import SelectInput from '../components/SelectInput';
import { useApp } from '../hooks/useApp';
import { toast } from 'react-hot-toast';

const Settings = () => {
  const { isAdmin } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      siteName: 'TechStore',
      siteDescription: 'Your Trusted E-commerce Partner',
      siteUrl: 'https://techstore.com',
      adminEmail: 'admin@techstore.com',
      timezone: 'UTC',
      language: 'en'
    },
    security: {
      sessionTimeout: 30,
      requireTwoFactor: false,
      passwordMinLength: 8,
      loginAttempts: 5,
      lockoutDuration: 15
    },
    notifications: {
      emailNotifications: true,
      contentUpdates: true,
      securityAlerts: true,
      systemMaintenance: false,
      weeklyReports: true
    },
    appearance: {
      theme: 'light',
      primaryColor: '#154D71',
      logoUrl: '/vite.svg',
      faviconUrl: '/favicon.ico'
    }
  });

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  const handleChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Settings saved successfully!');
    } catch {
      toast.error('Failed to save settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSettings({
      general: {
        siteName: 'TechStore',
        siteDescription: 'Your Trusted E-commerce Partner',
        siteUrl: 'https://techstore.com',
        adminEmail: 'admin@techstore.com',
        timezone: 'UTC',
        language: 'en'
      },
      security: {
        sessionTimeout: 30,
        requireTwoFactor: false,
        passwordMinLength: 8,
        loginAttempts: 5,
        lockoutDuration: 15
      },
      notifications: {
        emailNotifications: true,
        contentUpdates: true,
        securityAlerts: true,
        systemMaintenance: false,
        weeklyReports: true
      },
      appearance: {
        theme: 'light',
        primaryColor: '#154D71',
        logoUrl: '/vite.svg',
        faviconUrl: '/favicon.ico'
      }
    });
    toast.success('Settings reset to defaults');
  };

  const tabs = [
    { id: 'general', name: 'General', icon: CogIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'appearance', name: 'Appearance', icon: GlobeAltIcon }
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
              />
              <SelectInput
                label="Timezone"
                options={[
                  { value: 'UTC', label: 'UTC' },
                  { value: 'EST', label: 'Eastern Time' },
                  { value: 'PST', label: 'Pacific Time' },
                  { value: 'GMT', label: 'Greenwich Mean Time' }
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
                  { value: 'de', label: 'German' }
                ]}
                value={settings.general.language}
                onChange={(value) => handleChange('general', 'language', value)}
              />
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputFactory
                fieldName="sessionTimeout"
                config={{
                  type: 'Number',
                  label: 'Session Timeout (minutes)',
                  placeholder: '30',
                  required: true
                }}
                value={settings.security.sessionTimeout}
                onChange={(value) => handleChange('security', 'sessionTimeout', value)}
              />
              <InputFactory
                fieldName="passwordMinLength"
                config={{
                  type: 'Number',
                  label: 'Minimum Password Length',
                  placeholder: '8',
                  required: true
                }}
                value={settings.security.passwordMinLength}
                onChange={(value) => handleChange('security', 'passwordMinLength', value)}
              />
              <InputFactory
                fieldName="loginAttempts"
                config={{
                  type: 'Number',
                  label: 'Max Login Attempts',
                  placeholder: '5',
                  required: true
                }}
                value={settings.security.loginAttempts}
                onChange={(value) => handleChange('security', 'loginAttempts', value)}
              />
              <InputFactory
                fieldName="lockoutDuration"
                config={{
                  type: 'Number',
                  label: 'Lockout Duration (minutes)',
                  placeholder: '15',
                  required: true
                }}
                value={settings.security.lockoutDuration}
                onChange={(value) => handleChange('security', 'lockoutDuration', value)}
              />
              <div className="md:col-span-2">
                <div className="flex items-center">
                  <input
                    id="requireTwoFactor"
                    type="checkbox"
                    checked={settings.security.requireTwoFactor}
                    onChange={(e) => handleChange('security', 'requireTwoFactor', e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="requireTwoFactor" className="ml-2 block text-sm text-gray-700">
                    Require Two-Factor Authentication
                  </label>
                </div>
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
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Appearance Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectInput
                label="Theme"
                options={[
                  { value: 'light', label: 'Light' },
                  { value: 'dark', label: 'Dark' },
                  { value: 'auto', label: 'Auto' }
                ]}
                value={settings.appearance.theme}
                onChange={(value) => handleChange('appearance', 'theme', value)}
              />
              <InputFactory
                fieldName="primaryColor"
                config={{
                  type: 'String',
                  label: 'Primary Color',
                  placeholder: '#154D71',
                  required: true
                }}
                value={settings.appearance.primaryColor}
                onChange={(value) => handleChange('appearance', 'primaryColor', value)}
              />
              <InputFactory
                fieldName="logoUrl"
                config={{
                  type: 'String',
                  label: 'Logo URL',
                  placeholder: '/logo.png',
                  required: true
                }}
                value={settings.appearance.logoUrl}
                onChange={(value) => handleChange('appearance', 'logoUrl', value)}
              />
              <InputFactory
                fieldName="faviconUrl"
                config={{
                  type: 'String',
                  label: 'Favicon URL',
                  placeholder: '/favicon.ico',
                  required: true
                }}
                value={settings.appearance.faviconUrl}
                onChange={(value) => handleChange('appearance', 'faviconUrl', value)}
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
        <div className="border-t border-gray-200 p-6 flex justify-end space-x-4">
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
    </>
  );
};

export default Settings;
