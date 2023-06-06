import SignupPasswordSetting from '@/components/authComponents/SignupPasswordSetting/SignupPasswordSetting';
import Grid from '@mui/material/Grid';
import React from 'react';

const signupPasswordSetting = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
        <SignupPasswordSetting />
      </Grid>
    </Grid>
  );
};

export default signupPasswordSetting;
