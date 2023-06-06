import TermsService from '@/components/hubTopComponents/TermsService/TermsService';
import uriGuard from '@/pages/guard';

import router from 'next/router';
import React, { useEffect } from 'react';

const terms = () => {
  uriGuard();
  return (
    <>
      <TermsService />
    </>
  );
};

export default terms;
