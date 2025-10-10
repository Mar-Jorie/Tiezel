import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

const DynamicTitle = () => {
  const location = useLocation();
  const { landingPageContent } = useApp();

  useEffect(() => {
    const updateTitle = () => {
      const path = location.pathname;
      
      // Admin routes - use "Tiezel"
      if (path.startsWith('/admin')) {
        document.title = 'Tiezel';
        return;
      }
      
      // Landing page - use "By[Name]" format
      if (path === '/') {
        const userName = landingPageContent?.personal_info?.name;
        if (userName) {
          // Remove spaces and create "By[Name]" format
          const cleanName = userName.replace(/\s+/g, '');
          document.title = `By${cleanName}`;
        } else {
          // Fallback if no name is available
          document.title = 'Tiezel';
        }
        return;
      }
      
      // Default fallback
      document.title = 'Tiezel';
    };

    updateTitle();
  }, [location.pathname, landingPageContent?.personal_info?.name]);

  // This component doesn't render anything
  return null;
};

export default DynamicTitle;
