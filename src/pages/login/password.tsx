import Input_password from '@/components/authComponents/Input_password/Input_password';
import Grid from '@mui/material/Grid';
import React from 'react';

const inputPassword = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
        <Input_password />
      </Grid>
    </Grid>
  );
};

export default inputPassword;
