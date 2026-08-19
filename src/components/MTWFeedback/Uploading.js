import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import './style.css';

const UploadingAnimation = () => {
  return (
    <div className="elementToFadeInAndOut">
      <SwapVerticalCircleIcon
        sx={{
          color: '#EB3507',
          width: '22px',
          height: '22px',
          display: 'inline-block'
        }}
      />
    </div>
  );
};

export default UploadingAnimation;
