import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import './style.css';

const LoadingTiny = ({ size }) => {
  return (
    <div className="elementToFadeInAndOut">
      <HourglassTopIcon
        sx={{ color: '#737373' }}
        style={{
          width: size ? size : '18px',
          height: size ? size : '18px'
        }}
      />
    </div>
  );
};

export default LoadingTiny;
