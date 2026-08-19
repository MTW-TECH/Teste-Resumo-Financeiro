import React from 'react';
import LoadingDivisory from '../LoadingDivisory';

function index({ visibility, loading, children }) {
  const floatingMessageIcon = (currentOperation) => {
    switch (currentOperation) {
      case 'loading':
        return <LoadingDivisory color={'standard'} />;
      default:
        return <LoadingDivisory color={'standard'} />;
    }
  };

  const style = {
    display: visibility ? 'flex' : 'none',
    position: 'fixed',
    left: '50%',
    top: '10%',
    transform: 'translateX(-50%)',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  };

  const innerStyle = {
    zIndex: '10',
    display: 'flex',
    columnGap: '14px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 0px 20px 0px',
    height: '88px',
    minWidth: '280px',
    maxWidth: 'fit-content',
    borderRadius: '6px',
    background: '#fff',
    border: '1px solid #a7a7a7',
    color: '#575757',
    fontWeight: '600',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)'
  };

  const loadingStyle = {
    zIndex: '10',
    display: 'flex',
    columnGap: '14px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 0px 20px 0px',
    height: '88px',
    minWidth: '88px',
    maxWidth: 'fit-content',
    borderRadius: '12px',
    background: '#fff',
    border: '1px solid #a7a7a7',
    color: '#575757',
    fontWeight: '600',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)'
  };

  return (
    <div>
      {!loading ? (
        <div style={style}>
          <div style={innerStyle}>{children}</div>
        </div>
      ) : (
        <div style={style}>
          <div style={loadingStyle}>{floatingMessageIcon()}</div>
        </div>
      )}
    </div>
  );
}

export default index;
