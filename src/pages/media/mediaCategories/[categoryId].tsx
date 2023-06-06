import MediaCategory from '@/components/mediaComponents/MediaCategory/MediaCategory';
import MediaTopUI from '@/components/mediaComponents/MediaTop/MediaTopUI';
import { useRouter } from 'next/router';
import React from 'react';

const index = () => {
  const router = useRouter();

  return (
    <>
      {console.log(router.query.categoryId)}
      <MediaCategory catName={router.query.categoryId} />
    </>
  );
};

export default index;
