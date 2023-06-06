import Signup from '@/components/authComponents/Signup/Signup';
import Grid from '@mui/material/Grid';
import React from 'react';

const signup = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
        <Signup />
      </Grid>
    </Grid>
  );
};

export default signup;
