import HubTopUI from '@/components/hubTopComponents/HubTopUI/HubTopUI';
import uriGuard from '@/pages/guard';

import router from 'next/router';
import React, { useEffect } from 'react';

const hubtop = () => {
  uriGuard();
  return (
    <>
      <HubTopUI />
    </>
  );
};

export default hubtop;
