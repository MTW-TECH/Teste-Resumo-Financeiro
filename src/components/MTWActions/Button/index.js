import React from 'react';
import Tooltip from '@mui/material/Tooltip';
// COMPONENTS
import ColoredFetching from '../../MTWFeedback/ColoredFetching.js';
// STYLE
import styledtheme from '../../../styledThemeOn/index.js';
import { ButtonWrapper, StyledButton } from '../../../styledComponentsStyles';

function Button({
  propId,
  children,
  onClick,
  disabled,
  outline,
  primary,
  secondary,
  onMouseEnter,
  onMouseLeave,
  tooltip,
  className,
  loading,
  ...props
}) {
  function TooltipCover({ children }) {
    if (tooltip && disabled) {
      return (
        <Tooltip title={tooltip}>
          <div>{children}</div>
        </Tooltip>
      );
    } else {
      return <>{children}</>;
    }
  }

  return (
    <TooltipCover>
      <ButtonWrapper>
        <StyledButton
          id={propId}
          styledtheme={styledtheme}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          primary={primary}
          secondary={secondary}
          disabled={disabled}
          onClick={onClick}
          outline={outline}
          className={className}
          loading={loading}
          {...props}
        >
          {loading ? <ColoredFetching /> : children}
        </StyledButton>
      </ButtonWrapper>
    </TooltipCover>
  );
}

export default Button;
