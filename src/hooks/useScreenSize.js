import { useState, useEffect } from 'react';

// useScreenSize Hook - MANDATORY PATTERN
function useScreenSize() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLargeDesktop, setIsLargeDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 800);
      setIsTablet(width >= 800 && width < 1024);
      setIsDesktop(width >= 1024 && width < 1920);
      setIsLargeDesktop(width >= 1920);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return { isMobile, isTablet, isDesktop, isLargeDesktop };
}

export { useScreenSize };
export default useScreenSize;
