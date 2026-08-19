import theme from '../../../../theme';

const legacyStylesForButton = {
  root: {
    '& > *': {
      margin: theme.spacing(1, 0)
    }
  },
  rootEnable: {
    height: '35px',
    padding: '0px 10px',
    borderRadius: '2px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 'none',
    textTransform: 'capitalize',
    fontSize: 16,
    border: 'none',
    lineHeight: 1.5,
    backgroundColor: theme.palette.primary[200],
    color: '#FFFFFF',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.accentPurple.main,
      borderColor: theme.palette.accentPurple.main,
      color: '#FFFFFF',
      boxShadow: 'none'
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: theme.palette.accentPurple.main,
      borderColor: theme.palette.accentPurple.main,
      color: '#FFFFFF'
    }
  },
  rootDisabled: {
    height: '35px',
    padding: '0px 10px',
    borderRadius: '2px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 'none',
    textTransform: 'capitalize',
    fontSize: 16,
    border: 'none',
    lineHeight: 1.5,
    color: theme.palette.action.deepGrey,
    background: theme.palette.action.middleGrey,
    borderColor: theme.palette.action.middleGrey,
    '&:hover': {
      color: theme.palette.action.deepGrey,
      background: theme.palette.action.middleGrey,
      borderColor: theme.palette.action.middleGrey
    },
    '&:active': {
      color: theme.palette.action.deepGrey,
      background: theme.palette.action.middleGrey,
      borderColor: theme.palette.action.middleGrey
    }
  },
  disabled: {
    height: '35px',
    padding: '0px 10px',
    borderRadius: '2px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 'none',
    textTransform: 'capitalize',
    fontSize: 16,
    border: 'none',
    lineHeight: 1.5,
    color: theme.palette.action.deepGrey,
    background: theme.palette.action.middleGrey,
    borderColor: theme.palette.action.middleGrey,
    cursor: 'not-allowed',
    pointerEvents: 'none'
  },
  outline: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.textlight.main,
    borderRadius: 4,
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    textTransform: 'capitalize',
    cursor: 'pointer'
  },
  primaryColor: {
    backgroundColor: theme.palette.primary[200],
    color: theme.palette.textlight.main,
    cursor: 'pointer'
  },
  secondaryColor: {
    backgroundColor: theme.palette.accentPurple[500],
    color: theme.palette.accentPurple.text,
    fontSize: '14px',
    border: '1px solid #A646DC',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

export default legacyStylesForButton;
