import { Box, TablePagination, Typography, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Button from 'components/MTWActions/Button';
import { renderCellExpand } from 'components/PaperElipsis';
import { companySelector } from 'features/cadastroFeatures/Company/company.store';
import {
  getQuadroDownloadEndpoint,
  getQuadroEndpoint,
  spedSelector
} from 'features/elementarFeatures/sped/sped.store';
import React, { useEffect, useRef, useState } from 'react';
import CsvDownload from 'react-json-to-csv';
import { useDispatch, useSelector } from 'react-redux';
import { convertElementarBatchDateValue } from 'services/convertDate';
import DownloadIcon from '@mui/icons-material/Download';
import BarChartIcon from '@mui/icons-material/BarChart';
import DeveloperBoardOffIcon from '@mui/icons-material/DeveloperBoardOff';
import theme from 'theme';
import './style.css';
import { ElementarTableCss } from '../../../styledComponentsStyles';

const ButtonHover = () => {
  const exportstyle = {
    backgroundColor: 'transparent',
    border: 'none',
    padding: 0,
    color: 'white'
  };

  const headerSx = {
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: 'rgba(243, 244, 246, 0.87)',
      fontSize: 14
    },
    '& .MuiDataGrid-row': {
      fontSize: 13
    }
  };
  const {
    spedcruzaanalisetype,
    spedanalisetype,
    quadroendpoint,
    quadropaginatedendpoint,
    isloadingQuadroendpoint
  } = useSelector(spedSelector);
  const { singlecompany } = useSelector(companySelector);
  const [listIndex, setListIndex] = useState();
  const [listAnaliseIndex, setListAnaliseIndex] = useState();
  const [dateBatch] = useState({
    date_inicio: '' || null,
    date_fim: '' || null
  });
  const [page, setPage] = useState(0);
  const [per_page, setRowsPerPage] = useState(10);
  let dispatch = useDispatch();
  const firstRender = useRef(false);
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  //   const [spedQuadroValue, setSpedQuadroValue] = useState(
  //     spedcruzaanalisetype[0]
  //   );
  //   const [spedQuadroAnaliseValue, setSpedQuadroAnaliseValue] = useState(
  //     spedanalisetype[0]
  //   );
  //   console.log(spedQuadroValue);
  let newVal = spedcruzaanalisetype?.items?.find((el) => {
    return el.Id === listIndex;
  });
  let newAnaliseVal = spedanalisetype?.items?.find((el) => {
    return el.Id === listAnaliseIndex;
  });

  const handleQuadroValue = (index) => {
    setListIndex(index);
    // setSpedQuadroValue(newVal);
  };
  const handleQuadroAnaliseValue = (index) => {
    setListAnaliseIndex(index);
    // setSpedQuadroAnaliseValue(newAnaliseVal);
  };
  //   console.log(listIndex);
  //   console.log(newVal);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 12));
    setPage(0);
  };

  //QuadroAnalitico Cruza endpoint UseEffects
  useEffect(() => {
    dispatch(
      getQuadroEndpoint({
        endpoint: newVal?.EndPoint,
        company_id: singlecompany?.Cnpj,
        initial_date:
          dateBatch?.date_inicio === null
            ? ''
            : convertElementarBatchDateValue(dateBatch?.date_inicio),
        final_date:
          dateBatch?.date_fim === null
            ? ''
            : convertElementarBatchDateValue(dateBatch?.date_fim),
        page,
        per_page
      })
    );
  }, [
    newVal,
    spedcruzaanalisetype,
    dateBatch?.date_inicio,
    dateBatch?.date_fim,
    page,
    per_page
  ]);

  //QuadroAnalitico Analise endpoint UseEffects
  useEffect(() => {
    dispatch(
      getQuadroEndpoint({
        endpoint: newAnaliseVal?.EndPoint,
        company_id: singlecompany?.Cnpj,
        initial_date:
          dateBatch?.date_inicio === null
            ? ''
            : convertElementarBatchDateValue(dateBatch?.date_inicio),
        final_date:
          dateBatch?.date_fim === null
            ? ''
            : convertElementarBatchDateValue(dateBatch?.date_fim),
        page,
        per_page
      })
    );
  }, [
    newAnaliseVal,
    spedanalisetype,
    dateBatch?.date_inicio,
    dateBatch?.date_fim,
    page,
    per_page
  ]);

  useEffect(() => {
    if (firstRender.current) {
      return;
    }
    if (spedcruzaanalisetype?.items) {
      //   setSpedQuadroValue(spedcruzaanalisetype?.items[0]);
      //   newVal = spedcruzaanalisetype?.items[0];
      firstRender.current = true;
    }
  }, [spedcruzaanalisetype]);

  //Cruzamento useeffect Download
  useEffect(() => {
    dispatch(
      getQuadroDownloadEndpoint({
        endpoint: newVal?.EndPoint,
        company_id: singlecompany?.Cnpj,
        initial_date:
          dateBatch?.date_inicio === null
            ? ''
            : convertElementarBatchDateValue(dateBatch?.date_inicio),
        final_date:
          dateBatch?.date_fim === null
            ? ''
            : convertElementarBatchDateValue(dateBatch?.date_fim),
        page,
        per_page: quadroendpoint?.total || 1
      })
    );
  }, [quadroendpoint]);

  const quadroItems = quadroendpoint?.items;
  const quadrocolumn = [];
  for (const key in quadroItems && quadroItems[0]) {
    quadrocolumn.push(key);
  }

  const tipoDiv = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const addSped = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const btnsDiv = {
    display: 'flex',
    alignItems: 'center'
  };

  return (
    <>
      <Box sx={{ height: 130, width: '100%', padding: '40px 0' }}>
        <div style={tipoDiv}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start'
            }}
          >
            <Box
              sx={{
                width: matches ? '100%' : '45%',
                backgroundColor: theme.palette.textlight.main,
                padding: '20px 25px 20px 10px'
              }}
            >
              <div className="dropdown">
                <Button className="dropbtn">
                  <div style={addSped}>
                    <DeveloperBoardOffIcon sx={{ height: '16px' }} />
                  </div>
                  Cruzamento
                </Button>

                <div className="dropdown-content">
                  {spedcruzaanalisetype?.items?.length === 0 ? (
                    <Typography
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      Lista esta vazia
                    </Typography>
                  ) : (
                    spedcruzaanalisetype?.items?.map((item) => (
                      <p
                        className="dropdownText"
                        key={item.Id}
                        onClick={() => handleQuadroValue(item.Id)}
                      >
                        {item.Descricao}
                      </p>
                    ))
                  )}
                </div>
              </div>
            </Box>
            <Box
              sx={{
                width: matches ? '100%' : '45%',
                backgroundColor: theme.palette.textlight.main,
                padding: '20px 20px'
              }}
            >
              <div className="dropdown">
                <Button className="dropbtn">
                  <div style={addSped}>
                    <BarChartIcon sx={{ height: '20px' }} />
                  </div>
                  Analise
                </Button>
                <div className="dropdown-content">
                  {spedanalisetype?.items?.length === 0 ? (
                    <Typography
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      Lista esta vazia
                    </Typography>
                  ) : (
                    spedanalisetype?.items?.map((item) => (
                      <p
                        className="dropdownText"
                        key={item.Id}
                        onClick={() => handleQuadroAnaliseValue(item.Id)}
                      >
                        {item.Descricao}
                      </p>
                    ))
                  )}
                </div>
              </div>
            </Box>
          </Box>
          <div style={btnsDiv}>
            <Button primary>
              <div style={addSped}>
                <DownloadIcon sx={{ height: '18px' }} />
                <div>
                  <CsvDownload
                    data={quadropaginatedendpoint?.items}
                    style={exportstyle}
                  >
                    Download
                  </CsvDownload>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </Box>

      <DataGrid
        rows={quadroItems && quadroItems ? quadroItems : []}
        columns={
          quadrocolumn?.length
            ? quadrocolumn
                .filter((e) => {
                  return e !== 'Id' && e !== 'Cliente';
                })
                .map((item) => ({
                  field: item,
                  headerName: item,
                  width: 150,
                  renderCell: renderCellExpand,
                  headerAlign: 'left',
                  align: 'center'
                }))
            : []
        }
        getRowId={(row) => row.Id}
        loading={isloadingQuadroendpoint === 'loading' ? true : false}
        hideFooter={true}
        autoHeight
        sx={headerSx}
      />
      <ElementarTableCss>
        <TablePagination
          component="div"
          page={page}
          count={quadroendpoint?.total || '0'}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPage={per_page}
          rowsPerPageOptions={[10, 20, 30]}
        />
      </ElementarTableCss>
    </>
  );
};

export default ButtonHover;
