import * as Yup from 'yup';
import client from '@/GraphqlClient/client';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { forgetpasswordcomplete_url } from '@/navCentralization/nav_url';
import { forgetPassword } from '@/queries/queries';

const useForgetPassword = () => {
  const router = useRouter();
  return useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: (values: any) => {
      client
        .query({
          query: forgetPassword,
          variables: {
            email: values.email
          }
        })
        .then((result) => {
          {
            toast.success(result.data.forgetPassword.message);
          }
          setTimeout(() => {
            router.push(forgetpasswordcomplete_url);
          }, 3000);
        })

        .catch((error) => {
          toast.error(error.message);
        });
    },
    validationSchema: Yup.object({
      email: Yup.string().required('メールアドレスの形式で入力してください。').email('メールアドレスの形式で入力してください。')
    })
  });
};
export default useForgetPassword;
