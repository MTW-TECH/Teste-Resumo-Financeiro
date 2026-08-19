import React, { useState } from 'react';
//MUI
import { Paper, Box, Modal } from '@mui/material';
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
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import CategoryIcon from '@mui/icons-material/Category';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
//COMPONENTS
import Button from 'components/MTWActions/Button';
import SectionTitle from '../../SectionTitle';
//STYLE
import theme from '../../../theme';
import './style.css';

function index({
  loading,
  page,
  modalType,
  action,
  size,
  title,
  subtitle,
  entity,
  firstSection,
  secondSection,
  thirdSection,
  fourthSection,
  submitTitle,
  ruleToSubmit,
  onSubmit,
  cancelTitle,
  onCancel,
  ruleToWarning,
  warningMessage,
  isInvalid,
  onInvalid,
  invalidMessage,
  children,
  secondBox,
  thirdBox,
  fourthBox
}) {
  const [modalWarning, setModalWarning] = useState(false);

  const openModalWarning = () => {
    setModalWarning(true);
  };

  const closeModalWarning = () => {
    setModalWarning(false);
  };

  const onWarning = () => {
    openModalWarning();
  };

  const onLocalSubmit = () => {
    onSubmit();
    closeModalWarning();
  };

  //--------------------Child components--------------------
  function ModalIcon({ action }) {
    const icon = {
      padding: '0',
      margin: '0 auto',
      color:
        action === 'edit-invoice-quantity'
          ? '#A646DC' //'#FFFFFF'
          : page === 'make-view'
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
    switch (action) {
      case 'tag-management':
        return <LabelIcon sx={icon} />;
      case 'integrations-management':
        return <HubIcon sx={icon} />;
      case action.includes('upload'):
        return <CloudUploadIcon sx={icon} />;
      case 'solicitar':
        return <NoteAddIcon sx={icon} />;
      case 'categorias':
        return <FileCopyIcon sx={icon} />;
      case 'cadastros-basicos':
        return <HowToRegIcon sx={icon} />;
      case 'cadastros-basicos-users':
        return <PeopleIcon sx={icon} />;
      case 'cadastros-basicos-companies':
        return <BusinessIcon sx={icon} />;
      case 'base-legal':
        return <AssuredWorkloadIcon sx={icon} />;
      case 'make-view-files':
        return <SnippetFolderIcon sx={icon} />;
      case 'make-view-dashboards':
        return <LineAxisIcon sx={icon} />;
      case 'register':
        return <VpnKeyIcon sx={icon} />;
      case 'assign-company':
        return <DomainAddIcon sx={icon} />;
      case 'add-user':
        return <GroupAddIcon sx={icon} />;
      case 'edit-invoice-quantity':
        return <Inventory2OutlinedIcon sx={icon} />;
      case 'ncm-compared':
        return <CategoryIcon sx={icon} />;
      case 'report':
        return <SummarizeOutlinedIcon sx={icon} />;
      default:
        return <NoteAddIcon sx={icon} />;
    }
  }

  //--------------------JSX/CSS--------------------
  const modalFrameContainer = {
    padding: '32px 34px',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '14px',
    borderRadius: '6px',
    minWidth:
      size === 'small'
        ? '460px'
        : size === 'medium'
        ? '540px'
        : size === 'large'
        ? '860px'
        : size === 'xlarge'
        ? '1120px'
        : '460px',
    width: 'fit-content',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  };

  const sideModalFrameContainer = {
    background: 'blue',
    padding: '32px 34px',
    borderRadius: '6px',
    minWidth:
      size === 'small'
        ? '460px'
        : size === 'medium'
        ? '540px'
        : size === 'large'
        ? '860px'
        : size === 'xlarge'
        ? '1120px'
        : '460px',
    width: 'fit-content',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  };

  const sideModalFrameWrapper = {
    background: '#FFFFFF'
  };

  //BLOCK 1
  const modalFrameLabel = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: '15px'
  };
  const modalFrameLabelRoundIcon = {
    display: 'flex',
    alignItems: 'center',
    width: '46px',
    height: '46px',
    borderRadius: '40px',
    backgroundColor: '#EEEEEE',
    border: '1px solid #DAD9DB',
    outline: '3px solid #FFFFFF',
    boxShadow: '1px 3px 3px rgba(0, 0, 0, 0.3)'
  };

  //BLOCK 2
  const modalFrameBodyWrapper = {
    visibility: 'visible'
  };
  const modalFrameChildrenWrapper = {
    marginTop: '4px',
    border: '1px solid #CCCCCC',
    borderRadius: '5px',
    overflow: 'auto'
  };
  const borderlessModalFrameChildrenWrapper = {
    marginTop: '4px',
    borderRadius: '5px',
    overflow: 'auto'
  };
  const modalFrameEmptyChildrenWrapper = {
    height: '476px',
    overflow: 'auto'
  };

  //BLOCK 3
  const modalFrameButtonsWrapper = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: '12px'
  };
  const modalFrameButtonsInnerWrapper = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: '12px'
  };

  const modalFrameInvalidMessageWrapper = {
    maxWidth: '200px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'start',
    alignItems: 'center',
    color: 'red',
    fontSize: '14px'
  };
  const modalFrameLabelWrapperFlexAlt = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: '14px'
  };

  const modalFrameLabelIconAlt = () => {
    return {
      display: 'flex',
      width: '50px',
      height: '50px',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '5px',
      background: '#D2A3ED'
    };
  };

  const modalFrameLabelTitleWrapperAlt = {
    marginTop: '-3px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'start'
  };

  const modalFrameLabelTitleAlt = {
    fontSize: '22px',
    color: '#222222',
    fontWeight: '600'
  };

  const modalFrameLabelSubtitleAlt = {
    fontSize: '15px',
    color: '#BABABA'
  };

  if (isInvalid) {
    console.log('isInvalid:', isInvalid);
  }

  return (
    <>
      <Paper sx={modalFrameContainer}>
        {/*BLOCK 1 - modal label*/}
        <div style={modalFrameLabel}>
          {modalType === 'empty' ? (
            <div style={modalFrameLabelWrapperFlexAlt}>
              <div style={modalFrameLabelIconAlt()}>
                <ModalIcon action={action} />
              </div>
              <div style={modalFrameLabelTitleWrapperAlt}>
                <div style={modalFrameLabelTitleAlt}>{title}</div>
                <div style={modalFrameLabelSubtitleAlt}>{subtitle}</div>
              </div>
            </div>
          ) : (
            <>
              <div style={modalFrameLabelRoundIcon}>
                <ModalIcon action={action} />
              </div>
              {/*modal title and subtitle*/}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '2px'
                }}
              >
                <div
                  style={{
                    padding: '0',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#171717'
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    padding: '0',
                    fontSize: '13px',
                    color: '#888888'
                  }}
                >
                  {subtitle}
                </div>
              </div>
            </>
          )}
        </div>
        {/*BLOCK 2 - modal body*/}
        <div style={modalFrameBodyWrapper} className="modalFrameBodyWrapper">
          {!modalType ? (
            <>
              {firstSection ? (
                <Box sx={{ padding: '6px 0px 26px 0px' }}>
                  <SectionTitle
                    color={'#171717'}
                    size={'small'}
                    gap={'small'}
                    title={firstSection}
                  />
                  <div style={{ color: '#4a3e52' }}>{entity}</div>
                </Box>
              ) : null}
              {secondSection ? (
                <Box sx={{ padding: '0px 0px 26px 0px' }}>
                  <SectionTitle
                    color={'#171717'}
                    size={'small'}
                    gap={'small'}
                    title={secondSection}
                  />
                  <div style={borderlessModalFrameChildrenWrapper}>
                    {secondBox}
                  </div>
                </Box>
              ) : null}
              {thirdSection ? (
                <Box sx={{ padding: '0px 0px 26px 0px' }}>
                  <SectionTitle
                    color={'#171717'}
                    size={'small'}
                    gap={'small'}
                    title={thirdSection}
                  />
                  <div style={modalFrameChildrenWrapper}>{thirdBox}</div>
                </Box>
              ) : null}
              {fourthSection ? (
                <Box sx={{ padding: '0px 0px 26px 0px' }}>
                  <SectionTitle
                    color={'#171717'}
                    size={'small'}
                    gap={'small'}
                    title={fourthSection}
                  />
                  <div style={modalFrameChildrenWrapper}>{fourthBox}</div>
                </Box>
              ) : null}
            </>
          ) : modalType === 'empty' ? (
            <div style={modalFrameEmptyChildrenWrapper}>{children}</div>
          ) : null}
        </div>
        {/*BLOCK 3 - submit buttons*/}
        <div style={modalFrameButtonsWrapper}>
          <div>
            {isInvalid ? (
              <div style={modalFrameInvalidMessageWrapper}>
                {invalidMessage}
              </div>
            ) : null}
          </div>
          <div style={modalFrameButtonsInnerWrapper}>
            <Button
              text="Cancel"
              outline
              sx={{ height: '40px' }}
              onClick={onCancel}
            >
              {cancelTitle}
            </Button>
            <Button
              loading={loading}
              sx={{ height: '40px' }}
              disabled={false}
              text="Enviar"
              primary
              onClick={() => {
                ruleToWarning()
                  ? onWarning()
                  : ruleToSubmit()
                  ? onLocalSubmit()
                  : onInvalid
                  ? onInvalid()
                  : onCancel();
              }}
            >
              {submitTitle}
            </Button>
          </div>
        </div>
      </Paper>

      {/*warning modal*/}
      <Modal open={modalWarning} onClose={closeModalWarning}>
        <Paper sx={sideModalFrameContainer}>
          <div style={sideModalFrameWrapper}>
            <div>{warningMessage}</div>
            <div style={modalFrameButtonsWrapper}>
              <div>
                {isInvalid ? (
                  <div style={modalFrameInvalidMessageWrapper}>
                    {invalidMessage}
                  </div>
                ) : null}
              </div>
              <div style={modalFrameButtonsInnerWrapper}>
                <Button
                  text="Cancel"
                  outline
                  sx={{ height: '40px' }}
                  onClick={closeModalWarning}
                >
                  {cancelTitle}
                </Button>
                <Button
                  sx={{ height: '40px' }}
                  disabled={false}
                  text="Enviar"
                  primary
                  onClick={onSubmit}
                >
                  {submitTitle}
                </Button>
              </div>
            </div>
          </div>
        </Paper>
      </Modal>
    </>
  );
}

export default index;

/*{!fileInput ? <FetchingAnimation /> : ' Enviar '}*/
