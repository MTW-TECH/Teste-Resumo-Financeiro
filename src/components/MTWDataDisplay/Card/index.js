import { CircularProgress } from '@mui/material';
import theme from '../../../theme';

function Card({ children, title, titleBadge, loading }) {
  const card = {
    minWidth: '100%',
    boxShadow: '0 4px 90px rgba(163, 171, 185, 0.24)',
    background: '#FFF'
  };

  const container = {
    padding: '32px 32px',
    margin: '0 auto',
    '-webkit-box-align': 'center',
    '-ms-flex-align': 'center',
    '-webkit-box-pack': 'justify',
    '-ms-flex-pack': 'justify'
  };

  const titleBox = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '24px'
  };

  const titleBadgeStyle = {
    background: theme.palette.primary[60],
    height: '40px',
    width: '40px',
    borderRadius: '5px',
    marginRight: '10px'
  };

  const titleText = {
    opacity: '75%',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '22px'
  };

  return (
    <div style={card}>
      <div style={container}>
        {title ? (
          <div style={titleBox}>
            {titleBadge ? <div style={titleBadgeStyle} /> : <></>}
            {loading ? (
              <CircularProgress size={24} sx={{ marginRight: 2 }} />
            ) : (
              ''
            )}
            <div style={titleText}>{title}</div>
          </div>
        ) : (
          ''
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Card;
