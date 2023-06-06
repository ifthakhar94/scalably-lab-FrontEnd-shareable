import Login from '@/components/authComponents/Login/Login';
import Grid from '@mui/material/Grid';
import React from 'react';

const login = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
        <Login />
      </Grid>
    </Grid>
  );
};

export default login;
