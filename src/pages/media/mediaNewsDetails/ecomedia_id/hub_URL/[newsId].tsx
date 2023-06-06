import MediaCategory from '@/components/mediaComponents/MediaCategory/MediaCategory';
import MediaNewsDetails from '@/components/mediaComponents/MediaNewsDetails/MediaNewsDetails';
import MediaTopUI from '@/components/mediaComponents/MediaTop/MediaTopUI';
import { useRouter } from 'next/router';
import React from 'react';

const index = () => {
  const router = useRouter();

  return (
    <>
      {console.log(router.query.newsId)}
      <MediaNewsDetails />
    </>
  );
};

export default index;
