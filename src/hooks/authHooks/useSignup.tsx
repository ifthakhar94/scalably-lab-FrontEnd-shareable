import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import client from '@/GraphqlClient/client';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { emailOTP_url } from '@/navCentralization/nav_url';
import { signupCheckEmail } from '@/queries/queries';

const useSignup = () => {
  const router = useRouter();
  const [signUpEmailError, setSignUpEmailError] = useState('');
  return useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: (values: any) => {
      client
        .mutate({
          mutation: signupCheckEmail,
          variables: {
            email: values.email
          }
        })
        .then((result) => {
          setSignUpEmailError('');
          localStorage.setItem('singupEmail', values.email);
          {
            toast.success(result.data.checkEmail.message);
          }
        })
        .then(() => router.push(emailOTP_url))
        .catch((error) => {
          toast.error(error.message);
        });
    },
    validationSchema: Yup.object({
      email: Yup.string().required('メールアドレスの形式で入力してください。').email('メールアドレスの形式で入力してください。')
    })
  });
};
export default useSignup;
