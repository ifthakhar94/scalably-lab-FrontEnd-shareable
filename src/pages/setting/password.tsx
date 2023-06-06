import Setting_password from '@/components/authComponents/Setting_password/Setting_password';
import { Grid } from '@mui/material';
import React from 'react';

const settingPassword = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
        <Setting_password />
      </Grid>
    </Grid>
  );
};

export default settingPassword;
