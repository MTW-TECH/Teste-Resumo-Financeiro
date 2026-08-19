import React from 'react';
import InboxIcon from '@mui/icons-material/Inbox';
// STYLE
import {
  theme,
  mbSmall,
  radMedium,
  radBig
} from '../../../styledComponentsStyles';

function index({ color }) {
  const colorTranslation = (color) => {
    if (color === 'standard') {
      return `${theme.palette.primary.main}`;
    } else {
      return `${color}`;
    }
  };

  const boxedDiv = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: `${radMedium}`,
    background: 'none',
    padding: 'none',
    borderRadius: 'none',
    sudoColor: colorTranslation(color),
    marginBottom: `${mbSmall}`,
    fontSize: '20px',
    color: '#a0a0a0'
  };

  return (
    <div
      style={{
        border: `1px solid ${theme.palette.divisory.mediumBorder}`,
        borderBottom: `1px solid ${theme.palette.divisory.mediumBorder}`,
        background: theme.palette.background.standard,
        borderTop: 'none',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: `0px 0px ${radBig} ${radBig}`,
        height: '160px'
      }}
    >
      <div style={boxedDiv}>
        <InboxIcon sx={{ fontSize: '36px' }} />
        <div>Sem dados</div>
      </div>
    </div>
  );
}

export default index;
