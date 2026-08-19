import React from 'react';
//COMPONENTS:
//STYLING:
//import theme from '../../theme';
import './style.css';

function index({ hide, onClick, disable, children }) {
  const nullFn = () => {
    return false;
  };

  return (
    <button
      style={{ display: hide ? 'none' : 'block' }}
      className="floating-button"
      onClick={disable ? nullFn() : onClick}
    >
      {children}
    </button>
  );
}

export default index;
