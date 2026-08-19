import React from 'react';

function index({ currentPage, language, toggleLanguage }) {
  function EnglishFlag() {
    let style = { width: '18px' };
    return (
      <img
        src="https://flagicons.lipis.dev/flags/4x3/gb.svg"
        alt="EN"
        style={style}
      />
    );
  }

  function BrazilianFlag() {
    let style = { width: '18px' };
    return (
      <img
        src="https://flagicons.lipis.dev/flags/4x3/br.svg"
        alt="PT"
        style={style}
      />
    );
  }

  const checkPage = (pathname) => {
    if (
      pathname === '/etz/dlm' ||
      pathname === '/dlm' ||
      pathname === '/dlm-workflows'
    ) {
      return true;
    } else {
      return false;
    }
  };

  let hidden = { display: 'flex', visibility: 'hidden' };
  let show = { display: 'flex', visibility: 'visible' };

  return (
    checkPage(currentPage?.pathname) && (
      <button
        onClick={() => toggleLanguage()}
        style={{
          backgroundColor: '#DCDCDC',
          marginLeft: '10px',
          height: '28px',
          width: '60px',
          color: 'white',
          fontSize: '16px',
          padding: '10px',
          position: 'relative',
          transition: 'background-color 0.5s ease',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '2px solid #969696',
          borderRadius: '30px'
        }}
      >
        <div style={language === 'EN' ? show : hidden}>{EnglishFlag()}</div>
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '50%',
            height: '20px',
            width: '20px',
            position: 'absolute',
            right: language === 'EN' ? '4%' : 'calc(100% - 23px)',
            top: '50%',
            transform: 'translateY(-50%)',
            transition: 'right 0.5s ease',
            zIndex: 0
          }}
        ></div>
        <div style={language === 'EN' ? hidden : show}>{BrazilianFlag()}</div>
      </button>
    )
  );
}
export default index;
