import theme from 'theme';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

export const iconValue = {
  ModalIcon
};

function ModalIcon({ action }) {
  const icon = {
    padding: '0',
    margin: '0 auto',
    color: theme.palette.primary.main
  };
  switch (action) {
    case 'new-workflow-mf':
      return <AccountTreeIcon sx={icon} />;
    default:
      return <AccountTreeIcon sx={icon} />;
  }
}
