import React from 'react';

function index({ name }) {
  return (
    <div
      style={{
        color: '#222',
        fontSize: '14px',
        fontWeight: 700
      }}
    >
      {name}
    </div>
  );
}

export default index;
