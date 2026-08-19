import React from 'react';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import EditNotificationsIcon from '@mui/icons-material/EditNotifications';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SendIcon from '@mui/icons-material/Send';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SwapHorizontalCircleOutlinedIcon from '@mui/icons-material/SwapHorizontalCircleOutlined';
// STYLE
import { theme } from '../../../styledComponentsStyles';

function index({ action }) {
  const icon = {
    padding: '0',
    margin: '0 auto',
    color: theme.palette.primary.main
  };
  switch (action) {
    case 'assign-action':
      return <PrecisionManufacturingIcon sx={icon} />;
    case 'download-zip':
      return <CalendarMonthIcon sx={icon} />;
    case 'download-xls':
      return <TableChartOutlinedIcon sx={icon} />;
    case 'create-action':
      return <EditNotificationsIcon sx={icon} />;
    case 'export-messages':
      return <SystemUpdateAltIcon sx={icon} />;
    case 'validate-action':
      return <CheckCircleOutlineIcon sx={icon} />;
    case 'close-assigned-action':
      return <CheckCircleOutlineIcon sx={icon} />;
    case 'send-invoice':
      return <SendIcon sx={icon} />;
    case 'list-branch':
      return <SwapHorizIcon sx={icon} />;
    case 'list-discrepancies':
      return <AssignmentLateIcon sx={icon} />;
    case 'identify-invoice':
      return <FingerprintIcon sx={icon} />;
    case 'register-account':
      return <AddIcon sx={icon} />;
    case 'edit':
      return <EditIcon sx={icon} />;
    case 'upload':
      return <CloudUploadIcon sx={icon} />;
    case 'transferencia':
      return <SwapHorizontalCircleOutlinedIcon sx={icon} />;
    default:
      return <PrecisionManufacturingIcon sx={icon} />;
  }
}
export default index;
