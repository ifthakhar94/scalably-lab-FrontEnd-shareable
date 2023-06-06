import NewsUI from '@/components/newsComponents/NewsUI/NewsUI';
import uriGuard from '@/pages/guard';

import router from 'next/router';
import React, { useEffect } from 'react';

const news = () => {
  uriGuard();
  return (
    <>
      <NewsUI />
    </>
  );
};

export default news;
