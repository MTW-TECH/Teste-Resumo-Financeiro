import React, { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Box, Modal, TablePagination, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import DeleteIcon from '@mui/icons-material/Delete';
import BusinessIcon from '@mui/icons-material/Business';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
// COMPONENTS
import MTWModal from 'components/MTWActions/ModalFrameLite';
import Button from 'components/MTWActions/Button';
import CadastroModal from 'components/CadastroModal';
import FetchingAnimation from 'components/MTWFeedback/Fetching';
import { renderCellExpand } from 'components/PaperElipsis';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import {
  clientSelector,
  deleteCadastrar,
  getUpdateClient
} from 'features/cadastroFeatures/Client/client.store';
// SERVICES
import { maskedValue } from 'services/maskedValue';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
// STYLE
import {
  ModalButton,
  CadastrosTablePagination
} from '../../../styledComponentsStyles';
import theme from 'theme';
import styledtheme from '../../../styledThemeOn';

const CadastrosBasicosTable = ({
  rows,
  loading,
  onRowsPerPageChange,
  onPageChange,
  page,
  rowsPerPage,
  count
}) => {
  const { isUpdatingClient, isDeletingCadastrar } = useSelector(clientSelector);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openIncludeExcludeUser, setOpenIncludeExcludeUser] =
    React.useState(false);
  const [rowId, setRowId] = useState('');
  const [newSingleObject, setNewSingleObject] = useState();
  const initialSingleObject = (newObject) => {
    setNewSingleObject(newObject);
  };
  const [currentid, setCurrentId] = React.useState('');

  let dispatch = useDispatch();

  useEffect(() => {
    if (isDeletingCadastrar === 'success') {
      toast.success('detalhes do cliente excluídos com sucesso!');
      window.location.reload();
    }
  }, [isDeletingCadastrar]);

  const handleOpen = (id) => {
    setCurrentId(id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleOpenEdit = (id) => {
    setRowId(id);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenIncludeExcludeUser = (id) => {
    setRowId(id);
    setOpenIncludeExcludeUser(true);
  };

  const handleCloseIncludeExcludeUser = () => setOpenIncludeExcludeUser(false);

  const handleChange = (event) => {
    setNewSingleObject({
      ...newSingleObject,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      getUpdateClient({
        id: rowId,
        data: newSingleObject
      })
    );
  };

  useEffect(() => {
    if (isUpdatingClient === 'success') {
      toast.success('Atualização do cliente com sucesso!');
      setOpenEdit(false);
      window.location.reload();
    } else {
      setOpenEdit(false);
    }
  }, [isUpdatingClient]);

  //--------------------CSS/JSX--------------------
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

  function getMaskedCnpj(params) {
    return `${maskedValue(params.row.Cnpj)}` || 'None';
  }

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

  //--------------------Colunas (Datagrid)--------------------
  const columns = React.useMemo(
    () => [
      {
        field: 'Nome',
        headerName: 'Nome',
        renderHeader: () => <BoldTitle>Cliente</BoldTitle>,
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
        valueGetter: getMaskedCnpj,
        flex: 1,
        editable: true
      },
      {
        field: 'Ativo',
        headerName: 'Status',
        renderHeader: () => <BoldTitle>Status</BoldTitle>,
        headerAlign: 'center',
        minWidth: 170,
        flex: 0.5,
        align: 'center',
        editable: true,
        renderCell: (params) => {
          return (
            <>
              <Box
                sx={{
                  backgroundColor:
                    params.row.Ativo === 'True' ? '#00B981' : '#EF4444',
                  padding: '2px 4px',
                  width: 60,
                  color: '#fff',
                  borderRadius: '6px',
                  textAlign: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  letterSpacing: '+0.10px'
                }}
              >
                {params.row.Ativo === 'True' ? 'Ativo' : 'Inativo'}
              </Box>
            </>
          );
        }
      },
      {
        field: 'action',
        type: 'actions',
        renderHeader: () => <MoreVertIcon fontSize="small" />,
        minWidth: 60,
        flex: 0.3,
        editable: true,
        getActions: (params) => {
          if (params?.row?.Ativo && params?.row?.Ativo?.length) {
            if (params?.row?.Ativo === 'True') {
              return [
                <GridActionsCellItem
                  key={params?.id}
                  icon={<EditIcon fontSize="small" />}
                  label="Expandir/Editar Cliente"
                  showInMenu
                  onClick={() => handleOpenEdit(params?.id)}
                  sx={{ fontSize: 13 }}
                />,
                <GridActionsCellItem
                  key={params?.id}
                  icon={<BusinessIcon fontSize="small" />}
                  label="Ir para Empresas"
                  showInMenu
                  component={Link}
                  to={`empresas/${params.id}`}
                  sx={{ fontSize: 13 }}
                />,
                <GridActionsCellItem
                  key={params?.id}
                  icon={<PeopleIcon fontSize="small" />}
                  label="Ir para Usuários"
                  showInMenu
                  component={Link}
                  to={`usuarios/${params.id}`} //Atestar se esse id é o client id
                  sx={{ fontSize: 13 }}
                />,

                <GridActionsCellItem
                  key={params?.id}
                  icon={<DashboardIcon fontSize="small" />}
                  label="Ir para Dashboards"
                  showInMenu
                  component={Link}
                  to={`control-dashboards/${params.id}`} //Controle de dashboards
                  sx={{ fontSize: 13 }}
                />,
                <GridActionsCellItem
                  key={params?.id}
                  icon={<SettingsApplicationsIcon fontSize="small" />}
                  label="Painel"
                  showInMenu
                  component={Link}
                  to={`painel/${params.id}`}
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

            if (params?.row?.Ativo === 'False') {
              return [
                <GridActionsCellItem
                  key={params?.id}
                  icon={<EditIcon fontSize="small" />}
                  label="Visualizar/Alterar"
                  showInMenu
                  onClick={() => handleOpenEdit(params?.id)}
                  sx={{ fontSize: 13 }}
                />
              ];
            }

            if (params?.row?.Ativo === 'False') {
              return [
                <GridActionsCellItem
                  key={params?.id}
                  icon={<EditIcon fontSize="small" />}
                  label="Visualizar/Alterar"
                  showInMenu
                  onClick={() => handleOpenEdit(params?.id)}
                  sx={{ fontSize: 13 }}
                />
              ];
            }

            if (params?.row?.Ativo === 'False') {
              return [
                <GridActionsCellItem
                  key={params?.id}
                  icon={<EditIcon fontSize="small" />}
                  label="Incluir/Excluir Usuário"
                  showInMenu
                  onClick={() => handleOpenIncludeExcludeUser(params?.id)}
                  sx={{ fontSize: 13 }}
                />
              ];
            }

            if (params?.row?.Ativo === 'False') {
              return [
                <GridActionsCellItem
                  key={params?.id}
                  icon={<EditIcon fontSize="small" />}
                  label="Selecionar Usuários"
                  showInMenu
                  onClick={() => handleOpenEdit(params?.id)}
                  sx={{ fontSize: 13 }}
                />,
                <GridActionsCellItem
                  key={params?.id}
                  icon={<EditIcon fontSize="small" />}
                  label="Visualizar/Alterar"
                  showInMenu
                  onClick={() => handleOpenEdit(params?.id)}
                  sx={{ fontSize: 13 }}
                />,
                <GridActionsCellItem
                  key={params?.id}
                  icon={<DeleteIcon fontSize="small" />}
                  label="Desativar"
                  onClick={() => handleOpen(params.id)}
                  showInMenu
                  sx={{ color: 'red', fontSize: 13 }}
                />
              ];
            }
          } else {
            return [];
          }
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
        rows={rows}
        autoHeight
        sx={datagridSx}
        columns={columns}
        loading={loading}
        getRowId={(row) => row?.Id}
        checkboxSelection
        disableSelectionOnClick
        pagination
        hideFooter={true}
      />
      <CadastrosTablePagination styledtheme={styledtheme}>
        <TablePagination
          component="div"
          labelRowsPerPage="Clientes por página"
          sx={{
            backgroundColor: theme.palette.background.standard,
            borderRadius: '0px 0px 5px 5px'
          }}
          labelDisplayedRows={function defaultLabelDisplayedRows({
            from,
            to,
            count
          }) {
            return `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`;
          }}
          page={page}
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPage={rowsPerPage}
        />
      </CadastrosTablePagination>

      <Modal
        open={openIncludeExcludeUser}
        onClose={handleCloseIncludeExcludeUser}
      >
        <MTWModal
          action={'register'}
          size={'small'}
          title={'Cadastrar Cliente'}
          subtitle={'Insira os dados do novo cliente'}
        >
          <ModalButton>
            <Button
              text="Cancelar"
              style={{ marginRight: 10 }}
              outline
              onClick={handleCloseIncludeExcludeUser}
            >
              Cancelar
            </Button>
            <Button text="Enviar" onClick={handleSubmit} primary>
              Enviar
            </Button>
          </ModalButton>
        </MTWModal>
      </Modal>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography sx={{ p: 3, textAlign: 'center' }}>
            Essa ação não pode ser desfeita. <br /> Tem certeza que deseja
            excluir permanentemente esses dados?
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
              text="
              Excluir"
              style={{
                marginLeft: 10
              }}
              primary
              onClick={() => dispatch(deleteCadastrar({ id: currentid }))}
            >
              {isDeletingCadastrar === 'loading' ? (
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

      <CadastroModal
        openEdit={openEdit}
        onClose={handleCloseEdit}
        isLoading={isUpdatingClient}
        onClick={handleCloseEdit}
        handleSubmit={handleSubmit}
        title="Editar Cliente"
        onChange={handleChange}
        initialSingleObject={initialSingleObject}
        newSingleObject={newSingleObject}
        rows={rows}
        rowId={rowId}
      />
    </Box>
  );
};

export default CadastrosBasicosTable;
