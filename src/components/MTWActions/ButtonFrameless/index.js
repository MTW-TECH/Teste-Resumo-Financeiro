import React from 'react';
//MUI:
import OutboxIcon from '@mui/icons-material/Outbox';
//COMPONENTS:
//STYLING:
//import theme from '../../theme';
import './style.css';

function index({ title, purpose, status, onClick, disable }) {
  const flexChunk = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: '2px',
    fontWeight: '600',
    color:
      status === 'registered'
        ? '#40d661'
        : status === 'unregistered'
        ? '#EF4444'
        : status === 'expiring'
        ? '#d7c342'
        : '#EF4444',
    marginRight: '4px'
  };

  const nullFn = () => {
    return false;
  };

  const statusText =
    status === 'registered'
      ? 'Certificado Ativo'
      : status === 'unregistered'
      ? 'Certificado Inativo'
      : status === 'expiring'
      ? 'Prestes a vencer'
      : status === 'not_enabled'
      ? 'CNPJ não habilitado'
      : 'Certificado Inativo';

  return (
    <>
      {purpose === 'certificate' ? (
        <div style={flexChunk}>
          <button
            className="framelessAttachedButton"
            onClick={disable ? nullFn() : onClick}
          >
            <OutboxIcon sx={{ color: flexChunk.color, width: '18px' }} />
            <span style={{ color: flexChunk.color }}>
              {title} {statusText}
            </span>
          </button>
        </div>
      ) : null}
    </>
  );
}

export default index;
