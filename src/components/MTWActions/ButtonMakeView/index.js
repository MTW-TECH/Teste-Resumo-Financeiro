import React from 'react';
import styledtheme from '../../../styledThemeOn';
import { DivisionSelection } from '../../../styledComponentsStyles';

function index({ selectedInstance, correctInstance, children }) {
  const selectedButtonTest = () => {
    if (selectedInstance === correctInstance) {
      return true;
    } else {
      return false;
    }
  };

  const selectedButton = selectedButtonTest();

  return (
    <DivisionSelection
      selectedButton={selectedButton}
      styledtheme={styledtheme}
    >
      {children}
    </DivisionSelection>
  );
}

export default index;
