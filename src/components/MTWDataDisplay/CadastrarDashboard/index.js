import React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Box, Modal, TablePagination, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from 'components/MTWActions/Button';
import EditIcon from '@mui/icons-material/Edit';
import { renderCellExpand } from 'components/PaperElipsis';
import { convertDateValue } from 'services/convertDate';
import { TableCss } from '../../../styledComponentsStyles';

const CadastroDashboardTable = ({
  rows,
  loading,
  onRowsPerPageChange,
  onPageChange,
  page,
  rowsPerPage,
  count
}) => {
  //   let dispatch = useDispatch();

  //   const { isUpdatingClientCompany } = useSelector(userSelector);
  //   const { deleteEmpresa } = useSelector(userSelector);

  //   const [currentid, setCurrentId] = React.useState('');

  //   useEffect(() => {
  //     if (deleteEmpresa === 'success') {
  //       toast.success('detalhes da empresa excluídos com sucesso!');
  //       window.location.reload();
  //     } else {
  //       return {};
  //     }
  //   }, [deleteEmpresa]);

  const [open, setOpen] = React.useState(false);
  //   const [empresaRowId, setEmpresaRowId] = useState('');
  //   const [newempresaobject, setNewEmpresaObject] = useState({});
  //   const [newSingleEmpresaObject, setNewSingleEmpresaObject] =
  //     useState(newempresaobject);
  //   const [openEmpresaEdit, setOpenEmpresaEdit] = useState(false);

  //   const handleOpen = (id) => {
  //     setCurrentId(id);
  //     setOpen(true);
  //   };
  const handleClose = () => setOpen(false);

  //   const handleOpenEmpresaEdit = (id) => {
  //     setEmpresaRowId(id);
  //     setOpenEmpresaEdit(true);
  //   };
  //   const handleCloseEmpresaEdit = () => setOpenEmpresaEdit(false);

  //   const handleChange = (event) => {
  //     setNewSingleEmpresaObject({
  //       ...newSingleEmpresaObject,
  //       [event.target.name]: event.target.value
  //     });
  //   };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();

  //     dispatch(
  //       getUpdateClientCompany({
  //         id: empresaRowId,
  //         data: newSingleEmpresaObject
  //       })
  //     );
  //   };

  //   useEffect(() => {
  //     if (isUpdatingClientCompany === 'success') {
  //       toast.success('Atualização do cliente com sucesso!');
  //       setOpenEmpresaEdit(false);
  //       window.location.reload();
  //     } else {
  //       setOpenEmpresaEdit(false);
  //     }
  //   }, [isUpdatingClientCompany]);

  //   useEffect(() => {
  //     let newRowObject = rows?.find((el) => {
  //       return el.Id === empresaRowId;
  //     });
  //     setNewEmpresaObject(newRowObject);
  //   }, [empresaRowId]);

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
  function getFormattedDate(params) {
    return (
      `${convertDateValue(params.row.DataInicio)}` ||
      'None' ||
      `${convertDateValue(params.row.DataFim)}` ||
      'None'
    );
  }
  const columns = React.useMemo(
    () => [
      {
        field: 'Dashboard',
        headerName: 'Nome',
        minWidth: 130,
        flex: 1
      },
      {
        field: 'DataInicio',
        headerName: 'Initial Date',
        minWidth: 150,
        // align: 'center',
        // headerAlign: 'center',
        flex: 1,
        valueGetter: getFormattedDate,
        renderCell: renderCellExpand
      },
      {
        field: 'DataFim',
        headerName: 'Final Date',
        minWidth: 150,
        // align: 'center',
        // headerAlign: 'center',
        flex: 1,
        valueGetter: getFormattedDate,
        renderCell: renderCellExpand
      },
      {
        field: 'Ativo',
        headerName: 'Status',
        headerAlign: 'center',
        minWidth: 170,
        flex: 1,
        align: 'center',
        editable: true,
        renderCell: (params) => {
          return (
            <>
              <Box
                sx={{
                  backgroundColor:
                    params.row.Ativo === 'True' ? '#10B981' : '#EF4444',
                  padding: '2px 5px',
                  width: 60,
                  color: '#fff',
                  borderRadius: 10,
                  textAlign: 'center',
                  fontSize: 11
                }}
              >
                {params.row.Ativo === 'True' ? 'Active' : 'Inactive'}
              </Box>
            </>
          );
        }
      },
      {
        field: 'action',
        type: 'actions',
        minWidth: 30,
        flex: 1,
        getActions: (params) => {
          if (params?.row?.Ativo && params?.row?.Ativo?.length) {
            if (params?.row?.Ativo === 'True') {
              return [
                <GridActionsCellItem
                  key={params?.id}
                  icon={<EditIcon fontSize="small" />}
                  label="Visualizar/Alterar"
                  showInMenu
                  //   onClick={() => handleOpenEmpresaEdit(params?.id)}
                  sx={{ fontSize: 13 }}
                />,

                <GridActionsCellItem
                  key={params?.id}
                  icon={<DeleteIcon fontSize="small" sx={{ color: 'red' }} />}
                  label="Desativar"
                  //   onClick={() => handleOpen(params?.id)}
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
                  //   onClick={() => handleOpenEmpresaEdit(params?.id)}
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
                  //   onClick={() => handleOpenEmpresaEdit(params?.id)}
                  sx={{ fontSize: 13 }}
                />,
                <GridActionsCellItem
                  key={params?.id}
                  icon={<DeleteIcon fontSize="small" />}
                  label="Desativar"
                  //   onClick={() => handleOpen(params?.id)}
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

  const headerSx = {
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: 'rgba(243, 244, 246, 0.87)',
      fontSize: 14
    },
    '& .MuiDataGrid-row': {
      fontSize: 12
    }
  };

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        autoHeight
        sx={headerSx}
        columns={columns}
        loading={loading}
        getRowId={(row) => row?.Id}
        checkboxSelection
        disableSelectionOnClick
        pagination
        hideFooter={true}
      />
      <TableCss>
        <TablePagination
          component="div"
          page={page}
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPage={rowsPerPage}
        />
      </TableCss>
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
              text="Delete"
              style={{
                marginLeft: 10
              }}
              primary
              //   onClick={() =>
              //     dispatch(deleteCadastrarEmpresa({ id: currentid }))
              //   }
            >
              {/* {deleteEmpresa === 'loading' ? (
                <div>
                  <FetchingAnimation />
                </div>
              ) : (
                'Confirmar exclusão'
              )} */}
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Edit modal starts here
      <CadastroEmpresaModal
        handleSubmit={handleSubmit}
        openEdit={openEmpresaEdit}
        onClose={handleCloseEmpresaEdit}
        isLoading={isUpdatingClientCompany}
        onClick={handleCloseEmpresaEdit}
        title="Editar Cadastrar Cliente Empresa"
        ufdefaultValue={newempresaobject?.Uf}
        ufvalue={newSingleEmpresaObject?.uf}
        cidadedefaultValue={newempresaobject?.Cidade}
        cidadevalue={newSingleEmpresaObject?.cidade}
        bairrodefaultValue={newempresaobject?.Bairro}
        bairrovalue={newSingleEmpresaObject?.bairro}
        logdefaultValue={newempresaobject?.Logradouro}
        logvalue={newSingleEmpresaObject?.logradouro}
        compledefaultValue={newempresaobject?.Complemento}
        complevalue={newSingleEmpresaObject?.complemento}
        insdefaultValue={newempresaobject?.InscricaoEstadual}
        insvalue={newSingleEmpresaObject?.inscricao_estadual}
        cnpjdefaultValue={newempresaobject?.Cnpj}
        cnpjvalue={newSingleEmpresaObject?.cnpj}
        nomedefaultValue={newempresaobject?.Nome}
        nomevalue={newSingleEmpresaObject?.nome}
        onChange={handleChange}
      /> */}
    </Box>
  );
};

export default CadastroDashboardTable;
