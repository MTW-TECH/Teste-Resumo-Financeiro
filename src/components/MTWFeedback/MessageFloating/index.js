import React, { useState, useEffect } from 'react';
// MUI
import AnnouncementIcon from '@mui/icons-material/Announcement';
import GradingIcon from '@mui/icons-material/Grading';
import DangerousIcon from '@mui/icons-material/Dangerous';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import FolderZipIcon from '@mui/icons-material/FolderZip';
// COMPONENTS
import FetchingAnimation from '../Fetching';
// STYLE
import './style.css';

function MessageFloating({
  currentOperation,
  operationSuccess,
  operationFailure,
  operationException,
  onClearOperationStates,
  onOperationEnd
  // special cases
  // downloadZip
  // downloadXls
}) {
  /*
  Messages are delivered in the parent component 
  according to the action ongoing:
  ---Make Forward:
  import-certificate
  upload-nfe
  manifestacao
  download-zip
  assign-tag
  validate-tag
  download-xls
  edit-invoice-quantity
  ---Cadastros básicos:
  new-company
  new-client
  */
  const [floatingMessageBox, setFloatingMessageBox] = useState('void');
  const [floatingMessage, setFloatingMessage] = useState('');
  const [floatingLoading, setFloatingLoading] = useState(false);

  //------------------Messages------------------
  function failureMessage(body) {
    onClearOperationStates();
    setFloatingLoading(false);
    setFloatingMessage(body);
    setFloatingMessageBox('shown');
    return setTimeout(() => {
      setFloatingMessageBox('void');
      setFloatingMessage('');
      onOperationEnd();
    }, 4000);
  }
  /*Callback that triggers failure message*/

  function successMessage(body, fixed) {
    onClearOperationStates();
    setFloatingLoading(false);
    setFloatingMessage(body);
    setFloatingMessageBox('shown');
    return setTimeout(
      () => {
        setFloatingMessageBox('void');
        setFloatingMessage('');
        onOperationEnd();
      },
      fixed ? 90000 : 4000
    );
  }
  /*Callback that triggers success message*/

  function loadingMessage() {
    setFloatingMessageBox('shown');
    setFloatingLoading(true);
    return setTimeout(() => {
      setFloatingMessageBox('void');
      setFloatingLoading(false);
    }, 300000);
  }
  /*Callback that triggers simple loading instead of a message*/

  //------------------Triggers------------------
  useEffect(() => {
    if (
      currentOperation === 'download-zip' ||
      currentOperation === 'download-xls'
    ) {
      loadingMessage();
    }
  }, [currentOperation]);
  /*Specific trigger for 'download-zip' and 'download-xls'*/

  useEffect(() => {
    if (currentOperation === 'import-certificate' && operationFailure) {
      failureMessage(
        'O cadastro/alteração dos dados para o CNPJ não foi autorizado'
      );
    } else if (currentOperation === 'upload-nfe' && operationFailure) {
      failureMessage('A NFe não é válida');
    } else if (currentOperation === 'download-zip' && operationFailure) {
      failureMessage('Não há arquivos disponíveis para o período informado');
    } else if (currentOperation === 'manifestacao' && operationFailure) {
      failureMessage('A manifestação não pôde ser realizada');
    } else if (currentOperation === 'assign-tag' && operationFailure) {
      failureMessage('As tags escolhidas não puderam ser atribuídas');
    } else if (currentOperation === 'validate-tag' && operationFailure) {
      failureMessage('A tag selecionada não pôde ser validada');
    } else if (currentOperation === 'set-company' && operationFailure) {
      failureMessage('A empresa selecionada não está cadastrada');
    } else if (currentOperation === 'download-xls' && operationFailure) {
      failureMessage('O relatório excel não pôde ser gerado');
    } else if (
      currentOperation === 'edit-invoice-quantity' &&
      operationFailure
    ) {
      failureMessage('As quantidades da nota não puderem ser atualizadas');
    } else if (operationFailure) {
      failureMessage('Operação mal-sucedida');
    }
  }, [operationFailure]);
  /*Triggers failure message*/

  useEffect(() => {
    if (currentOperation === 'import-certificate' && operationSuccess) {
      successMessage('Certificado cadastrado com sucesso');
    } else if (currentOperation === 'upload-nfe' && operationSuccess) {
      successMessage('Nota fiscal eletrônica enviada');
    } else if (currentOperation === 'download-zip' && operationSuccess) {
      successMessage('Relatórios para o período em processamento');
    } else if (currentOperation === 'manifestacao' && operationSuccess) {
      successMessage('Manifestação realizada');
    } else if (currentOperation === 'assign-tag' && operationSuccess) {
      successMessage('Tags atribuídas');
    } else if (currentOperation === 'validate-tag' && operationSuccess) {
      successMessage('Tag validada com sucesso');
    } else if (currentOperation === 'download-xls' && operationSuccess) {
      successMessage('Relatório em Excel em processamento');
    } else if (currentOperation === 'new-company' && operationSuccess) {
      successMessage('Empresa cadastrada com sucesso');
    } else if (
      currentOperation === 'edit-invoice-quantity' &&
      operationSuccess
    ) {
      //successMessage('As quantidades dos itens dessa nota foram atualizados');
    } else if (operationSuccess) {
      successMessage('Operação realizada');
    }
  }, [operationSuccess]);
  /*Triggers success message*/

  useEffect(() => {
    switch (operationException) {
      case 'loading-interval':
        loadingMessage();
        break;
      case 'break-loading':
        setFloatingMessageBox('void');
        setFloatingLoading(false);
        break;
      default:
        break;
    }
  }, [operationException]);
  /*Triggers an exception message*/

  /*
  function closeFloatingMessageBox() {
    setFloatingMessageBox('void');
    setFloatingMessage('');
    onOperationEnd();
  }
  /*Callback function that turns the message div invisible again*/

  //------------------JSX------------------
  function FloatingMessageIcon({ currentOperation }) {
    let style = { fontSize: '34px', color: '#A646DC', marginRight: '11px' };
    if (operationFailure) {
      return <DangerousIcon sx={style} />;
    }
    switch (currentOperation) {
      case 'import-certificate':
        return <GradingIcon sx={style} />;
      case 'upload-nfe':
        return <GradingIcon sx={style} />;
      case 'download-zip':
        return <FolderZipIcon sx={style} />;
      case 'manifestacao':
        return <GradingIcon sx={style} />;
      case 'assign-tag':
        return <GradingIcon sx={style} />;
      case 'validate-tag':
        return <LocalOfferIcon sx={style} />;
      case 'download-xls':
        return <TableChartOutlinedIcon sx={style} />;
      default:
        return <AnnouncementIcon sx={style} />;
    }
  }
  /*Ícone da div da mensagem*/

  let wrapper = {
    height: currentOperation ? '124px' : '88px'
  };
  let pseudoWrapper = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };
  let titleLine = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  };
  const messageIcon = {
    width: currentOperation ? '13px' : '16px'
  };

  return (
    <div>
      <div className={`main-float-top-div-${floatingMessageBox}`}>
        <div className="main-float-top-div-wrapper" style={wrapper}>
          {floatingLoading ? (
            <div className="main-float-top-div-inner">
              Carregando <FetchingAnimation color={'#A646DC'} />
            </div>
          ) : (
            <div style={pseudoWrapper}>
              <div style={titleLine}>
                <FloatingMessageIcon
                  sx={messageIcon}
                  currentOperation={currentOperation}
                />
                {floatingMessage}
              </div>
              {currentOperation === 'download-xls' &&
              operationSuccess === true ? (
                <div className="main-float-top-div-inner-download"></div>
              ) : currentOperation === 'download-xls' &&
                operationSuccess === false ? (
                <div className="main-float-top-div-inner-download"></div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageFloating;
