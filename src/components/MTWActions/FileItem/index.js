import React, { /*useState, /*useEffect,*/ useRef } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';

function FileItem({ fileName, removePickedFile, noRemove }) {
  let bg = '#555ccc';

  let fileItemId = useRef();

  return (
    <div
      ref={fileItemId}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        rowGap: '5px',
        backgroundColor: { bg }
      }}
    >
      {/*if not accepted, replace by display grid*/}
      <div style={{ display: 'flex' }}>
        <DescriptionIcon sx={{ color: '#999', margin: '0px 3px 0px 0px' }} />
        <p style={{ whiteSpace: 'pre' }}>{fileName}</p>
      </div>
      {!noRemove ? (
        <div style={{ padding: '0px 0px 0px 10px' }}>
          <DeleteIcon
            sx={{ color: '#999' }}
            onClick={() => {
              removePickedFile(fileName);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

export default FileItem;
