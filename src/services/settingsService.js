// Settings Service - Centralized settings management
class SettingsService {
  constructor() {
    // Default settings
    this.defaultSettings = {
      general: {
        siteName: 'Tiezel',
        siteDescription: 'Personal Portfolio Management System',
        siteUrl: 'https://tiezel.com',
        adminEmail: 'admin@tiezel.com',
        timezone: 'UTC',
        language: 'en',
        contactPhone: '+1 (555) 123-4567',
        contactAddress: '123 Business St, City, State 12345',
        primaryColor: '#154D71',
        logoUrl: '/vite.svg'
      },
      notifications: {
        emailNotifications: true,
        contentUpdates: true,
        securityAlerts: true,
        systemMaintenance: false,
        weeklyReports: true,
        emailFrequency: 'immediate',
        notificationSound: true
      }
    };

    // Load settings from localStorage or use defaults
    this.settings = this.loadSettings();
  }

  // Load settings from localStorage
  loadSettings() {
    try {
      const saved = localStorage.getItem('app-settings');
      if (saved) {
        return { ...this.defaultSettings, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
    return { ...this.defaultSettings };
  }

  // Save settings to localStorage
  saveSettings(newSettings) {
    try {
      this.settings = { ...this.settings, ...newSettings };
      localStorage.setItem('app-settings', JSON.stringify(this.settings));
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  }

  // Get all settings
  getAllSettings() {
    return { ...this.settings };
  }

  // Reload settings from localStorage (useful after external changes)
  reloadSettings() {
    this.settings = this.loadSettings();
    return this.settings;
  }

  // Get specific setting by path (e.g., 'general.siteName')
  getSetting(path) {
    const keys = path.split('.');
    let value = this.settings;
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return null;
      }
    }
    return value;
  }

  // Update specific setting
  updateSetting(path, value) {
    const keys = path.split('.');
    const newSettings = { ...this.settings };
    let current = newSettings;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    return this.saveSettings(newSettings);
  }

  // Reset to defaults
  resetToDefaults() {
    this.settings = { ...this.defaultSettings };
    localStorage.removeItem('app-settings');
    return true;
  }

  // Get site name for display
  getSiteName() {
    return this.getSetting('general.siteName') || 'Tiezel';
  }

  // Get site description
  getSiteDescription() {
    return this.getSetting('general.siteDescription') || 'Personal Portfolio Management System';
  }

  // Get primary color for theming
  getPrimaryColor() {
    return this.getSetting('general.primaryColor') || '#154D71';
  }

  // Get logo URL
  getLogoUrl() {
    return this.getSetting('general.logoUrl') || '/vite.svg';
  }

  // Get contact information
  getContactInfo() {
    return {
      phone: this.getSetting('general.contactPhone'),
      address: this.getSetting('general.contactAddress'),
      email: this.getSetting('general.adminEmail')
    };
  }

  // Get notification preferences
  getNotificationSettings() {
    return this.getSetting('notifications') || {};
  }

  // Check if email notifications are enabled
  isEmailNotificationsEnabled() {
    return this.getSetting('notifications.emailNotifications') === true;
  }

  // Check if sound notifications are enabled
  isSoundNotificationsEnabled() {
    return this.getSetting('notifications.notificationSound') === true;
  }

  // Get timezone
  getTimezone() {
    return this.getSetting('general.timezone') || 'UTC';
  }

  // Get language
  getLanguage() {
    return this.getSetting('general.language') || 'en';
  }
}

// Create and export singleton instance
const settingsService = new SettingsService();
export default settingsService;
