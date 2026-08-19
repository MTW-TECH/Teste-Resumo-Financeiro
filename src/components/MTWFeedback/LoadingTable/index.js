import React from 'react';
import FetchingAnimation from 'components/MTWFeedback/Fetching';
// STYLE
import { theme, radSmall, radBig } from '../../../styledComponentsStyles';

function index({ color, height, border, background, boxed, bottomOnly }) {
  const colorTranslation = (color) => {
    if (color === 'standard') {
      return `${theme.palette.primary.main}`;
    } else {
      return `${color}`;
    }
  };

  const boxedDiv = {
    background: boxed ? '#FFFFFFB3' : 'none',
    padding: boxed ? '1px' : 'none',
    borderRadius: boxed ? `${radSmall}` : 'none'
  };

  return (
    <div
      style={{
        border: bottomOnly
          ? 'none'
          : border
          ? border
          : `1px solid ${theme.palette.divisory.mediumBorder}`,
        borderBottom:
          border === 'none'
            ? 'none'
            : `1px solid ${theme.palette.divisory.mediumBorder}`,
        background: background ? background : theme.palette.background.standard,
        borderTop: 'none',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: `0px 0px ${radBig} ${radBig}`,
        height: height ? height : '200px'
      }}
    >
      <div style={boxedDiv}>
        <FetchingAnimation color={colorTranslation(color)} />
      </div>
    </div>
  );
}

export default index;
