import React, { /*useState, useEffect,*/ useRef } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import VerifiedIcon from '@mui/icons-material/Verified';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

function FileListed({ fileName, fileResult }) {
  const fileItemId = useRef();

  /*
  const [successToUpload, setSuccessToUpload] = useState();
  useEffect(() => {
    if (fileResult) {
      let result = fileResult.substring(17);
      if (result === 'rejected') {
        setSuccessToUpload(false);
      } else if (result === 'fulfilled') {
        setSuccessToUpload(true);
      }
    }
  }, [fileResult]);
  */

  return (
    <div
      ref={fileItemId}
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          columnGap: '5px'
        }}
      >
        {fileResult ? (
          <div>
            <VerifiedIcon sx={{ color: '#2DD424', width: '15px' }} />
          </div>
        ) : (
          <div>
            <DisabledByDefaultIcon sx={{ color: '#D91A1A', width: '15px' }} />
          </div>
        )}
        <DescriptionIcon sx={{ color: '#999', width: '15px' }} />
        <p style={{ whiteSpace: 'pre' }}>{fileName}</p>
      </div>
    </div>
  );
}

export default FileListed;
