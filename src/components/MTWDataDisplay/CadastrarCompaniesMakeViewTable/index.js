import React, { useEffect, useState } from 'react';
//REDUX
import { useDispatch, useSelector } from 'react-redux';
//MUI
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Box, TablePagination, Modal, Typography, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
//COMPONENTS
import { renderCellExpand } from 'components/PaperElipsis';
import Button from 'components/MTWActions/Button';
import FetchingAnimation from 'components/MTWFeedback/Fetching';
import ModalLite from 'components/MTWActions/ModalFrameLite';
import Input from 'components/MTWDataInput/Input';
import DatePickerTypeable from '../../../components/MTWDataInput/DatePickerTypeable';
// STYLE
import theme from 'theme';
import {
  CadastrosTablePagination,
  ConsultaModalButton
} from '../../../styledComponentsStyles';
import styledtheme from '../../../styledThemeOn';
//STORE
import {
  deleteCadEmpresaMakeView,
  companySelector,
  updateCadEmpresaMakeView,
  getCadEmpresaMakeView
} from 'features/cadastroFeatures/Company/company.store';
//SERVICES
import { toast } from 'react-toastify';
const CadastrarCompaniesMakeViewTable = ({
  rows,
  loading,
  onRowsPerPageChange,
  onPageChange,
  page,
  rowsPerPage,
  count
}) => {
  let dispatch = useDispatch();
  //Redux
  const { isDeletingCadEmpresaMakeView, empresaCnpj, companies } =
    useSelector(companySelector);
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  //States
  const [companyCnpj, setCompanyCnpj] = useState('');
  const [companyName, setCompanyName] = useState('');
  //Filters
  const [selectedInitialDate, setSelectedInitialDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();
  const [formattedInitialDate, setFormattedInitialDate] = useState('');
  const [formattedEndDate, setFormattedEndDate] = useState('');

  function BoldTitle({ children }) {
    return (
      <div
        style={{
          color: '#222',
          fontSize: '14px',
          fontWeight: 700
        }}
      >
        {children}
      </div>
    );
  }

  const handleDeleteCompany = (id_empresa) => {
    dispatch(deleteCadEmpresaMakeView({ id_empresa }));
  };

  useEffect(() => {
    if (isDeletingCadEmpresaMakeView === 'success') {
      toast.success('Empresa excluída');
      dispatch(getCadEmpresaMakeView());
    } else if (isDeletingCadEmpresaMakeView === 'failed') {
      toast.error('Erro ao excluir a empresa');
    }
    handleClose();
  }, [isDeletingCadEmpresaMakeView]);

  //-------------------MUI------------------------
  const handleOpen = (id) => {
    setCurrentId(id);
    setOpenModal1(true);
  };

  const handleOpenEdit = (id) => {
    setCurrentId(id);
    setOpenModal2(true);
  };

  const handleClose = () => {
    setOpenModal1(false);
    setOpenModal2(false);
    setCurrentId(null);
    setCompanyCnpj('');
    setCompanyName('');
    setSelectedInitialDate(null);
    setSelectedEndDate(null);
    setFormattedInitialDate('');
    setFormattedEndDate('');
  };

  const formattedDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const formatted = `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`;
    return formatted;
  };
  // Função para formatar datas no formato YYYY-MM-DD

  useEffect(() => {
    if (selectedInitialDate) {
      const formattedDateInicio = formattedDate(selectedInitialDate);
      setFormattedInitialDate(formattedDateInicio);
    } else {
      setFormattedInitialDate('');
    }

    if (selectedEndDate) {
      const formattedDateFim = formattedDate(selectedEndDate);
      setFormattedEndDate(formattedDateFim);
    } else {
      setFormattedEndDate('');
    }
  }, [selectedInitialDate, selectedEndDate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    let cnpjFormatted = companyCnpj.replace(/\D/g, '');
    let selectedCompany = companies?.items.find(
      (company) => company.Cnpj === cnpjFormatted
    );
    if (selectedCompany) {
      let data = {
        id_cliente: selectedCompany.Id_cliente,
        id_matriz: selectedCompany.IdEmpresa,
        data_ini: formattedInitialDate,
        data_fim: formattedEndDate
      };
      dispatch(updateCadEmpresaMakeView(data))
        .then((response) => {
          if (response.error) {
            toast.error(response.error.message);
          } else {
            toast.success('Os dados foram alterados');
            dispatch(getCadEmpresaMakeView());
          }
        })
        .catch((error) => {
          console.error('error:', error);
          toast.error('Erro');
        });
    } else {
      toast.warning('Verifique os dados da empresa');
    }

    handleClose();
  };

  //--------------------CSS/JSX--------------------

  const datagridSx = {
    borderRadius: '0px 0px 0px 0px',
    borderTop: 'none',
    borderBottom: 'none',
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
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
  };

  const modalTextField = {
    padding: '5px 0'
  };

  const basicModalSubtitles = {
    fontSize: '13px',
    fontWeight: '700',
    color: '#171717',
    margin: '5px 0',
    letterSpacing: '0.15px'
  };

  const basicInputDate = {
    padding: '14px',
    background: '#fff',
    borderRadius: '5px',
    border: '1px solid #ccc',
    display: 'flex',
    justifyContent: 'center',
    columnGap: '7px'
  };

  //--------------------Colunas (Datagrid)--------------------
  const columns = React.useMemo(
    () => [
      {
        field: 'Nome',
        headerName: 'Nome',
        renderHeader: () => <BoldTitle>Nome</BoldTitle>,
        minWidth: 150,
        flex: 1,
        renderCell: renderCellExpand
      },
      {
        field: 'Cnpj',
        headerName: 'CNPJ',
        renderHeader: () => <BoldTitle>CNPJ</BoldTitle>,
        minWidth: 320,
        align: 'center',
        headerAlign: 'center',
        flex: 1,
        editable: true
      },
      {
        field: 'action',
        type: 'actions',
        renderHeader: () => <MoreVertIcon fontSize="small" />,
        minWidth: 60,
        flex: 0.3,
        editable: true,
        getActions: (params) => {
          return [
            <GridActionsCellItem
              key={params?.id}
              icon={<EditIcon fontSize="small" />}
              label="Expandir/Editar Empresa"
              onClick={() => handleOpenEdit(params?.id)}
              showInMenu
              sx={{ fontSize: 13 }}
            />,
            <GridActionsCellItem
              key={params?.id}
              icon={<DeleteIcon fontSize="small" sx={{ color: 'red' }} />}
              label="Desativar"
              onClick={() => handleOpen(params.id)}
              showInMenu
              sx={{ color: 'red', fontSize: 13 }}
            />
          ];
        }
      }
    ],
    []
  );

  return (
    <Box
      sx={{
        borderRadius: '0px 0px 5px 5px',
        height: 'fit-content',
        width: '100%',
        background: theme.palette.background.standard
      }}
    >
      <DataGrid
        rows={rows || []}
        autoHeight
        sx={datagridSx}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.Id}
        checkboxSelection
        disableSelectionOnClick
        pagination
        hideFooter={true}
      />
      <CadastrosTablePagination styledtheme={styledtheme}>
        <TablePagination
          component="div"
          page={page}
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPage={rowsPerPage}
        />
      </CadastrosTablePagination>

      {/*modal*/}
      <Modal open={openModal1} onClose={handleClose}>
        <Box sx={style}>
          <Typography sx={{ p: 3, textAlign: 'center' }}>
            Tem certeza que deseja excluir os dados da empresa?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              text="Cancelar"
              outline
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                borderColor: 'rgba(0, 0, 0, 0.25)',
                color: '#FFF'
              }}
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button
              text="Excluir"
              style={{
                marginLeft: 10
              }}
              primary
              onClick={() => handleDeleteCompany(currentId)}
            >
              {isDeletingCadEmpresaMakeView === 'loading' ? (
                <div>
                  <FetchingAnimation />
                </div>
              ) : (
                'Confirmar Exclusão'
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal open={openModal2} onClose={handleClose}>
        <ModalLite
          action={'cadastros-basicos-companies'}
          size={'small'}
          title={'Editar Dados da Empresa'}
        >
          <div style={modalTextField}>
            <Input
              label="Cnpj"
              type="text"
              name="cnpj"
              value={companyCnpj}
              mask="99.999.999/9999-99"
              maskChar={''}
              onChange={(event) => setCompanyCnpj(event.target.value)}
            />
          </div>
          <div style={modalTextField}>
            <Input
              label="Nome"
              type="text"
              name="nome"
              onChange={
                !empresaCnpj.nome
                  ? (event) => setCompanyName(event.target.value)
                  : null
              }
              value={empresaCnpj.nome ? empresaCnpj.nome : companyName}
            />
          </div>
          <Box sx={{ padding: '0px 0px 26px 0px' }}>
            <div style={basicModalSubtitles}>Datas</div>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Box sx={basicInputDate}>
                <DatePickerTypeable
                  date={selectedInitialDate}
                  handleDate={(value) => setSelectedInitialDate(value)}
                  placeholder="Data Inicial"
                />
                <DatePickerTypeable
                  date={selectedEndDate}
                  handleDate={(value) => setSelectedEndDate(value)}
                  placeholder="Data Final"
                />
              </Box>
            </Grid>
          </Box>

          <ConsultaModalButton>
            <Button text="Cancelar" outline onClick={handleClose}>
              Cancelar
            </Button>
            <Button text="Enviar" onClick={handleSubmit} primary>
              Enviar
            </Button>
          </ConsultaModalButton>
        </ModalLite>
      </Modal>
    </Box>
  );
};

export default CadastrarCompaniesMakeViewTable;
