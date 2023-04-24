import React from 'react';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

export default function RatingComponent() {
  const ratingValue = 4;

  return (
    <Box sx={{ display: 'flex' }}>
      {Array.from(Array(ratingValue)).map((_, index) => (
        <StarIcon key={index} />
      ))}
    </Box>
  );
}