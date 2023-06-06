import EmailOTP from '@/components/authComponents/EmailOTP/EmailOTP';
import Grid from '@mui/material/Grid';
import React from 'react';

const emailOTP = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
        <EmailOTP />
      </Grid>
    </Grid>
  );
};

export default emailOTP;
