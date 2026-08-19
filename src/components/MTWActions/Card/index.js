import React from 'react';
//COMPONENTS:
//STYLING:
import theme from '../../../theme';
import './style.css';

function index({ page, disabled, children, transparent, mediumBox }) {
  let style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '6px',
    color: disabled
      ? '#a7a7a7'
      : page === 'make-view' ||
        page === 'upload' ||
        page === 'solicitar' ||
        page === 'categorias' ||
        page === 'cadastros-basicos'
      ? '#a7a7a7'
      : page === 'make-forward' || page === 'base-legal'
      ? '#a7a7a7'
      : page === 'make-the-price'
      ? '#a7a7a7'
      : theme.palette.primary.main,
    background: disabled ? '#E0E0E0' : transparent ? 'none' : '#FFFFFF',
    border: '1px solid #C7C7C7',
    borderRadius: '5px',
    height: mediumBox ? '34px' : transparent ? '34px' : '40px',
    width: mediumBox ? '34px' : 'auto',
    padding: '0px 10px 0px 10px',
    cursor: 'default',
    fontWeight: 500
  };

  return <button style={style}>{children}</button>;
}

export default index;
