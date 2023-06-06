import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const CircleLoader = () => {
  return (
    <>
      <Skeleton variant="circular" width={240} height={240} />
    </>
  );
};

export default CircleLoader;
