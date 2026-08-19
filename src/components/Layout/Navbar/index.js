import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
// COMPONENTS
import PortalFrame from '../PortalFrame/PortalFrame';
// STYLE
import '../../../styles/index.css';
import './style.css';

function Navbar({ hidden }) {
  let bar = useRef();

  const [sidebarDivisoryOpen, setSidebarDivisoryOpen] = useState(false);
  /*useState que guarda o estado da sidebar*/

  useEffect(() => {
    window.addEventListener('mousemove', (event) => {
      if (bar && bar.current && bar.current.contains) {
        if (!bar.current.contains(event.target)) {
          setSidebarDivisoryOpen(false);
        } else if (bar.current.contains(event.target)) {
          setSidebarDivisoryOpen(true);
        }
      }
    });
  }, []);
  /*useEffect que lê onde está o mouse para tornar true ou false a sidebar*/

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useLayoutEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    !hidden && (
      <>
        <div>
          <PortalFrame header={true} shrunken={!sidebarDivisoryOpen} />
        </div>
        <div ref={bar}>
          <PortalFrame
            vp={viewportHeight}
            scrollY={scrollY}
            sidebar={true}
            shrunken={!sidebarDivisoryOpen}
          />
        </div>
      </>
    )
  );
}
export default Navbar;
