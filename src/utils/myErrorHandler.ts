import Router from 'next/router';

export const myErrorHandler = (code: number) => {
  if (code == 401) {
    Router.push('/404');
  } else if (code == 403) {
    Router.push('/403');
  }
};
