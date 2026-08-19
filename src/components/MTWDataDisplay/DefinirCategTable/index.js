import React, { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Box, Modal, TablePagination, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
//import VisibilityIcon from '@mui/icons-material/Visibility';
import { TableCss } from '../../../styledComponentsStyles';
import Button from 'components/MTWActions/Button';
//import MoreIcon from '@mui/icons-material/More';
//import DeleteIcon from '@mui/icons-material/Delete';
//import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import FetchingAnimation from 'components/MTWFeedback/Fetching';
//COMPONENTS
import DefinirMinorTable from 'components/MTWDataDisplay/DefinirCategPanel';
import DataGridColumnTitle from 'components/MTWDataDisplay/DataGridColumnLabel';
//SERVICES
//REDUX
import { useDispatch, useSelector } from 'react-redux';
//REDUX STORE
import {
  saveCategoriesFiles,
  definirCategoriasSelector
} from 'features/DefinirCategorias/definirCategorias.store';

function DefinirTable({
  rows,
  refreshTable,
  categoryId,
  category,
  hidePagination,
  count,
  page,
  loading,
  onPageChange,
  rowsPerPage,
  rowsPerPageOptions,
  onRowsPerPageChange
}) {
  const { isSavingCategoriesFiles } = useSelector(definirCategoriasSelector);

  let dispatch = useDispatch();

  //Dados locais:
  const [localData, setLocalData] = useState({
    id: '',
    tipo: '',
    qty: '',
    obs: ''
  });
  const [localTipo, setLocalTipo] = React.useState('');
  /*State usado para exibição do tipo do arquivo no modal*/

  //Deal with the opening and closing of the Modal:
  const [open, setOpen] = React.useState(false);
  const handleOpen = (id, tipo, qtd, obs) => {
    setLocalData({
      id: id,
      tipo: tipo,
      qty: qtd,
      obs: obs
    });
    setLocalTipo(tipo);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //Columns titles:
  let edicao = () => {
    return <EditIcon sx={{ fontSize: '15px' }} />;
  };
  let customTitle = (name) => {
    return <DataGridColumnTitle name={name} />;
  };

  //Columns:
  const columns = React.useMemo(
    () => [
      {
        field: 'TipoArquivo',
        headerName: customTitle('Tipo de arquivo'),
        minWidth: '200px',
        flex: 2,
        editable: false,
        renderCell: (params) => {
          let tipoArquivo = params.row.TipoArquivo;
          let tipoArquivoLengthTol = 45;
          let tipoArquivoLength = params.row.TipoArquivo?.length;
          const [tipoArquivoValue, setTipoArquivoValue] = useState(tipoArquivo);
          const [tipoArquivoSwitch, setTipoArquivoSwitch] = useState(false);
          useEffect(() => {
            if (tipoArquivoSwitch) {
              setTipoArquivoValue(tipoArquivo);
            } else if (tipoArquivoSwitch === false) {
              if (tipoArquivoLength > tipoArquivoLengthTol) {
                let shorterTipoArquivo = tipoArquivo.slice(0, 45);
                setTipoArquivoValue(shorterTipoArquivo);
              }
            }
          }, [tipoArquivoValue, tipoArquivoSwitch]);
          const handleExpandTipoArquivo = () => {
            setTipoArquivoSwitch(!tipoArquivoSwitch);
          };
          return tipoArquivo ? (
            tipoArquivoLength > tipoArquivoLengthTol ? (
              <p
                style={{
                  whiteSpace: 'normal',
                  width: '100%'
                }}
              >
                {tipoArquivoValue}{' '}
                <span onClick={handleExpandTipoArquivo}>
                  {!tipoArquivoSwitch ? (
                    <AddBoxIcon
                      sx={{
                        fontSize: '15.5px',
                        color: '#bbb',
                        '&:hover': { color: '#999', cursor: 'pointer' }
                      }}
                    />
                  ) : (
                    <IndeterminateCheckBoxIcon
                      sx={{
                        fontSize: '15.5px',
                        color: '#bbb',
                        '&:hover': { color: '#999', cursor: 'pointer' }
                      }}
                    />
                  )}
                </span>
              </p>
            ) : (
              tipoArquivo
            )
          ) : (
            params.row.TipoArquivo
          );
        }
      },
      {
        field: 'Qtd',
        headerName: customTitle('Quantidade'),
        type: 'number',
        headerAlign: 'center',
        align: 'center',
        flex: 0.5,
        editable: false
      },
      {
        field: 'Obs',
        headerName: customTitle('Observação'),
        type: 'number',
        headerAlign: 'center',
        align: 'center',
        minWidth: '200px',
        flex: 1.6,
        editable: false
      },
      {
        field: 'action',
        headerName: edicao(),
        type: 'actions',
        minWidth: '50px',
        flex: 0.4,
        getActions: (params) => {
          if (params?.row?.Id) {
            return [
              <GridActionsCellItem
                key={params?.id}
                icon={<EditIcon fontSize="small" />}
                label="Editar"
                onClick={() =>
                  handleOpen(
                    params.row.IdCategoria,
                    params.row.TipoArquivo,
                    params.row.Qtd,
                    params.row.Obs
                  )
                }
                sx={{ fontSize: 13 }}
              />
            ];
          } else {
            return [];
          }
        }
      }
    ],
    []
  );

  //Styling:
  const headerSx = {
    borderRadius: '0px 0px 5px 5px',
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: 'rgba(243, 244, 246, 0.87)',
      borderRadius: '0px 0px 0px 0px',
      color: '#222',
      fontWeight: 800,
      fontSize: 14
    },
    '& .MuiDataGrid-row': {
      fontSize: 13,
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
    width: 940,
    borderRadius: '6px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: '32px 38px 20px 38px'
  };

  //Concerning the SolicitarMinorTable:
  const [minorPage, setMinorPage] = useState(0);
  const [per_page, setRowsPerPage] = useState(6);
  const handlePageChange = (event, newPage) => {
    setMinorPage(newPage);
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 12));
    setMinorPage(0);
  };

  //Data that will be passed to the dispatch - saveData:
  const [saveData, setSaveData] = useState({
    id: categoryId,
    tipo: localData.tipo,
    qty: localData.qty,
    obs: localData.obs
  });
  /*Inicialmente recebe um estado provisório, o "localData"*/

  //Updating the saveData along with the child component:
  const handleSaveData = (qtd, obs) => {
    setSaveData({
      id: categoryId,
      tipo: localData.tipo,
      qtd: qtd,
      obs: obs
    });
  };

  //Dispatch the saveData by pressing certain button:
  const dispatchData = () => {
    dispatch(saveCategoriesFiles(saveData));
    setTimeout(() => {
      handleClose();
    }, '640');
    refreshTable();
  };

  return (
    <Box sx={{ height: 'fit-content', width: '100%' }}>
      <DataGrid
        rows={rows}
        autoHeight
        sx={headerSx}
        columns={columns}
        loading={loading}
        getRowId={(row) => row?.Id}
        disableSelectionOnClick
        hideFooter={true}
      />
      {hidePagination ? (
        <>{null}</>
      ) : (
        <TableCss>
          <TablePagination
            component="div"
            page={page}
            count={count}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
          />
        </TableCss>
      )}
      {/*Modal:*/}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            sx={{
              textAlign: 'left',
              fontWeight: '700',
              padding: '20px 0px 28px 0px'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                justifyContent: 'space-between'
              }}
            >
              <div>{`Editar Tipo de arquivo da Categoria ${category}`}</div>
              <div>
                <EditIcon fontSize="small" sx={{ color: '#757575' }} />
              </div>
            </div>
          </Typography>
          <div style={{ padding: '10px 0px 10px 0px' }}>
            <DefinirMinorTable
              dataKeys={['Tipo de Arquivo', 'Quantidade', 'Observação']}
              rowdata={localData}
              tipo={localTipo}
              handleSaveData={handleSaveData}
              count={localData.id.length}
              page={minorPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              rowsPerPage={per_page}
              rowsPerPageOptions={[6, 12, 28]}
              hidePagination={true}
            />
          </div>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              margin: '0px -16px 0px 0px',
              padding: '0px 0px 0px 0px'
            }}
          >
            {/*Botão de cancelar:*/}
            <Button
              text="Cancel"
              outline
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                borderColor: 'rgba(0, 0, 0, 0.25)',
                color: '#FFF',
                height: '40px'
              }}
              onClick={handleClose}
            >
              Cancelar
            </Button>
            {/*Botão de envio:*/}
            <Button
              text="Confirmar"
              style={{
                marginLeft: 10,
                height: '40px'
              }}
              primary
              onClick={dispatchData}
            >
              {isSavingCategoriesFiles === 'loading' ? (
                <div>
                  <FetchingAnimation />
                </div>
              ) : (
                'Confirmar'
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default DefinirTable;
