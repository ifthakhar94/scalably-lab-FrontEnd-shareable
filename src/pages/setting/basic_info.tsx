import SettingBasicInfo from '@/components/authComponents/SettingBasicInfo/SettingBasicInfo';
import Grid from '@mui/material/Grid';
import React from 'react';
import uriGUARD from '../guard';

const settingBasicInfo = () => {
  uriGUARD();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
        <SettingBasicInfo />
      </Grid>
    </Grid>
  );
};

export default settingBasicInfo;
