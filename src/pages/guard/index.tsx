import router from 'next/router';
import React, { useEffect } from 'react';

export default function uriGuard() {
  useEffect(() => {
    let User_Data = localStorage.getItem('UserToken');
    if (!User_Data) {
      router.push('/');
    }
  }, []);
}
