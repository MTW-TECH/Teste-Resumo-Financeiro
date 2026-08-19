import React from 'react';
import FetchingAnimation from 'components/MTWFeedback/Fetching';
import theme from 'theme';

function index({ color, height, background }) {
  const colorTranslation = (color) => {
    if (color === 'standard') {
      return `${theme.palette.primary.main}`;
    } else {
      return `${color}`;
    }
  };

  const boxedDiv = {
    background: 'none',
    padding: 'none'
  };

  return (
    <div
      style={{
        background: background ? background : 'none',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: height ? height : 'auto'
      }}
    >
      <div style={boxedDiv}>
        <FetchingAnimation color={colorTranslation(color)} />
      </div>
    </div>
  );
}

export default index;
