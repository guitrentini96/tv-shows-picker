import React from 'react';
import { Paper, Stack, Typography, Link } from '@mui/material';

function ShowCard(props) {
  return (
    <Paper
      key={props.show.id}
      elevation={10}
      sx={{
        backgroundColor: 'rgb(0, 30, 60)',
        padding: 2,
        width: '300px',
      }}
    >
      <Stack alignItems="center" spacing={1}>
        <Typography variant="h4" color="white">
          {props.show.title}
        </Typography>

        <img
          src={props.show.img_link}
          alt="shows cover"
          style={{ width: '80%' }}
        />
        <Typography variant="subtitle1">
          <Link
            href={props.show.imdb_link}
            underline="hover"
            target="_blank"
            rel="noreferrer noopener"
          >
            imdb score: {props.show.imdb_score}
          </Link>
        </Typography>
      </Stack>
    </Paper>
  );
}

export default ShowCard;
