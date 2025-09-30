import { useState, useEffect, useContext } from 'react';
import { MainLayoutContext } from './MainLayout';
import NavSidebar from './NavSidebar';

const Sidebar = ({ show, onSetShow, position = "left" }) => {
  const { isMobile, isDesktop } = useContext(MainLayoutContext);

  // Touch slide functionality for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && show) {
      onSetShow?.(false);
    }
    if (isRightSwipe && !show) {
      onSetShow?.(true);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobile && (
        <div
          className={`fixed inset-0 z-40 transition-all duration-300 ease-in-out bg-black/50 ${
            show ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          style={{
            pointerEvents: show ? 'auto' : 'none'
          }}
          onClick={() => onSetShow?.(false)}
        />
      )}

      {/* Touch Handle - Mobile Only */}
      {isMobile && !show && (
        <div 
          className="fixed top-0 bottom-0 z-30 touch-manipulation left-0" 
          style={{ width: 40 }} 
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 h-full z-30 transition-transform duration-300 ease-in-out
          ${position === 'left' ? 'left-0' : 'right-0'}
          ${isMobile ? 'w-80 max-w-[80vw]' : 'w-[270px]'}
          ${show ? 'translate-x-0' : '-translate-x-full'}
        `}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <NavSidebar 
          isMobile={isMobile} 
          setShow={onSetShow}
        />
      </div>
    </>
  );
};

export default Sidebar;
