import React from 'react';
import theme from 'theme';

function index({ children, width, background, border }) {
  return (
    <div
      style={{
        background: background ? background : theme.palette.background.standard,
        borderRadius: '5px',
        border: border ? border : '1px solid #E0E0E0',
        minHeight: '40px',
        marginBottom: '40px',
        width: width ? width : '100%'
      }}
    >
      {children}
    </div>
  );
}

export default index;
