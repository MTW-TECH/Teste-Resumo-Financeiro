import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';

function Button({
  children,
  variant,
  onClick,
  disabled,
  outline,
  onMouseEnter,
  onMouseLeave,
  tooltip,
  ...props
}) {
  function TooltipCoverage({ children }) {
    if (tooltip && disabled) {
      return (
        <>
          <Tooltip title={tooltip}>
            <div>{children}</div>
          </Tooltip>
        </>
      );
    } else {
      return <>{children}</>;
    }
  }

  return (
    <TooltipCoverage>
      <div>
        <button
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          variant={outline ? 'outlined' : variant}
          disabled={disabled}
          onClick={onClick}
          {...props}
        >
          {children}
        </button>
      </div>
    </TooltipCoverage>
  );
}

Button.propTypes = {
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  outline: PropTypes.bool,
  disabled: PropTypes.bool,
  hover: PropTypes.bool,
  variant: PropTypes.string,
  props: PropTypes.object,
  tooltip: PropTypes.string,
  children: PropTypes.any
};

export default Button;
