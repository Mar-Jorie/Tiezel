import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  Bars3Icon, 
  BellIcon, 
  ChevronDownIcon, 
  UserIcon, 
  QuestionMarkCircleIcon, 
  ArrowRightOnRectangleIcon,
  XMarkIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import InputFactory from '../InputFactory';
import { MainLayoutContext } from './MainLayout';
import { useApp } from '../../hooks/useApp';
import ConfirmationModal from '../ConfirmationModal';
import auditService from '../../services/auditService';

const Header = ({ onToggleSidebar }) => {
  const { show, setShow, isMobile } = useContext(MainLayoutContext);
  const { adminUser, logoutAdmin } = useApp();
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showProfileSaveConfirm, setShowProfileSaveConfirm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  });
  
  // Help form state
  const [helpForm, setHelpForm] = useState({
    supportName: '',
    supportEmail: '',
    supportSubject: '',
    supportMessage: ''
  });

  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleProfileAction = (action) => {
    setShowProfileDropdown(false);
    if (action === 'profile') {
      setShowProfileModal(true);
    } else if (action === 'help') {
      setShowHelpModal(true);
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleHelpFormChange = (field, value) => {
    setHelpForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Profile edit handlers
  const handleEditProfile = () => {
    setIsEditingProfile(true);
    // Initialize form with current user data
    setEditFormData({
      firstName: adminUser?.firstName || '',
      lastName: adminUser?.lastName || '',
      email: adminUser?.email || '',
      role: getUserRoleName(adminUser) || 'Administrator'
    });
  };

  const handleEditFormChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    // Show confirmation modal instead of saving directly
    setShowProfileSaveConfirm(true);
  };

  const confirmProfileSave = () => {
    // Log profile update
    auditService.logProfileUpdate(
      'Profile Updated',
      `Updated profile information: ${editFormData.firstName} ${editFormData.lastName}`,
      {
        firstName: adminUser?.firstName || '',
        lastName: adminUser?.lastName || '',
        email: adminUser?.email || ''
      },
      editFormData
    );
    
    // Here you would typically save to backend
    
    // Update the adminUser state to reflect changes in the modal
    // This ensures the modal shows updated information immediately
    if (adminUser) {
      adminUser.firstName = editFormData.firstName;
      adminUser.lastName = editFormData.lastName;
      adminUser.email = editFormData.email;
      adminUser.name = `${editFormData.firstName} ${editFormData.lastName}`;
    }
    
    // Close edit mode and confirmation modal
    setIsEditingProfile(false);
    setShowProfileSaveConfirm(false);
    
    // Show success toast
    toast.success('Profile updated successfully!');
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setEditFormData({
      firstName: '',
      lastName: '',
      email: '',
      role: ''
    });
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const getUserDisplayName = (user) => {
    return user?.name || user?.email || 'Admin';
  };

  const getUserRoleName = (user) => {
    return 'Administrator';
  };

  const getInitials = (name) => {
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      <header className="sticky top-0 z-40 h-16 bg-white border-b border-gray-200 shadow-card">
        <div className="flex items-center justify-between h-full px-4 sm:px-6">
          {/* Left: Hamburger Menu */}
          <div className="flex items-center">
            <button
              onClick={() => setShow(!show)}
              className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation relative z-50 min-w-[44px] min-h-[44px]"
              aria-label="Toggle sidebar"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
          
          {/* Center: Empty - Logo Removed */}
          <div className="flex-1 flex justify-center">
            {/* Logo removed per user request */}
          </div>
          
          {/* Right: Notifications and Profile */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={handleNotificationClick}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <BellIcon className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto scrollbar-hide">
                    <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">New content update</p>
                          <p className="text-xs text-gray-500 mt-1">Your website content has been updated successfully.</p>
                          <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">System backup completed</p>
                          <p className="text-xs text-gray-500 mt-1">Your data has been backed up successfully.</p>
                          <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-50">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Maintenance scheduled</p>
                          <p className="text-xs text-gray-500 mt-1">System maintenance is scheduled for tomorrow at 2 AM.</p>
                          <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown - Responsive Content */}
            <div className="relative">
              <button
                onClick={handleProfileClick}
                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors min-w-[44px] min-h-[44px]"
              >
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                  {getInitials(getUserDisplayName(adminUser))}
                </div>
                {/* Desktop: Show name and role */}
                {!isMobile && (
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">
                      {getUserDisplayName(adminUser) || 'User'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {getUserRoleName(adminUser) || 'Role'}
                    </div>
                  </div>
                )}
                <ChevronDownIcon className="h-4 w-4 transition-transform duration-200" />
              </button>

              {/* Profile Dropdown Menu - MANDATORY RESPONSIVE PATTERN */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  {/* Desktop: View Profile + Help only */}
                  {!isMobile && (
                    <div>
                      <button 
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        onClick={() => handleProfileAction('profile')}
                      >
                        <UserIcon className="h-4 w-4 text-gray-400" />
                        <span>View Profile</span>
                      </button>
                      <button 
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        onClick={() => handleProfileAction('help')}
                      >
                        <QuestionMarkCircleIcon className="h-4 w-4 text-gray-400" />
                        <span>Help & Support</span>
                      </button>
                    </div>
                  )}
                  
                  {/* Mobile: View Profile + Help + Logout */}
                  {isMobile && (
                    <div>
                      <button 
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        onClick={() => handleProfileAction('profile')}
                      >
                        <UserIcon className="h-4 w-4 text-gray-400" />
                        <span>View Profile</span>
                      </button>
                      <button 
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        onClick={() => handleProfileAction('help')}
                      >
                        <QuestionMarkCircleIcon className="h-4 w-4 text-gray-400" />
                        <span>Help & Support</span>
                      </button>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button 
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                        onClick={() => setShowLogoutConfirm(true)}
                      >
                        <ArrowRightOnRectangleIcon className="h-4 w-4 text-red-400" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            {/* Backdrop */}
            <div className="fixed inset-0 z-40 transition-opacity bg-black/50" onClick={() => setShowProfileModal(false)}></div>
            
            {/* Modal Content */}
            <div className="relative z-50 w-full max-w-md overflow-hidden text-left transition-all transform bg-white shadow-xl rounded-xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white text-xl font-semibold shadow-sm">
                    {getInitials(getUserDisplayName(adminUser))}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{getUserDisplayName(adminUser) || 'User'}</h3>
                    <p className="text-sm text-gray-600">{getUserRoleName(adminUser) || 'Administrator'}</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">Online</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                {!isEditingProfile ? (
                  // View Mode
                  <div className="space-y-5">
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <EnvelopeIcon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Email Address</p>
                        <p className="text-sm text-gray-900 truncate">{adminUser?.email || 'user@example.com'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <UserIcon className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Role</p>
                        <p className="text-sm text-gray-900">{getUserRoleName(adminUser) || 'Administrator'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="h-4 w-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Last Login</p>
                        <p className="text-sm text-gray-900">Today at 2:30 PM</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Edit Mode
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <InputFactory
                        fieldName="firstName"
                        config={{
                          type: 'String',
                          label: 'First Name',
                          placeholder: 'Enter first name',
                          required: true
                        }}
                        value={editFormData.firstName}
                        onChange={(value) => handleEditFormChange('firstName', value)}
                      />
                      <InputFactory
                        fieldName="lastName"
                        config={{
                          type: 'String',
                          label: 'Last Name',
                          placeholder: 'Enter last name',
                          required: true
                        }}
                        value={editFormData.lastName}
                        onChange={(value) => handleEditFormChange('lastName', value)}
                      />
                    </div>
                    
                    <InputFactory
                      fieldName="email"
                      config={{
                        type: 'String',
                        label: 'Email Address',
                        placeholder: 'Enter email address',
                        required: true,
                        format: 'email'
                      }}
                      value={editFormData.email}
                      onChange={(value) => handleEditFormChange('email', value)}
                    />
                    
                    <InputFactory
                      fieldName="role"
                      config={{
                        type: 'Select',
                        label: 'Role',
                        placeholder: 'Select role',
                        required: true,
                        options: [
                          { value: 'admin', label: 'Administrator' },
                          { value: 'manager', label: 'Manager' },
                          { value: 'user', label: 'User' }
                        ]
                      }}
                      value={editFormData.role}
                      onChange={(value) => handleEditFormChange('role', value)}
                    />
                  </div>
                )}
              </div>
              
              {/* Actions */}
              <div className="px-6 pb-6">
                <div className="flex space-x-3">
                  {!isEditingProfile ? (
                    // View Mode Buttons
                    <>
                      <button
                        onClick={() => setShowProfileModal(false)}
                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        Close
                      </button>
                      <button 
                        onClick={handleEditProfile}
                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                      >
                        Edit Profile
                      </button>
                    </>
                  ) : (
                    // Edit Mode Buttons
                    <>
                      <button
                        onClick={handleCancelEdit}
                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSaveProfile}
                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                      >
                        Save Changes
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help & Support Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            {/* Backdrop */}
            <div className="fixed inset-0 z-40 transition-opacity bg-black/50" onClick={() => setShowHelpModal(false)}></div>
            
            {/* Modal Content */}
            <div className="relative z-50 w-full max-w-2xl overflow-hidden text-left transition-all transform bg-white shadow-xl rounded-xl flex flex-col h-[600px]">
              {/* Fixed Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
                <h3 className="text-lg font-semibold text-gray-900">Help & Support</h3>
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
              
              <div className="space-y-6">
                {/* Contact Form - Full Width Row (First) */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Send us a Message</h4>
                  
                  <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    // Log help request and email sending as one action
                    auditService.logEmailSent(
                      'Help Request Email',
                      'Support',
                      `Help request email sent successfully: ${helpForm.supportSubject}`,
                      { 
                        type: 'email', 
                        action: 'help_request_sent',
                        recipient: 'support@company.com',
                        subject: helpForm.supportSubject,
                        sender: helpForm.supportEmail,
                        message: helpForm.supportMessage
                      }
                    );
                    
                    
                    // Show success toast
                    toast.success('Help request sent successfully!');
                    
                    setShowHelpModal(false);
                  }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputFactory
                        fieldName="supportName"
                        config={{
                          type: 'String',
                          label: 'Name',
                          placeholder: 'Enter your name',
                          required: true
                        }}
                        value={helpForm.supportName}
                        onChange={(value) => handleHelpFormChange('supportName', value)}
                      />
                      
                      <InputFactory
                        fieldName="supportEmail"
                        config={{
                          type: 'String',
                          label: 'Email',
                          placeholder: 'Enter your email',
                          required: true,
                          format: 'email'
                        }}
                        value={helpForm.supportEmail}
                        onChange={(value) => handleHelpFormChange('supportEmail', value)}
                      />
                    </div>
                    
                    <InputFactory // Converted to InputFactory
                      fieldName="supportSubject"
                      config={{
                        type: 'Select',
                        label: 'Subject',
                        placeholder: 'Select a subject',
                        required: true,
                        options: [
                          { value: 'technical', label: 'Technical Issue' },
                          { value: 'billing', label: 'Billing Question' },
                          { value: 'feature', label: 'Feature Request' },
                          { value: 'general', label: 'General Support' }
                        ]
                      }}
                      value={helpForm.supportSubject}
                      onChange={(value) => handleHelpFormChange('supportSubject', value)}
                    />
                    
                    <InputFactory // Converted to InputFactory
                      fieldName="supportMessage"
                      config={{
                        type: 'Textarea',
                        label: 'Message',
                        placeholder: 'Describe your issue or question...',
                        required: true
                      }}
                      value={helpForm.supportMessage}
                      onChange={(value) => handleHelpFormChange('supportMessage', value)}
                    />
                    
                    <button
                      type="submit"
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors"
                    >
                      <EnvelopeIcon className="h-4 w-4 mr-2 inline" />
                      Send Message
                    </button>
                  </form>
                </div>

                {/* Contact Information - Simplified */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Get in Touch</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <EnvelopeIcon className="h-4 w-4 text-gray-500" />
                      <a href="mailto:support@company.com" className="text-sm text-primary-600 hover:text-primary-700">
                        support@company.com
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <PhoneIcon className="h-4 w-4 text-gray-500" />
                      <a href="tel:+1234567890" className="text-sm text-primary-600 hover:text-primary-700">
                        +1 (234) 567-890
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <a href="https://facebook.com/company" target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:text-primary-700">
                        facebook.com/company
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              
              {/* Fixed Modal Actions */}
              <div className="flex justify-end p-6 border-t border-gray-200 flex-shrink-0">
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sign Out Confirmation Modal */}
      <ConfirmationModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Sign out"
        message="Are you sure you want to sign out?"
        confirmLabel="Sign out"
        cancelLabel="Cancel"
        variant="danger"
      />

      {/* Profile Save Confirmation Modal */}
      <ConfirmationModal
        isOpen={showProfileSaveConfirm}
        onClose={() => setShowProfileSaveConfirm(false)}
        onConfirm={confirmProfileSave}
        title="Save Profile Changes"
        message="Are you sure you want to save these profile changes?"
        confirmLabel="Save Changes"
        cancelLabel="Cancel"
        variant="info"
      />
    </>
  );
};

export default Header;
