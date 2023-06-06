import HubTopDetail from '@/components/hubTopComponents/HubTopDetail/HubTopDetail';
import uriGuard from '@/pages/guard';
import React from 'react';

const index = () => {
  uriGuard();
  return (
    <>
      <HubTopDetail />
    </>
  );
};

export default index;
