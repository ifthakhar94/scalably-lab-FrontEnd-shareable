import React from 'react';
import { useRouter } from 'next/router';
import { login_url } from '@/navCentralization/nav_url';

const useAuthRedirect = (error: any) => {
  const router = useRouter();
  const routeRedirectConfig = (error: any) => {
    if (error === 401) {
      localStorage.removeItem('singupEmail');
      localStorage.removeItem('UserToken');
      localStorage.removeItem('LoginEmail');
      router.push(login_url);
    }
  };
  routeRedirectConfig(error);
};

export default useAuthRedirect;
