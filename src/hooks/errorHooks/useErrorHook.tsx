import { useRouter } from 'next/router';

const useErrorHook = (errorCode: number) => {
  // const router = useRouter();

  console.log('error code ', errorCode);
};

export default useErrorHook;
