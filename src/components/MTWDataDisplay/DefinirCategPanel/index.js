import React, { useState, useEffect } from 'react';
import {
  Table as Tb,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
//STYLING:
import { styled } from '@mui/material/styles';
import './style.css';

function DefinirMinorTable({
  dataKeys,
  rowdata,
  tipo,
  handleSaveData,
  page,
  count,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPage,
  rowsPerPageOptions,
  hidePagination
}) {
  const NotaAvulsaTableKeys = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      background: '#F3F4F6DE',
      color: '#374151',
      fontWeight: '600'
    }
  }));

  //Registro e envio de todos os dados do input:
  const [currentQty, setCurrentQty] = useState(rowdata.qty);
  const [currentObs, setCurrentObs] = useState(rowdata.obs);

  //Ajusta o currentQty para o caso de vazio:
  useEffect(() => {
    if (!currentQty || currentQty === 'None') {
      setCurrentQty(0);
    }
  }, [currentQty]);

  //Atualização automática:
  useEffect(() => {
    if (currentQty) {
      handleSaveData(currentQty, currentObs);
    }
  }, [currentQty, currentObs]);

  //Column titles:
  const alignedAtTop = dataKeys.filter((title) => title === 'Tipo de Arquivo');
  const alignedCenter = dataKeys.filter((title) => title !== 'Tipo de Arquivo');

  return (
    <div
      style={{
        padding: '0px',
        border: '1px solid #e8e8e8',
        borderRadius: '5px'
      }}
    >
      <TableContainer>
        {/******-******-******/}
        <Tb
          sx={{
            minWidth: 660,
            borderRadius: '5px'
          }}
        >
          <TableHead>
            <TableRow>
              {alignedAtTop.map((title) => (
                <NotaAvulsaTableKeys key={title} align="center">
                  {title}
                </NotaAvulsaTableKeys>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={rowdata.id}>
              {/*Row 1 Col 1:*/}
              <TableCell
                sx={{ minWidth: '340px', margin: '0 auto' }}
                align="center"
              >
                {tipo}
              </TableCell>
            </TableRow>
          </TableBody>
        </Tb>
        {/******-******-******/}
        <Tb style={{ minWidth: 660, borderRadius: '5px' }}>
          <TableHead>
            <TableRow>
              {alignedCenter.map((title) => (
                <NotaAvulsaTableKeys key={title} align="center">
                  {title}
                </NotaAvulsaTableKeys>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={rowdata.id}>
              {/*Row 2 Col 1:*/}
              <TableCell align="center" sx={{ width: '50%' }}>
                <input
                  className="qtyInput"
                  type="number"
                  value={currentQty}
                  onChange={(e) => setCurrentQty(e.target.value)}
                ></input>
              </TableCell>
              {/*Row 2 Col 2:*/}
              <TableCell align="center" sx={{ width: '50%' }}>
                <textarea
                  className="obsInput"
                  type="text"
                  style={{ padding: '8px 6px 6px 10px' }}
                  value={currentObs}
                  onChange={(e) => setCurrentObs(e.target.value)}
                ></textarea>
              </TableCell>
            </TableRow>
          </TableBody>
        </Tb>
      </TableContainer>
      {hidePagination ? (
        <>{null}</>
      ) : (
        <TablePagination
          sx={{ transform: 'translate(-0%, 15%)' }}
          component="div"
          page={page}
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          labelRowsPerPage="Notas por página"
        />
      )}
    </div>
  );
}

export default DefinirMinorTable;
