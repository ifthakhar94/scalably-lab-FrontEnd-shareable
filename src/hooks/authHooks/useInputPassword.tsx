import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import client from '@/GraphqlClient/client';
import { useRouter } from 'next/router';
import { hubtop_url } from '@/navCentralization/nav_url';
import { loginGql } from '@/queries/queries';
const useInputPassword = () => {
  const router = useRouter();
  let loginEmail: any = '';
  if (!loginEmail && typeof window !== 'undefined') {
    loginEmail = window.localStorage.getItem('LoginEmail');
  }
  return useFormik({
    initialValues: {
      email: loginEmail || '',
      password: ''
    },
    onSubmit: (values: any) => {
      client
        .mutate({
          mutation: loginGql,
          variables: {
            email: values.email,
            password: values.password
          }
        })
        .then((result) => {
          localStorage.setItem('UserToken', result.data.login.user.token);
          const { __typename, ...updatedObject } = result.data.login.user;
          console.log(updatedObject);
          window.localStorage.setItem('User_Data', JSON.stringify(updatedObject));
          window.localStorage.setItem('ecomedia_id', JSON.stringify(result.data.login.user.ecomedia_id));
          {
            toast.success(result.data.login.message, { duration: 3000 });
          }
        })
        .then(() => router.push(hubtop_url))
        .catch((error) => {
          toast.error(error.message);
        });
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required').email('Email invalid'),
      password: Yup.string().required('Password is required')
    })
  });
};
export default useInputPassword;
