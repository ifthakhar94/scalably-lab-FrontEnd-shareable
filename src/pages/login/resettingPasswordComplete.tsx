import React from 'react';
import { Grid } from '@mui/material';
import Setting_password_complete from '@/components/authComponents/Setting_password_complete/Setting_password_complete';

const resettingPasswordComplete = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
        <Setting_password_complete />
      </Grid>
    </Grid>
  );
};

export default resettingPasswordComplete;
