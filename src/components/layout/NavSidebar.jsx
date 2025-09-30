import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  GlobeAltIcon, 
  DocumentTextIcon, 
  CogIcon, 
  ClockIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline';
import { useApp } from '../../hooks/useApp';
import Button from '../Button';
import ConfirmationModal from '../ConfirmationModal';

const NavSidebar = ({ isMobile, setShow }) => {
  const { adminUser, logoutAdmin } = useApp();
  const location = useLocation();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogout = () => {
    logoutAdmin();
    setShowLogoutConfirm(false);
  };

  const handleNavClick = () => {
    if (isMobile) {
      setShow?.(false);
    }
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

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: HomeIcon,
      current: location.pathname === '/admin/dashboard'
    },
    {
      name: 'Content Management',
      href: '/admin/content',
      icon: DocumentTextIcon,
      current: location.pathname === '/admin/content'
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: CogIcon,
      current: location.pathname === '/admin/settings'
    },
    {
      name: 'Audit Trail',
      href: '/admin/audit-trail',
      icon: ClockIcon,
      current: location.pathname === '/admin/audit-trail'
    }
  ];

  return (
    <div className="bg-white border-r border-gray-200 h-full w-80 max-w-[80vw] lg:w-[270px]">
      <div className="flex flex-col h-full">
        {/* Header Section - Responsive */}
        <div className="flex flex-col p-6 border-b border-gray-200">
          {/* Mobile: User Profile */}
          <div className="lg:hidden">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white text-lg font-medium">
                {getInitials(getUserDisplayName(adminUser))}
              </div>
              <div>
                <h1 className="text-sm font-medium text-gray-900">
                  {getUserDisplayName(adminUser)}
                </h1>
                <p className="text-xs text-gray-500">
                  {getUserRoleName(adminUser)}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop: System Logo and Name */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src="/vite.svg" alt="Logo" className="w-6 h-6 object-contain" />
              </div>
              <div>
                <h1 className="text-sm font-medium text-gray-900">
                  Landing Page System
                </h1>
                <p className="text-xs text-gray-500">
                  Content Management
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={handleNavClick}
              className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
                item.current
                  ? 'bg-primary-50 text-primary-700 border-l-2 border-primary-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`h-5 w-5 flex-shrink-0 mr-3 ${
                item.current ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
              }`} />
              <span className="truncate">{item.name}</span>
            </Link>
          ))}
        </nav>
        
        {/* Footer - Logout button */}
        <div className="p-4 border-t border-gray-200">
          <Button
            onClick={handleLogoutClick}
            variant="primaryOutline"
            size="md"
            className="w-full"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

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
    </div>
  );
};

export default NavSidebar;
