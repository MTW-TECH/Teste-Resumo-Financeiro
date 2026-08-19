import React from 'react';

function NotaDetailsBox({ title, value, innerGap, smallGap, currency }) {
  const pad = `${innerGap} 10px ${innerGap} 10px`;
  const borderColor = '#DED8E3';
  const textColor = '#6B6B6B';
  const radius = '6px';

  const boxContainer = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    rowGap: smallGap,
    background: '#fff',
    borderRadius: radius,
    border: `1px solid ${borderColor}`,
    padding: pad
  };
  const underTitle = {
    whiteSpace: 'nowrap',
    color: '#ac5dd9',
    fontSize: '11px',
    textTransform: 'uppercase',
    fontWeight: '700'
  };
  const textLine = {
    whiteSpace: 'nowrap',
    color: textColor,
    fontSize: '13px',
    fontWeight: '500',
    overflowX: 'auto'
  };

  const analiseMask = (value, currency) => {
    if (title === 'análise') {
      let buttonColor;
      let text;
      if (value) {
        if (value === 'EM_ANALISE') {
          buttonColor = '#8F8F8F';
          text = 'EM ANÁLISE';
        } else if (value === 'EM ANÁLISE') {
          buttonColor = '#8F8F8F';
          text = 'EM ANÁLISE';
        } else if (value === 'EM ANALISE') {
          buttonColor = '#8F8F8F';
          text = 'EM ANÁLISE';
        } else if (value === 'CONFORME') {
          buttonColor = '#10B981';
          text = 'CONFORME';
        } else if (value === 'NAO_CONFORME') {
          buttonColor = '#EF4444';
          text = 'NÃO CONFORME';
        } else if (value === 'INFORMACAO') {
          buttonColor = '#0c8fa6';
          text = 'INFORMAÇÃO';
        } else if (value === 'ALERTA') {
          buttonColor = '#c5a711';
          text = 'ALERTA';
        } else {
          buttonColor = '#8F8F8F';
          text = value;
        }
        return (
          <>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: buttonColor,
                border: 'none',
                textDecoration: 'none',
                color: '#fff',
                padding: '5px 7px 3px 7px',
                borderRadius: '6px',
                maxWidth: '120px',
                minHeight: '20px',
                maxHeight: '20px',
                whiteSpace: 'nowrap',
                fontSize: '11px',
                fontWeight: '700',
                lineHeight: '18px',
                textTransform: 'none'
              }}
              type="button"
            >
              {text}
            </button>
          </>
        );
      }
    } else if (currency) {
      if (value && typeof value === 'string' && /\.\d{2}$/.test(value)) {
        const formattedValue = value.replace(/\.(\d{2})$/, ',$1');
        return `R$ ${formattedValue}`;
      }
      return `R$ ${value},00`;
    } else {
      return value;
    }
  };

  return (
    <div style={boxContainer}>
      <div style={underTitle}>{title}</div>
      {value ? (
        <div style={textLine}>{analiseMask(value, currency)}</div>
      ) : (
        <div style={textLine}>–</div>
      )}
    </div>
  );
}

export default NotaDetailsBox;
