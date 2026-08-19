import React from 'react';
import './style.css';

function index({ data }) {
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <p className="loading-text">Carregando {data}</p>
    </div>
  );
}

export default index;
