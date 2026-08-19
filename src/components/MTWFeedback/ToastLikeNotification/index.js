import React from 'react';
import './style.css';

const ToastLikeNotification = ({ isPending, message }) => {
  const styles = {
    toastContainer: {
      position: 'fixed',
      top: '1.05rem',
      right: '1.05rem',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end'
    },
    toast: {
      backgroundColor: '#333',
      color: '#fff',
      padding: '1rem 1.6rem',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontSize: '1rem',
      animation: 'fadeIn 0.3s ease-out',
      whiteSpace: 'nowrap'
    }
  };
  return (
    isPending && (
      <div style={styles.toastContainer}>
        <div style={styles.toast}>
          <span>{message || 'Aguarde...'}</span>
        </div>
      </div>
    )
  );
};

export default ToastLikeNotification;
