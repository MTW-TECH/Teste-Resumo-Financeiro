import React from 'react';
import { Container } from '@mui/material';

function index({ padding, paddingTop, percentage, children }) {
  return (
    <Container
      maxWidth={false}
      sx={{
        padding: padding,
        paddingTop: paddingTop,
        width: percentage ? percentage : '80%'
      }}
    >
      {children}
    </Container>
  );
}

export default index;
