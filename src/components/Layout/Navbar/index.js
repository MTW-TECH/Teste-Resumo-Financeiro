import React from 'react';
// COMPONENTS
import PortalFrame from '../PortalFrame/PortalFrame';
// STYLE
import '../../../styles/index.css';
import './style.css';

function Navbar({ hidden }) {
  return !hidden && <PortalFrame header={true} shrunken={true} />;
}
export default Navbar;
