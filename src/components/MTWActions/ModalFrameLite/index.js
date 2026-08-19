import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import LabelIcon from '@mui/icons-material/Label';
import HubIcon from '@mui/icons-material/Hub';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import LineAxisIcon from '@mui/icons-material/LineAxis';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import theme from '../../../theme';

function index({ action, page, size, title, subtitle, children }) {
  function ModalIcon({ action }) {
    const iconColor = {
      color:
        page === 'make-view'
          ? 'none'
          : page === 'make-forward'
          ? 'none'
          : page === 'tag-management' ||
            page === 'base-legal' ||
            page === 'integrations-management'
          ? '#F27405'
          : page === 'make-the-price'
          ? 'none'
          : page === 'upload' ||
            page === 'make-view-files' ||
            page === 'cadastros-basicos'
          ? '#A646DC'
          : theme.palette.primary.main
    };
    if (action === 'tag-management') {
      return <LabelIcon sx={iconColor} />;
    } else if (action === 'integrations-management') {
      return <HubIcon sx={iconColor} />;
    } else if (action.includes('upload')) {
      return <CloudUploadIcon sx={iconColor} />;
    } else if (action === 'solicitar') {
      return <NoteAddIcon sx={iconColor} />;
    } else if (action === 'categorias') {
      return <FileCopyIcon sx={iconColor} />;
    } else if (action === 'cadastros-basicos') {
      return <HowToRegIcon sx={iconColor} />;
    } else if (action === 'cadastros-basicos-users') {
      return <PeopleIcon sx={iconColor} />;
    } else if (action === 'cadastros-basicos-companies') {
      return <BusinessIcon sx={iconColor} />;
    } else if (action === 'base-legal') {
      return <AssuredWorkloadIcon sx={iconColor} />;
    } else if (action === 'make-view-files') {
      return <SnippetFolderIcon sx={iconColor} />;
    } else if (action === 'make-view-dashboards') {
      return <LineAxisIcon sx={iconColor} />;
    } else if (action === 'register') {
      return <VpnKeyIcon sx={iconColor} />;
    } else if (action === 'add-user') {
      return <GroupAddIcon sx={iconColor} />;
    } else if (action === 'cad-make-view') {
      return <QueuePlayNextIcon sx={iconColor} />;
    } else {
      return <NoteAddIcon sx={iconColor} />;
    }
  }

  return (
    <Paper
      sx={{
        padding: '30px 36px',
        borderRadius: '6px',
        minWidth:
          size === 'small'
            ? '460px'
            : size === 'medium'
            ? '540px'
            : size === 'large'
            ? '650px'
            : '460px'
      }}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 340
      }}
    >
      <form noValidate>
        {/*Primeira linha (Ícone):*/}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '6px',
            width: '43px',
            height: '43px',
            background: '#eee',
            borderRadius: '46px'
          }}
        >
          <ModalIcon action={action} />
        </div>
        {/*Segunda linha (Título e subtítulo):*/}
        <Box sx={{ padding: '15px 0px 32px 0px' }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          <Typography sx={{ fontSize: '13px', color: '#888' }}>
            {subtitle}
          </Typography>
        </Box>
        <>{children}</>
      </form>
    </Paper>
  );
}

export default index;
