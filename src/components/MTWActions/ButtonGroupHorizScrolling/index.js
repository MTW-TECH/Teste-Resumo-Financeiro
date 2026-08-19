import React, { useRef, useEffect, useState } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './style.css';

function index({ children }) {
  const wrapperRef = useRef(null);
  const [showLeftScrollButton, setShowLeftScrollButton] = useState(false);
  const [showRightScrollButton, setShowRightScrollButton] = useState(false);

  //----------|----------Handlers----------|----------
  const checkScrollPosition = () => {
    if (wrapperRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = wrapperRef.current;
      setShowLeftScrollButton(scrollLeft > 0);
      setShowRightScrollButton(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scrollLeft = () => {
    if (wrapperRef.current) {
      const { scrollLeft } = wrapperRef.current;
      const scrollStep = 100;
      const newScrollLeft = Math.max(scrollLeft - scrollStep, 0);
      wrapperRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    setShowLeftScrollButton(true);
    if (wrapperRef.current) {
      const { scrollLeft } = wrapperRef.current;
      const scrollStep = 100;
      const newScrollLeft = scrollLeft + scrollStep;
      wrapperRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    checkScrollPosition();
  }, []);

  return (
    <div
      className="tabs-container"
      onMouseEnter={checkScrollPosition}
      onMouseLeave={checkScrollPosition}
    >
      {showLeftScrollButton && (
        <button className="scroll-button left" onClick={scrollLeft}>
          <NavigateBeforeIcon sx={{ width: '17px' }} />
        </button>
      )}
      <div className="tabs" ref={wrapperRef}>
        {children}
      </div>
      {showRightScrollButton && (
        <button className="scroll-button right" onClick={scrollRight}>
          <NavigateNextIcon sx={{ width: '17px' }} />
        </button>
      )}
    </div>
  );
}

export default index;
