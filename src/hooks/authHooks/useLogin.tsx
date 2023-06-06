import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import client from '@/GraphqlClient/client';
import { gql } from '@apollo/client';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { inputpassword_url } from '@/navCentralization/nav_url';
import { checkLoginEmail } from '@/queries/queries';
const useLogin = () => {
  const router = useRouter();
  return useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: (values: any) => {
      client
        .mutate({
          mutation: checkLoginEmail,
          variables: {
            email: values.email
          }
        })
        .then((result) => {
          //   setEmailError('');
          // console.log(result);
          localStorage.setItem('LoginEmail', values.email);

          {
            toast.success(result.data.checkLoginEmail.message);
          }
        })
        .then(() => router.push(inputpassword_url))
        .catch((error) => {
          // setEmailError(error.message);
          toast.error(error.message);
        });
    },
    validationSchema: Yup.object({
      email: Yup.string().required('メールアドレスの形式で入力してください').email('メールアドレスの形式で入力してください')
    })
  });
};
export default useLogin;
