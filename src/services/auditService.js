import { toast } from 'react-hot-toast';

class AuditService {
  constructor() {
    this.auditLogs = this.loadAuditLogs();
  }

  // Load audit logs from localStorage
  loadAuditLogs() {
    try {
      const stored = localStorage.getItem('audit-logs');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading audit logs:', error);
      return [];
    }
  }

  // Save audit logs to localStorage
  saveAuditLogs() {
    try {
      localStorage.setItem('audit-logs', JSON.stringify(this.auditLogs));
      
      // Dispatch custom event for real-time updates
      window.dispatchEvent(new CustomEvent('auditLogUpdated'));
    } catch (error) {
      console.error('Error saving audit logs:', error);
    }
  }

  // Get current user info
  getCurrentUser() {
    try {
      const user = localStorage.getItem('current-user');
      return user ? JSON.parse(user) : { email: 'admin@techstore.com', name: 'Admin' };
    } catch (error) {
      return { email: 'admin@techstore.com', name: 'Admin' };
    }
  }

  // Get client IP (simulated for demo)
  getClientIP() {
    // In a real application, this would come from the server
    return '192.168.1.100';
  }

  // Get user agent
  getUserAgent() {
    return navigator.userAgent;
  }

  // Create audit log entry
  createLogEntry(action, resource, details, metadata = {}) {
    const user = this.getCurrentUser();
    const timestamp = new Date();
    
    const logEntry = {
      id: Date.now() + Math.random(), // Unique ID
      timestamp: timestamp.toISOString(),
      user: user.email,
      userName: user.name,
      action: action,
      resource: resource,
      details: details,
      ipAddress: this.getClientIP(),
      userAgent: this.getUserAgent(),
      metadata: metadata
    };

    // Add to beginning of array (most recent first)
    this.auditLogs.unshift(logEntry);
    
    // Keep only last 1000 entries to prevent localStorage bloat
    if (this.auditLogs.length > 1000) {
      this.auditLogs = this.auditLogs.slice(0, 1000);
    }

    this.saveAuditLogs();
    
    // Show success toast for important actions
    if (['Login', 'Logout', 'Settings Updated', 'Content Created', 'Content Deleted'].includes(action)) {
      toast.success(`${action}: ${resource}`);
    }

    return logEntry;
  }

  // Get all audit logs
  getAllLogs() {
    return this.auditLogs;
  }

  // Get logs by action
  getLogsByAction(action) {
    return this.auditLogs.filter(log => log.action === action);
  }

  // Get logs by user
  getLogsByUser(userEmail) {
    return this.auditLogs.filter(log => log.user === userEmail);
  }

  // Get logs by date range
  getLogsByDateRange(startDate, endDate) {
    return this.auditLogs.filter(log => {
      const logDate = new Date(log.timestamp);
      return logDate >= startDate && logDate <= endDate;
    });
  }

  // Clear all logs (admin function)
  clearAllLogs() {
    this.auditLogs = [];
    this.saveAuditLogs();
    toast.success('All audit logs cleared');
  }

  // Export logs as JSON
  exportLogs(format = 'json') {
    const logs = this.auditLogs;
    const timestamp = new Date().toISOString().split('T')[0];
    
    if (format === 'json') {
      const dataStr = JSON.stringify(logs, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `audit-logs-${timestamp}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
    
    return logs;
  }

  // Specific logging methods for different actions
  
  // Authentication actions
  logLogin() {
    return this.createLogEntry(
      'Login',
      'System Access',
      'User successfully logged into admin panel',
      { type: 'authentication' }
    );
  }

  logLogout() {
    return this.createLogEntry(
      'Logout',
      'System Access',
      'User logged out of admin panel',
      { type: 'authentication' }
    );
  }

  logProfileUpdate(action, details, oldValues = {}, newValues = {}) {
    // Track only the fields that actually changed
    const changedFields = [];
    const fieldChanges = {};
    
    Object.keys(newValues).forEach(key => {
      if (JSON.stringify(oldValues[key]) !== JSON.stringify(newValues[key])) {
        changedFields.push(key);
        fieldChanges[key] = {
          old: oldValues[key],
          new: newValues[key]
        };
      }
    });
    
    const changesText = changedFields.length > 0 
      ? `Updated profile: ${changedFields.join(', ')}`
      : details;
    
    return this.createLogEntry(
      action,
      'Profile Management',
      changesText,
      { 
        type: 'profile', 
        changes: changedFields,
        fieldChanges: fieldChanges,
        oldValues: oldValues,
        newValues: newValues
      }
    );
  }


  logHelpRequest(subject, message) {
    return this.createLogEntry(
      'Help Request',
      'Support',
      `Help request submitted: ${subject}`,
      { type: 'support', subject: subject, message: message }
    );
  }

  logEmailSent(action, category, details, metadata = {}) {
    return this.createLogEntry(
      action,
      category,
      details,
      { type: 'email', ...metadata }
    );
  }

  // Content Management actions
  logContentUpdate(section, changes, oldValues = {}, newValues = {}) {
    // Track only the fields that actually changed
    const changedFields = [];
    const fieldChanges = {};
    
    Object.keys(newValues).forEach(key => {
      if (JSON.stringify(oldValues[key]) !== JSON.stringify(newValues[key])) {
        changedFields.push(key);
        fieldChanges[key] = {
          old: oldValues[key],
          new: newValues[key]
        };
      }
    });
    
    const changesText = changedFields.length > 0 
      ? `Updated ${section}: ${changedFields.join(', ')}`
      : `Updated ${section}: ${changes}`;
    
    return this.createLogEntry(
      'Content Updated',
      section,
      changesText,
      { 
        type: 'content', 
        section,
        changedFields,
        fieldChanges,
        changes
      }
    );
  }

  logContentCreate(section, details) {
    return this.createLogEntry(
      'Content Created',
      section,
      `Created new ${section}: ${details}`,
      { type: 'content' }
    );
  }

  logContentDelete(section, details) {
    return this.createLogEntry(
      'Content Deleted',
      section,
      `Deleted ${section}: ${details}`,
      { type: 'content' }
    );
  }

  // FAQ Management actions
  logFAQCreate(question) {
    return this.createLogEntry(
      'FAQ Created',
      'FAQ Management',
      `Created new FAQ: ${question}`,
      { type: 'faq' }
    );
  }

  logFAQUpdate(question) {
    return this.createLogEntry(
      'FAQ Updated',
      'FAQ Management',
      `Updated FAQ: ${question}`,
      { type: 'faq' }
    );
  }

  logFAQDelete(question) {
    return this.createLogEntry(
      'FAQ Deleted',
      'FAQ Management',
      `Deleted FAQ: ${question}`,
      { type: 'faq' }
    );
  }

  logFAQStatusChange(question, newStatus) {
    return this.createLogEntry(
      'FAQ Status Changed',
      'FAQ Management',
      `Changed status of "${question}" to ${newStatus}`,
      { type: 'faq', status: newStatus }
    );
  }

  logBulkFAQStatusChange(action, count) {
    return this.createLogEntry(
      'Bulk FAQ Status Change',
      'FAQ Management',
      `Bulk ${action} ${count} FAQ(s)`,
      { type: 'faq', action: 'bulk_status_change', count, statusAction: action }
    );
  }

  logBulkFAQDelete(count) {
    return this.createLogEntry(
      'Bulk FAQ Delete',
      'FAQ Management',
      `Bulk deleted ${count} FAQ(s)`,
      { type: 'faq', action: 'bulk_delete', count }
    );
  }

  logFAQExport(format, count) {
    return this.createLogEntry(
      'FAQ Export',
      'FAQ Management',
      `Exported ${count} FAQ(s) as ${format}`,
      { type: 'faq', action: 'export', format, count }
    );
  }

  // Settings actions
  logSettingsUpdate(section, changes, oldValues = {}, newValues = {}) {
    // Track only the fields that actually changed
    const changedFields = [];
    const fieldChanges = {};
    
    Object.keys(newValues).forEach(key => {
      if (oldValues[key] !== newValues[key]) {
        changedFields.push(key);
        fieldChanges[key] = {
          old: oldValues[key],
          new: newValues[key]
        };
      }
    });
    
    const changesText = changedFields.length > 0 
      ? `Updated ${section}: ${changedFields.join(', ')}`
      : `Updated ${section} settings`;
    
    return this.createLogEntry(
      'Settings Updated',
      section,
      changesText,
      { 
        type: 'settings', 
        section,
        changedFields,
        fieldChanges
      }
    );
  }

  logSettingsReset() {
    return this.createLogEntry(
      'Settings Reset',
      'System Settings',
      'Reset all settings to default values',
      { type: 'settings' }
    );
  }

  // System actions
  logSystemAction(action, details) {
    return this.createLogEntry(
      'System Action',
      action,
      details,
      { type: 'system' }
    );
  }

  // Export actions
  logExport(type, resource, count) {
    return this.createLogEntry(
      'Data Exported',
      resource,
      `Exported ${count} ${resource} as ${type}`,
      { type: 'export', format: type, count }
    );
  }

  // Search and filter actions
  logSearch(query, results) {
    return this.createLogEntry(
      'Search Performed',
      'System Search',
      `Searched for "${query}" - ${results} results found`,
      { type: 'search', query, results }
    );
  }

  logFilter(filterType, filterValue) {
    return this.createLogEntry(
      'Filter Applied',
      'Data Filtering',
      `Applied ${filterType} filter: ${filterValue}`,
      { type: 'filter', filterType, filterValue }
    );
  }
}

const auditService = new AuditService();
export default auditService;
