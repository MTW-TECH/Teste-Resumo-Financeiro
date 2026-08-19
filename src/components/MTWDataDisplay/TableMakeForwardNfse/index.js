import React, { useState, useEffect, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Box,
  Modal,
  Paper,
  TablePagination,
  Grid,
  TextField
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import GradingIcon from '@mui/icons-material/Grading';
import NotaTagExpandable from 'components/NotaTagExpandable';
import NotaTag from 'components/NotaTag';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import LabelIcon from '@mui/icons-material/Label';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import RuleIcon from '@mui/icons-material/Rule';
import Tooltip from '@mui/material/Tooltip';
// COMPONENTS
import Button from 'components/MTWActions/Button';
import ComboBox from 'components/MTWDataDisplay/ComboBox';
import ButtonFilled from 'components/Actions/ButtonInline';
// REDUX
import {
  recordMakeForwardInvoiceDetails,
  postNota,
  notaAvulsaSelector
} from 'features/makeForward/makeForward.store';
import { useDispatch, useSelector } from 'react-redux';
// SERVICES
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
// STYLE
import { TableCss } from '../../../styledComponentsStyles';
import './style.css';
import theme from 'theme';

function MakeForwardNfseTable({
  rows,
  onCurrentOperation,
  operationSucceeded,
  onManifestacaoCheck,
  manifestacaoCounter,
  onSelectedInvoices,
  onSelectedInvoicesCheck,
  onSingleInvoiceCheck,
  unselectInvoicesCounter,
  onLoadingInterval,
  hidePagination,
  loading,
  //MUI:
  page,
  rowsPerPage,
  onPageChange,
  rowsPerPageOptions,
  onRowsPerPageChange,
  count
}) {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  //--------------------States ()--------------------
  const manifestacaoLabels = [
    'Ciência da Operação',
    'Confirmação da Operação',
    'Desconhecimento da Operação',
    'Operação não realizada'
  ];
  //States relacionados ao download/exclusão/transferência pelo NotaAvulsaTable:
  const [selectionModel, setSelectionModel] = useState([]);
  const [fileSelection, setFileSelection] = useState([]);
  //const [downloadable, setDownloadable] = useState('');
  //const [downloadableGroup, setDownloadableGroup] = useState([]);
  //Nota Analysis adaptation:
  const { isPostNota } = useSelector(notaAvulsaSelector);
  const [modal, setModal] = useState(false);
  const [innerModal, setInnerModal] = useState(false);
  const [manifestacaoOptions, setManifestacaoOptions] = useState(
    manifestacaoLabels[0]
  );
  const [inputAvailable, setInputAvailable] = useState('');
  const [motivoText, setMotivoText] = useState('');
  const [notaBody, setNotaBody] = useState({
    tipoManifestacao: '',
    motivo: ''
  });

  useEffect(() => {
    if (rows) {
      dispatch(recordMakeForwardInvoiceDetails(rows));
    }
  }, [rows]);
  /*Make Forward invoice's details data*/
  //...
  /*Make Forward invoice's analysis data*/

  //----------|----------Manifestação de Notas ()----------|----------
  const [manifestacaoInvalid, setManifestacaoInvalid] = useState(false);
  const [manifestacaoInvalidMessage, setManifestacaoInvalidMessage] =
    useState('');
  const [manifestacaoDone, setManifestacaoDone] = useState();
  const today = new Date();

  const unselectInvoices = () => {
    setSelectionModel([]);
  };

  useEffect(() => {
    unselectInvoicesCounter >= 1 ? unselectInvoices() : null;
  }, [unselectInvoicesCounter]);

  useEffect(() => {
    if (fileSelection?.length === 1) {
      onSelectedInvoices(fileSelection);
      onSingleInvoiceCheck(true);
      onSelectedInvoicesCheck(true);
    } else if (fileSelection?.length > 1) {
      onSelectedInvoices(fileSelection);
      onSingleInvoiceCheck(false);
      onSelectedInvoicesCheck(true);
    } else {
      onSingleInvoiceCheck(false);
      onSelectedInvoicesCheck(false);
    }
  }, [fileSelection]);

  useEffect(() => {
    if (fileSelection) {
      let ciencias = fileSelection.filter(
        (nota) => nota.tipoManifestacao === 'CIENCIA_DA_OPERACAO'
      );
      if (ciencias.length >= 1 && fileSelection.length == ciencias.length) {
        return onManifestacaoCheck(true);
      } else {
        return onManifestacaoCheck(false);
      }
    }
  }, [fileSelection]);
  /*Determina se a nota selecionada pelo componente pai pode ser ou não manifestada*/

  useEffect(() => {
    manifestacaoCounter >= 1 ? openModal() : null;
  }, [manifestacaoCounter]);
  /*Através do trigger vindo do pai abre o modal da manifestação */

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    clearManifestacaoInvalid();
  };
  const openInnerModal = () => {
    setInnerModal(true);
    clearManifestacaoInvalid();
  };
  const closeInnerModal = () => {
    setInnerModal(false);
  };

  useEffect(() => {
    switch (manifestacaoOptions) {
      case 'Ciência da Operação':
        setInputAvailable('disabled');
        setNotaBody({
          tipoManifestacao: 'CIENCIA_DA_OPERACAO',
          motivo: ''
        });
        break;
      case 'Confirmação da Operação':
        setInputAvailable('disabled');
        setNotaBody({
          tipoManifestacao: 'CONFIRMACAO_DA_OPERACAO',
          motivo: ''
        });
        break;
      case 'Desconhecimento da Operação':
        setInputAvailable('disabled');
        setNotaBody({
          tipoManifestacao: 'DESCONHECIMENTO_DA_OPERACAO',
          motivo: ''
        });
        break;
      case 'Operação não realizada':
        setInputAvailable('');
        setNotaBody({
          tipoManifestacao: 'OPERACAO_NAO_REALIZADA',
          motivo: motivoText
        });
        break;
      default:
        setInputAvailable('disabled');
    }
  }, [manifestacaoOptions]);

  const handleChangeManifestacao = (event, newValue) => {
    setManifestacaoOptions(newValue);
  };
  /*Altera o tipo da manifestação*/

  const handleChangeMotive = (event) => {
    setMotivoText(event.target.value);
  };
  /*Altera o campo "motivo", referente à manifestação da nota*/

  const clearManifestacaoInvalid = () => {
    setManifestacaoInvalidMessage('');
    setManifestacaoInvalid(false);
  };

  const manifestacaoChecker = () => {
    let idsDates = fileSelection.map((nota) => nota.dataNota);
    const parseISOasLocal = (s) => {
      var b = s.split(/\D/);
      var d = new Date(b[0], --b[1], b[2]);
      return d && d.getMonth() == b[1] ? d : new Date(NaN);
    };
    for (var i = 0; idsDates.length > i; i++) {
      let rawInicio = idsDates[i];
      let inicio = parseISOasLocal(rawInicio);
      let difference = today.getTime() - inicio.getTime();
      let dayDif = difference / (1000 * 60 * 60 * 24);
      if (dayDif <= 180) {
        if (notaBody.tipoManifestacao == 'OPERACAO_NAO_REALIZADA') {
          if (motivoText.length < 15 || 255 < motivoText.length) {
            setManifestacaoInvalidMessage(
              'Insira um motivo que possua entre 15 e 255 caracteres.'
            );
            setManifestacaoInvalid(true);
            return false;
          } else {
            setManifestacaoInvalidMessage('');
            setManifestacaoInvalid(false);
            return true;
          }
        } else {
          setManifestacaoInvalidMessage('');
          setManifestacaoInvalid(false);
          closeModal();
          return true;
        }
      } else if (dayDif > 180) {
        if (idsDates.length === 1) {
          setManifestacaoInvalidMessage(
            'Sua nota tem mais de 6 meses e não pode ser manifestada'
          );
          setManifestacaoInvalid(true);
          return false;
        } else if (idsDates.length > 1) {
          setManifestacaoInvalidMessage(
            'Uma ou mais notas da sua seleção tem mais de 6 meses e não pode ser manifestada'
          );
          setManifestacaoInvalid(true);
          return false;
        }
      }
    }
  };

  const handleManifestacao = () => {
    openInnerModal();
  };
  /* "Post"/manifestação da nota */

  const postManifestacao = (event) => {
    event.preventDefault();
    onCurrentOperation('manifestacao');
    let idsCiencia = fileSelection.map((nota) => nota.dadosNota.id);
    for (var i = 0; i < idsCiencia.length; i++) {
      let checkedNotaBody = {
        id: idsCiencia[i],
        tipoManifestacao: notaBody.tipoManifestacao,
        motivo: motivoText
      };
      dispatch(postNota(checkedNotaBody));
      setManifestacaoDone(true);
    }
    clearManifestacaoInvalid();
    closeModal();
    closeInnerModal();
  };
  /* ~Post~/manifestação da nota */

  useEffect(() => {
    if (isPostNota === 'loading') {
      onLoadingInterval();
    } else if (manifestacaoDone && isPostNota === 'failed') {
      onCurrentOperation('manifestacao');
      operationSucceeded(false);
      setManifestacaoDone(false);
    } else if (manifestacaoDone && isPostNota === 'success') {
      onCurrentOperation('manifestacao');
      operationSucceeded(true);
      setManifestacaoDone(false);
    }
  }, [isPostNota]);
  /*Aviso após importar arquivos de nota .xml*/

  //----------|---------- JSX () ----------|----------:
  function BoldTitle({ title, size, children }) {
    const tooltipSort = (title) => {
      switch (title) {
        case 'tags':
          return 'Tags';
        case 'erro-pedido':
          return 'Validação do Pedido';
        case 'erro-recebimento':
          return 'Validação do Recebimento';
        case 'analise':
          return 'Análise da Nota';
        case 'detalhes':
          return 'Detalhes da Nota';
        case 'status':
          return 'Status';
        case 'assign-action':
          return 'Ações';
        case 'retencao':
          return 'Retenção';
        default:
          return '';
      }
    };
    return (
      <div>
        {title ? (
          <Tooltip placement={'right-end'} title={tooltipSort(title)}>
            <div
              style={{
                fontSize: size ? size : '14px',
                color: '#222',
                fontWeight: 700
              }}
            >
              {children}
            </div>
          </Tooltip>
        ) : (
          <div
            style={{
              fontSize: size ? size : '14px',
              color: '#222',
              fontWeight: 700
            }}
          >
            {children}
          </div>
        )}
      </div>
    );
  }

  const concatenatedNames = (name, code) => {
    const [expanded, setExpanded] = useState(false);
    const handleExpand = (bool) => {
      setExpanded(bool);
    };
    function formatarCNPJ(numero) {
      if (!numero) return '';
      const cnpjRegex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/;
      return String(numero).replace(cnpjRegex, '$1.$2.$3/$4-$5');
    }

    const displayName = name || 'Não identificado';
    const formattedCode = formatarCNPJ(code);
    const namePlusCode = formattedCode
      ? `${displayName} ${formattedCode}`
      : displayName;
    return (
      <>
        {expanded ? (
          <div
            style={{
              margin: '0 auto',
              padding: '0',
              position: 'absolute',
              top: '0',
              left: '0',
              height: '100%',
              minWidth: '200px',
              zIndex: '1000',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              columnGap: '5px'
            }}
          >
            <div
              style={{
                padding: '10px 7px 10px 8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                columnGap: '6px',
                boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.08)'
              }}
            >
              <div>{namePlusCode}</div>
              <button
                className="expandButton"
                onClick={() => handleExpand(false)}
              >
                <KeyboardArrowLeftIcon sx={{ width: '12px' }} />
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              columnGap: '2px',
              maxWidth: '12vw'
            }}
          >
            <div
              style={{
                position: 'relative',
                display: 'inline-block',
                paddingRight: '2px',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden'
              }}
            >
              {namePlusCode}
            </div>
            <button className="expandButton" onClick={() => handleExpand(true)}>
              <KeyboardArrowRightIcon sx={{ width: '12px' }} />
            </button>
          </div>
        )}
      </>
    );
  };

  const priceMask = (valor) => {
    const formattedValue = Number(valor).toFixed(2);
    const [integerPart, decimalPart] = formattedValue.split('.');
    const integerFormatted = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const valueFormatted = `R$ ${integerFormatted},${decimalPart}`;
    return valueFormatted;
  };

  const statusMask = (status) => {
    switch (status) {
      case 'AUTORIZADA':
        return 'Autorizada';
      case 'CONFIRMACAO_DA_OPERACAO':
        return 'Confirmação da Operação';
      case 'DESCONHECIMENTO_DA_OPERACAO':
        return 'Desconhecimento da Operação';
      case 'OPERACAO_NAO_REALIZADA':
        return 'Operação não realizada';
      default:
        return status;
    }
  };

  function CustomNoRowsOverlay() {
    return (
      <div
        style={{
          paddingTop: '38px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.background.standard
        }}
      >
        <Box>Sem arquivos</Box>
      </div>
    );
  }

  const detailsTitle = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <PendingOutlinedIcon sx={{ fontSize: '18px' }} />
      </div>
    );
  };

  const tagMask = (tags) => {
    const [hoverDot, setHoverDot] = useState('none');
    const tagMaskMap = {
      display: 'flex',
      alignItems: 'center',
      columnGap: '6px'
    };
    if (tags.length !== 0) {
      let dots = [];
      let quantityAssigned = tags?.length ? tags?.length : null;
      if (quantityAssigned === 1) {
        dots[0] = 1;
      } else if (quantityAssigned === 2) {
        dots[0] = 1;
        dots[1] = 2;
      } else if (quantityAssigned >= 3) {
        dots[0] = 1;
        dots[1] = 2;
        dots[2] = 3;
      }
      return (
        <div style={tagMaskMap}>
          {dots.map(function (assigned) {
            return (
              <div
                key={assigned}
                onMouseEnter={() => setHoverDot(assigned)}
                onMouseLeave={() => setHoverDot('none')}
              >
                <NotaTagExpandable
                  position={assigned}
                  hovered={hoverDot}
                  color={tags[assigned - 1]?.cor}
                >
                  {tags.map(function (tag) {
                    let random = Math.floor(Math.random() * 900000);
                    return (
                      <div key={`${tag.id}-${random}`}>
                        <NotaTag
                          name={tag.nome}
                          color={tag.cor}
                          staticMode={false}
                          editMode={false}
                        />
                      </div>
                    );
                  })}
                </NotaTagExpandable>
              </div>
            );
          })}
        </div>
      );
    } else if (tags.length === 0) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingLeft: '13px'
          }}
        >
          <HorizontalRuleIcon sx={{ fontSize: '20px', color: '#c7c7c7' }} />
        </div>
      );
    }
  };

  function IconAsTitle({ title }) {
    const style = {
      fontSize: '18px'
    };
    const iconSort = (title) => {
      switch (title) {
        case 'tags':
          return <LabelIcon sx={style} />;
        case 'erro-pedido':
          return <ProductionQuantityLimitsIcon sx={style} />;
        case 'erro-recebimento':
          return <RuleIcon sx={style} />;
        case 'analise':
          return <ReceiptLongIcon sx={style} />;
        case 'detalhes':
          return <PendingOutlinedIcon sx={style} />;
        case 'status':
          return <PendingActionsIcon sx={style} />;
        case 'assign-action':
          return <PrecisionManufacturingIcon sx={style} />;
        default:
          return <RuleIcon sx={style} />;
      }
    };
    const tooltipSort = (title) => {
      switch (title) {
        case 'tags':
          return 'Tags';
        case 'erro-pedido':
          return 'Validação do Pedido';
        case 'erro-recebimento':
          return 'Validação do Recebimento';
        case 'analise':
          return 'Análise da Nota';
        case 'detalhes':
          return 'Detalhes da Nota';
        case 'status':
          return 'Status';
        case 'assign-action':
          return 'Ações';
        default:
          return '';
      }
    };
    return (
      <div
        style={{
          color: '#222',
          fontSize: '14px',
          fontWeight: 700
        }}
      >
        <Tooltip placement={'right-end'} title={tooltipSort(title)}>
          <div>{iconSort(title)}</div>
        </Tooltip>
      </div>
    );
  }

  const analiseMask = (analise, id, uuid, type) => {
    const iconSort = (analise, color) => {
      const size = '20px';
      switch (analise) {
        default:
          return <ErrorOutlineIcon sx={{ fontSize: size, color: color }} />;
      }
    };
    const textSort = (analise) => {
      switch (analise) {
        case 'EM_ANALISE':
          return 'Em Análise';
        case 'EM ANÁLISE':
          return 'Em Análise';
        case 'EM ANALISE':
          return 'Em Análise';
        case 'CONFORME':
          return 'Conforme';
        case 'NAO_CONFORME':
          return 'Não Conforme';
        case 'INFORMACAO':
          return 'Informação';
        case 'ALERTA':
          return 'Alerta';
        default:
          return 'Informação';
      }
    };
    const colorSort = (analise) => {
      switch (analise) {
        case 'EM ANÁLISE':
          return '#636363';
        case 'EM ANALISE':
          return '#636363';
        case 'EM_ANALISE':
          return '#636363';
        case 'CONFORME':
          return '#10B981';
        case 'NAO_CONFORME':
          return '#EF4444';
        case 'INFORMACAO':
          return '#0c8fa6';
        case 'ALERTA':
          return '#c5a711';
        default:
          return '#636363';
      }
    };
    function AnaliseButton({ analise, color }) {
      const analiseButton = {
        display: 'flex',
        columnGap: '6px',
        alignItems: 'center',
        justifyContent: 'center',
        background: colorSort(analise),
        borderRadius: '6px',
        padding: '5px 10px 5px 8px'
      };
      const analiseButtonText = {
        color: '#fff',
        fontSize: '14px',
        fontWeight: '500'
      };
      return (
        <Link
          to={`service-errors/${id}/${uuid}/${type}/other`}
          style={{ textDecoration: 'none' }}
        >
          <div style={analiseButton}>
            <div>{iconSort(analise, color)}</div>
            <div style={analiseButtonText}>{textSort(analise)}</div>
          </div>
        </Link>
      );
    }
    return (
      <>
        <div className={analise?.length ? 'mf-table-mask-container' : ''}>
          <div
            className={
              analise?.length ? 'mf-table-mask-expanded' : 'mf-table-mask-off'
            }
          >
            <AnaliseButton analise={analise} color={'#ffffff'} font={'20px'} />
          </div>
          <div className="mf-table-mask-shrunken">
            {iconSort(analise, colorSort(analise), '20px')}
          </div>
        </div>
      </>
    );
  };

  const headerSx = {
    overflowX: 'scroll',
    borderRadius: '0px 0px 5px 5px',
    borderTop: 'none',
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: theme.palette.background.standard,
      color: '#111',
      fontWeight: 800,
      fontSize: 14,
      borderRadius: '0px 0px 0px 0px',
      borderTop: 'none'
    },
    '& .MuiDataGrid-row': {
      fontSize: 13,
      backgroundColor: theme.palette.background.standard,
      borderRadius: '0px 0px 0px 0px',
      '&:hover': {
        color: '#000'
      }
    },
    '& .MuiDataGrid-columnSeparator': {
      color: '#ffffff00',
      width: '1px',
      marginRight: '10px',
      background: '#E0E0E0'
    }
  };

  let basicPaper = {
    //most outside element
    padding: '32px 36px 24px 36px',
    borderRadius: '6px',
    minWidth: '500px',
    maxWidth: '640px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  };

  let iconWrapper = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px',
    width: '40px',
    height: '40px',
    background: '#eee',
    borderRadius: '40px',
    marginBottom: '14px'
  };

  let accentPurple = { color: theme.palette.accentPurple.text };

  let basicModalTitleWrapper = {
    paddingBottom: '28px'
  };

  let basicModalTitle = { fontSize: '20px', fontWeight: '600' };

  let invalidMessageAndButtonsContainer = {
    marginTop: '18px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px'
  };

  let invalidMessageWrapper = {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    fontSize: '14px'
  };

  let basicButtonWrapper = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    columnGap: '15px'
  };

  //--------------------Colunas (Datagrid) ()--------------------
  const columns = useMemo(
    () => [
      {
        field: 'tags',
        headerName: 'Tags',
        headerAlign: 'center',
        flex: 0.7,
        sortable: false,
        editable: false,
        disableColumnMenu: true,
        renderHeader: () => <IconAsTitle title={'tags'} />,
        renderCell: (params) => (
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              zIndex: 7,
              alignItems: 'center',
              fontSize: '13px',
              whiteSpace: 'normal',
              marginLeft: '3px',
              padding: '20px 0px 20px 0px'
            }}
          >
            <div>{tagMask(params.row.tags)}</div>
          </div>
        )
      },
      {
        field: 'dadosNotaServico.numero',
        headerName: 'Núm.',
        renderHeader: () => <BoldTitle>Núm.</BoldTitle>,
        headerAlign: 'center',
        align: 'center',
        flex: 0.8,
        sortable: false,
        editable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <div
            style={{
              fontSize: '13px',
              whiteSpace: 'normal',
              padding: '20px 0px 20px 0px'
            }}
          >
            <div>{params.row.dadosNotaServico.numero}</div>
          </div>
        )
      },
      {
        field: 'tipoNota',
        headerName: 'E/S',
        renderHeader: () => <BoldTitle>E/S</BoldTitle>,
        headerAlign: 'center',
        align: 'center',
        flex: 0.6,
        sortable: false,
        editable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <div
            style={{
              fontSize: '13px',
              whiteSpace: 'normal',
              padding: '20px 0px 20px 0px'
            }}
          >
            <div>{params.row.tipoNota.slice(0, 1)}</div>
          </div>
        )
      },
      {
        field: 'statusNota',
        headerName: 'Análise',
        headerAlign: 'center',
        align: 'left',
        flex: 0.6,
        editable: false,
        sortable: false,
        renderHeader: () => <IconAsTitle title={'analise'} />,
        renderCell: (params) => (
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              zIndex: 4,
              alignItems: 'center',
              fontSize: '13px',
              whiteSpace: 'normal',
              marginLeft: '3px',
              padding: '20px 0px 20px 8px'
            }}
          >
            {analiseMask(
              params.row.statusNota,
              params.row.id,
              params.row.uuid,
              params.row.tipoNota
            )}
          </div>
        )
      },
      {
        field: 'dadosNotaServico.cpfCnpjPrestador',
        headerName: 'Participante',
        renderHeader: () => <BoldTitle>Participante</BoldTitle>,
        flex: 2.5,
        sortable: false,
        editable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <div style={{ position: 'absolute' }}>
            {params.row.tipoNota.slice(0, 1) === 'E'
              ? concatenatedNames(
                  params.row.dadosNotaServico.razaoSocialPrestador,
                  params.row.dadosNotaServico.cpfCnpjPrestador
                )
              : params.row.tipoNota.slice(0, 1) === 'S'
              ? concatenatedNames(
                  params.row.dadosNotaServico.razaoSocialTomador,
                  params.row.dadosNotaServico.cpfCnpjTomador
                )
              : null}
          </div>
        )
      },
      {
        field: 'dataNota',
        headerName: 'Data',
        renderHeader: () => <BoldTitle>Data</BoldTitle>,
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        sortable: false,
        editable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <div
            style={{
              fontSize: '13px',
              whiteSpace: 'normal',
              padding: '20px 0px 20px 0px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div>{format(parseISO(params.row.dataNota), 'dd/MM/yyyy')}</div>
          </div>
        )
      },
      {
        field: 'codServico',
        headerName: 'Cód. Serv.',
        renderHeader: () => <BoldTitle size={'12px'}>Cód. Serv.</BoldTitle>,
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        sortable: false,
        editable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <div
            style={{
              fontSize: '13px',
              whiteSpace: 'normal',
              padding: '20px 0px 20px 0px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div>{params.row.dadosNotaServico.codServico}</div>
          </div>
        )
      },
      {
        field: 'dadosNotaServico.valorNf',
        headerName: 'Valor',
        renderHeader: () => <BoldTitle>Valor</BoldTitle>,
        headerAlign: 'center',
        align: 'center',
        whiteSpace: 'pre',
        flex: 1.2,
        sortable: false,
        editable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <div
            style={{
              fontSize: '13px',
              whiteSpace: 'normal',
              height: 'fit-content'
            }}
          >
            {priceMask(params.row.dadosNotaServico.valorNf)}
          </div>
        )
      },
      {
        field: 'dadosNotaServico.valorIss',
        headerName: 'ISS',
        renderHeader: () => <BoldTitle>ISS</BoldTitle>,
        headerAlign: 'center',
        align: 'center',
        whiteSpace: 'pre',
        flex: 1.2,
        sortable: false,
        editable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '13px',
              whiteSpace: 'normal',
              height: 'fit-content'
            }}
          >
            {priceMask(params.row.dadosNotaServico.valorIss)}
          </div>
        )
      },
      // RETENÇÃO
      {
        field: 'retencaoPIS',
        headerName: 'PIS',
        renderHeader: () => <BoldTitle title={'retencao'}>PIS</BoldTitle>,
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        sortable: false,
        editable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <div
            style={{
              fontSize: '13px',
              whiteSpace: 'normal',
              padding: '20px 0px 20px 0px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div>{priceMask(params.row.dadosNotaServico.retencaoPIS)}</div>
          </div>
        )
      },
      {
        field: 'retencaoCofins',
        headerName: 'Cofins',
        renderHeader: () => <BoldTitle title={'retencao'}>Cofins</BoldTitle>,
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        sortable: false,
        editable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <div
            style={{
              fontSize: '13px',
              whiteSpace: 'normal',
              padding: '20px 0px 20px 0px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div>{priceMask(params.row.dadosNotaServico.retencaoCofins)}</div>
          </div>
        )
      },
      {
        field: 'retencaoCsll',
        headerName: 'CSLL',
        renderHeader: () => <BoldTitle title={'retencao'}>CSLL</BoldTitle>,
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        sortable: false,
        editable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <div
            style={{
              fontSize: '13px',
              whiteSpace: 'normal',
              padding: '20px 0px 20px 0px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div>{priceMask(params.row.dadosNotaServico.retencaoCsll)}</div>
          </div>
        )
      },
      {
        field: 'retencaoIRRF',
        headerName: 'IRRF',
        renderHeader: () => <BoldTitle title={'retencao'}>IRRF</BoldTitle>,
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        sortable: false,
        editable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <div
            style={{
              fontSize: '13px',
              whiteSpace: 'normal',
              padding: '20px 0px 20px 0px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div>{priceMask(params.row.dadosNotaServico.retencaoIRRF)}</div>
          </div>
        )
      },
      {
        field: 'retencaoOutros',
        headerName: 'Outros',
        renderHeader: () => <BoldTitle title={'retencao'}>Outros</BoldTitle>,
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        sortable: false,
        editable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <div
            style={{
              fontSize: '13px',
              whiteSpace: 'normal',
              padding: '20px 0px 20px 0px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div>{priceMask(params.row.dadosNotaServico.retencaoOutros)}</div>
          </div>
        )
      },
      // FIM RETENÇÃO
      {
        field: 'status',
        headerName: 'Status',
        renderHeader: () => <BoldTitle>Status</BoldTitle>,
        headerAlign: 'center',
        align: 'center',
        flex: 1,
        sortable: false,
        editable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
          <div
            style={{
              fontSize: '13px',
              whiteSpace: 'normal',
              height: 'fit-content'
            }}
          >
            {statusMask(params.row.status)}
          </div>
        )
      },
      {
        field: 'action',
        headerName: 'Details',
        renderHeader: () => detailsTitle(),
        type: 'actions',
        headerAlign: 'center',
        align: 'center',
        flex: 0.7,
        getActions: (params) => {
          if (params?.row?.uuid) {
            return [
              <div key={params?.row?.uuid}>
                <ButtonFilled
                  onClick={() =>
                    navigate(
                      `details/${params.row.uuid}/${params.row.tipoNota}`
                    )
                  }
                  icon="details"
                  type="details"
                  hoverText="Detalhes da Nota"
                ></ButtonFilled>
              </div>
            ];
          } else {
            return [];
          }
        }
      }
    ],
    []
  );

  return (
    <Grid container sx={{ width: '100%', borderRadius: '0px 0px 5px 5px' }}>
      <Box
        sx={{
          borderRadius: '0px 0px 0px 0px',
          height: 'fit-content',
          width: '100%',
          background: theme.palette.background.standard
        }}
      >
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
          <div
            style={{
              display: 'flex',
              height: '17px',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56.45%',
              borderLeft: '1px solid #E0E0E0',
              borderBottom: '1px solid #E0E0E0'
            }}
          ></div>
          <div
            style={{
              background: '#e0e0e0',
              display: 'flex',
              height: '17px',
              alignItems: 'center',
              justifyContent: 'center',
              width: '43.55%',
              fontSize: '11px',
              color: '#222',
              fontWeight: 700,
              borderRight: '1px solid #E0E0E0',
              borderLeft: '1px solid #E0E0E0'
            }}
          >
            Retenção
          </div>
        </div>
        <DataGrid
          rows={rows}
          columns={columns}
          defaultColumns={[
            { dataField: 'ID', caption: 'CodiceNegozio' },
            { dataField: 'CompanyName', caption: 'CodicePromozione' },
            { dataField: 'City', caption: 'CodiceArticolo', width: 150 },
            { dataField: 'State', caption: 'GruppoAssortimento' },
            { dataField: 'ID', caption: 'CodiceNegozio' },
            { dataField: 'CompanyName', caption: 'CodicePromozione' }
          ]}
          components={{
            NoRowsOverlay: CustomNoRowsOverlay
          }}
          getRowId={(row) => row?.id}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(invoice) => {
            setSelectionModel(invoice);
            const set = new Set(invoice);
            const invoices = rows.filter((row) => set.has(row.id));
            setFileSelection(invoices);
          }}
          selectionModel={selectionModel}
          loading={loading}
          hideFooter={true}
          autoHeight
          sx={headerSx}
        />
        {hidePagination ? (
          <div></div>
        ) : (
          <TableCss>
            <TablePagination
              component="div"
              labelRowsPerPage="Documentos por página"
              sx={{ backgroundColor: theme.palette.background.standard }}
              labelDisplayedRows={function defaultLabelDisplayedRows({
                from,
                to,
                count
              }) {
                return `${from}–${to} de ${
                  count !== -1 ? count : `mais de ${to}`
                }`;
              }}
              //6:
              page={page}
              count={count}
              onPageChange={onPageChange}
              onRowsPerPageChange={onRowsPerPageChange}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={rowsPerPageOptions}
            />
          </TableCss>
        )}
        {/*Modal 1*/}
        <Modal open={modal} onClose={closeModal}>
          <Paper titleBadge={false} sx={basicPaper}>
            <div style={iconWrapper}>
              <GradingIcon sx={accentPurple} />
            </div>
            <Box sx={basicModalTitleWrapper}>
              <div style={basicModalTitle}>Manifestar notas</div>
            </Box>
            <div style={{ padding: '12px 0' }}>
              <ComboBox
                value={manifestacaoOptions}
                options={manifestacaoLabels}
                setValue={handleChangeManifestacao}
                label="Tipo de Manifestação"
                optionsLabel={(option) => {
                  return option;
                }}
              />
            </div>
            <div style={{ padding: '12px 0' }} id={`${inputAvailable}`}>
              <TextField
                className="textfieldManif"
                sx={{ minWidth: '100%' }}
                id="outlined-multiline-static"
                label="Motivo"
                multiline
                rows={4}
                defaultValue=""
                onChange={handleChangeMotive}
              />
            </div>
            <div style={invalidMessageAndButtonsContainer}>
              <div>
                {manifestacaoInvalid ? (
                  <div style={invalidMessageWrapper}>
                    {manifestacaoInvalidMessage}
                  </div>
                ) : null}
              </div>
              <div style={basicButtonWrapper}>
                <Button
                  text="Cancel"
                  outline
                  sx={{ height: '40px', margin: '0px 14px 0px 0px' }}
                  onClick={closeModal}
                >
                  Cancelar
                </Button>
                <Button
                  sx={{ height: '40px', margin: '0px 0px 0px 0px' }}
                  disabled={false}
                  text="Importar"
                  type="submit"
                  primary
                  onClick={() => {
                    manifestacaoChecker() ? handleManifestacao() : null;
                  }}
                >
                  {'Manifestar'}
                </Button>
              </div>
            </div>
          </Paper>
        </Modal>
        {/*Modal 2*/}
        <Modal open={innerModal} onClose={closeInnerModal}>
          <Paper titleBadge={false} sx={basicPaper}>
            <div style={{ padding: '0 0 17px 0', fontWeight: '600' }}>
              Você tem certeza que quer atualizar essa nota?
            </div>
            <div style={basicButtonWrapper}>
              <Button
                text="Cancel"
                outline
                sx={{ height: '40px', margin: '0px 14px 0px 0px' }}
                onClick={closeInnerModal}
              >
                Cancelar
              </Button>
              <Button
                text="OK"
                type="submit"
                onClick={postManifestacao}
                style={{
                  margin: '0px 0px 10px 0px',
                  backgroundColor: '#A646DC',
                  borderRadius: '5px'
                }}
              >
                Confirmar
              </Button>
            </div>
          </Paper>
        </Modal>
      </Box>
      {/*<Grid>
        {onSelection() ? (
          <div className="float-options-container">
            <div className="float-options-counter">
              <p>{fileSelection.length}</p>
            </div>
            <div className="float-options-buttons">
              <IconButton onClick={onManifestacao}>Manifestar</IconButton>
            </div>
          </div>
        ) : null}
        </Grid>*/}
    </Grid>
  );
}

export default MakeForwardNfseTable;
