import React from 'react';
import { Stack, Typography, Link } from '@mui/material';

function BottomBar() {
  return (
    <Stack
      padding={1}
      position="fixed"
      left="0"
      bottom="0"
      width="100vw"
      bgcolor="rgb(0, 30, 60)"
      direction="row"
      justifyContent="center"
    >
      <Typography color="white">
        {' '}
        built by{' '}
        <Link
          href="https://github.com/guitrentini96"
          underline="hover"
          target="_blank"
          rel="noopener"
          sx={{ color: 'white' }}
        >
          Guilherme Campara
        </Link>{' '}
        :)
      </Typography>
    </Stack>
  );
}

export default BottomBar;
