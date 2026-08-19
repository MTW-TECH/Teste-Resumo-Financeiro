import React, { useState, useRef, useEffect } from 'react';
// COMPONENTS
import { Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import FetchingAnimation from '../../MTWFeedback/Fetching';
import FileListed from '../../MTWDataDisplay/FileListed';
import ButtonFilled from '../../Actions/ButtonInline';
// STYLE
import theme from '../../../theme';
import './style.css';

function index({
  disabled,
  onClick,
  page,
  children,
  status,
  quantity,
  successFiles,
  failFiles,
  resetButton,
  message
}) {
  const buttonRef = useRef(null);
  const dialogRef = useRef(null);
  const [showNotificationDialog, setShowNotificationfDialog] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const [buttonResetCounter, setButtonResetCounter] = useState(0);
  const [copyMessage, setCopyMessage] = useState(false);

  //--------------Toggles--------------
  const toggleNotifDialog = () => {
    setShowNotificationfDialog(!showNotificationDialog);
  };

  const voidFunction = () => {
    return false;
  };

  useEffect(() => {
    if (buttonResetCounter) {
      setNotificationsRead(false);
    }
  }, [buttonResetCounter]);

  useEffect(() => {
    if (status === 'upload') {
      setButtonResetCounter(buttonResetCounter + 1);
    }
  }, [status]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        dialogRef.current &&
        !buttonRef.current.contains(event.target) &&
        !dialogRef.current.contains(event.target)
      ) {
        setShowNotificationfDialog(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeNotification = () => {
    setNotificationsRead(true);
    resetButton();
  };

  function downloadTxtFile(text, filename) {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const copyNotification = () => {
    const sFiles = successFiles.map((file) => file.arq).join('\n');
    const success = sFiles.length ? sFiles : `Nenhum arquivo`;
    const fFiles = failFiles.map((file) => file.arq).join('\n');
    const fail = fFiles.length ? fFiles : `Nenhum arquivo`;
    const sucTitle = `Arquivos armazenados com sucesso: `;
    const failTitle = `Arquivos não armazenados: `;
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const currentDate = `${day}-${month}-${year}`;
    let filename = `files-uploaded-${currentDate}`;
    let messageLB = `${sucTitle}\n${success}\n${failTitle}\n${fail}`;
    downloadTxtFile(messageLB, filename);
    copyWarning();
  };

  const copyWarning = () => {
    setCopyMessage(true);
    setTimeout(() => {
      setCopyMessage(false);
    }, 2000);
  };

  //------------------JSX------------------
  function ButtonIcon({ status }) {
    const sendButtonIcon = {
      color: theme.palette.primary.main,
      fontSize: '34px'
    };
    if (status === 'loading') {
      return <FetchingAnimation sx={sendButtonIcon} color={'#F27405'} />;
    } else {
      return null;
    }
  }

  function WarningFrame({ visible, message }) {
    const gap = {
      marginLeft: '5px',
      color: '#A646DC'
    };
    return <>{visible && <div style={gap}>{message}</div>}</>;
  }

  function NotificationDialog() {
    const notifOn = {
      position: 'absolute',
      top: '30px',
      left: '25vw',
      maxWidth: '900px',
      padding: '14px 14px 14px 16px',
      background: '#FFFFFF',
      border: '1px solid #ddd',
      borderRadius: '5px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 10,
      transition: 'box-shadow 0.3s ease-in-out'
    };
    const notification = {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '5px',
      padding: '6px 6px 6px 6px',
      rowGap: '14px'
    };
    const notifOff = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: '90px',
      left: '40vw',
      width: '500px',
      padding: '14px 14px 14px 16px',
      background: '#FFFFFF',
      border: '1px solid #ddd',
      borderRadius: '5px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 10,
      transition: 'box-shadow 0.3s ease-in-out'
    };
    const fileBox = {
      maxHeight: '160px',
      width: '600px',
      maxWidth: '900px',
      overflowY: 'scroll',
      overflowX: 'scroll',
      display: 'flex',
      flexDirection: 'column',
      rowGap: '8px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      padding: '12px 14px 12px 14px'
    };
    const fileSuccessSummary = {
      display: 'flex',
      flexWrap: 'wrap',
      columnGap: '5px'
    };
    const successOrFailureIcon = (outcome, qtd) => {
      const collored = {
        display: 'flex',
        flexDirection: 'row',
        fontWeight: '700',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: '2px',
        color: outcome === 'success' ? '#2DD424' : '#D91A1A'
      };
      const sendButtonIcon = {
        color: outcome === 'success' ? '#2DD424' : '#D91A1A',
        fontSize: '16px'
      };
      if (outcome === 'success') {
        return (
          <div style={collored}>
            <CheckCircleIcon sx={sendButtonIcon} />
            <div>{qtd}</div>
          </div>
        );
      } else if (outcome === 'failure') {
        return (
          <div style={collored}>
            <ReportProblemIcon sx={sendButtonIcon} />
            <div>{qtd}</div>
          </div>
        );
      }
    };
    const filesReturnMessage = (succ, fail) => {
      if (succ !== 0 && fail !== 0) {
        return (
          <div style={fileSuccessSummary}>
            Você enviou {quantity.total} notas, das quais{' '}
            {successOrFailureIcon('success', quantity.succ)} foram enviadas com
            sucesso e {successOrFailureIcon('failure', quantity.fail)} não
            puderam ser enviadas:
          </div>
        );
      } else if (succ > 0 && fail === 0) {
        return (
          <div style={fileSuccessSummary}>
            Todas as notas foram enviadas com sucesso:
          </div>
        );
      } else if (succ === 0 && quantity.fail > 0) {
        return (
          <div style={fileSuccessSummary}>Nenhuma nota pôde ser enviada:</div>
        );
      } else {
        return <div style={fileSuccessSummary}>Algo deu errado</div>;
      }
    };
    return (
      <div ref={dialogRef}>
        {status === 'notification' && !notificationsRead ? (
          <div style={notifOn}>
            <div style={notification}>
              <div>{filesReturnMessage(quantity.succ, quantity.fail)}</div>
              <div style={fileBox}>
                {successFiles &&
                  successFiles.map((file) => {
                    return (
                      <Grid key={file.arq} item lg={12} md={12} sm={12} xs={12}>
                        <FileListed fileName={file.arq} fileResult={true} />
                      </Grid>
                    );
                  })}
                {failFiles &&
                  failFiles.map((file) => {
                    return (
                      <Grid key={file.arq} item lg={12} md={12} sm={12} xs={12}>
                        <FileListed fileName={file.arq} fileResult={false} />
                      </Grid>
                    );
                  })}
              </div>
              <div
                style={{
                  display: 'flex',
                  columnGap: '14px',
                  alignItems: 'center'
                }}
              >
                <ButtonFilled onClick={closeNotification}>OK</ButtonFilled>
                <ButtonFilled
                  tooltip={'Baixar lista do histórico de arquivos subidos'}
                  onClick={copyNotification}
                >
                  <VerticalAlignBottomIcon />
                </ButtonFilled>
                <WarningFrame visible={copyMessage} message={message} />
              </div>
            </div>
          </div>
        ) : (
          <div style={notifOff}>Nada para mostrar</div>
        )}
      </div>
    );
  }

  //------------------CSS------------------
  const notificationBadge = {
    position: 'absolute',
    top: '-6px',
    left: '-7px',
    width: '15px',
    height: '15px',
    background: 'red',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    zIndex: '9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    animation: 'blink 1s infinite'
  };

  const notificationButtonContainer = {
    background: 'none'
  };

  const notificationButton = {
    position: 'relative',
    color:
      page === 'make-view'
        ? '#A646DC'
        : page === 'make-forward'
        ? '#F27405'
        : page === 'make-the-price'
        ? '#04ADBF'
        : page === 'upload'
        ? '#A646DC'
        : page === 'solicitar'
        ? '#A646DC'
        : page === 'categorias'
        ? '#A646DC'
        : theme.palette.primary.main
  };

  return (
    <div style={notificationButtonContainer}>
      <button
        style={notificationButton}
        className="boxedButtonNotification"
        onClick={
          disabled
            ? voidFunction()
            : status !== 'upload'
            ? toggleNotifDialog
            : onClick
        }
        ref={buttonRef}
      >
        {/*Ícone de notificação:*/}
        {status === 'notification' ? (
          <span style={notificationBadge}></span>
        ) : null}
        {/*Conteúdo do botão:*/}
        {status === 'upload' ? (
          children
        ) : status === 'loading' ? (
          <ButtonIcon status={status} />
        ) : status === 'notification' ? (
          children
        ) : (
          children
        )}
        {/*Divisória pop-up:*/}
      </button>
      {showNotificationDialog && <NotificationDialog status={status} />}
    </div>
  );
}

export default index;
