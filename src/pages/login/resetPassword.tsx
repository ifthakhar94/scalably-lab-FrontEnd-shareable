import Re_setting_password from '@/components/authComponents/Re_setting_password/Re_setting_password';
import { Grid } from '@mui/material';
import React from 'react';

const resettingPassword = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
        <Re_setting_password />
      </Grid>
    </Grid>
  );
};

export default resettingPassword;
