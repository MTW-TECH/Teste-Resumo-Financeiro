import React from 'react';
//COMPONENTS:
//STYLING:
import theme from '../../../theme';
import './style.css';

function index({
  onClick,
  page,
  disable,
  disabled,
  children,
  transparent,
  mediumBox,
  width
}) {
  let style = {
    display: 'flex',
    justifyContent: 'center',
    color: disabled
      ? '#A2A2A2'
      : page === 'make-view' ||
        page === 'upload' ||
        page === 'solicitar' ||
        page === 'categorias' ||
        page === 'cadastros-basicos' ||
        page === 'financeiro'
      ? '#A646DC'
      : page === 'make-forward' || page === 'base-legal'
      ? '#F27405'
      : page === 'make-the-price'
      ? '#04ADBF'
      : theme.palette.primary.main,
    background: disabled ? '#E0E0E0' : transparent ? 'none' : '#FFFFFF',
    height: mediumBox ? '34px' : transparent ? '34px' : '40px',
    width: width ? width : mediumBox ? '34px' : 'auto',
    cursor: disabled ? 'auto' : 'pointer'
  };

  const emptyFunction = () => {
    if (disabled) {
      console.log('');
    }
  };

  return (
    <button
      style={style}
      className={disabled ? 'boxedButtonDisabled' : 'boxedButton'}
      onClick={disable ? emptyFunction : disabled ? emptyFunction : onClick}
    >
      {children}
    </button>
  );
}

export default index;
