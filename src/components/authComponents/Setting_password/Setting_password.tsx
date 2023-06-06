import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import commonStyles from './../authCommon.module.css';
import Styles from './Setting_password.module.css';
import loginLogo from './../../../assets/images/login-logo.png';
import eye from './../../../assets/images/eye.png';
import hidden from './../../../assets/images/eye-hidden.png';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { gql } from '@apollo/client';
import client from '@/GraphqlClient/client';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { settingBasicInfo_url } from '@/navCentralization/nav_url';
import { CreateUser } from '@/queries/queries';
const Setting_password = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfrmPasswordShown] = useState(false);
  const [passwordSettingError, setPasswordSettingError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const router = useRouter();
  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  const toggleConfirmPassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setConfrmPasswordShown(!confirmPasswordShown);
  };
  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: ''
    },
    onSubmit: (values: any) => {
      const getEmail = window.localStorage.getItem('singupEmail');
      client
        .mutate({
          mutation: CreateUser,
          variables: {
            email: getEmail,
            password: values.password,
            confirmPassword: values.confirm_password
          }
        })
        .then((result) => {
          setPasswordSettingError('');
          setPasswordSuccess('Success Message Here!!');
          window.localStorage.setItem('UserToken', result?.data?.createUser?.token);
          console.log(result.data);
          {
            toast.success(result.data.createUser.message);
          }
        })
        .then(() => router.push(settingBasicInfo_url))
        .catch((error) => {
          setPasswordSuccess(' ');
          // setPasswordSettingError(error.message);
          toast.error(error.message);
        });
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Password is required')
        .min(8, 'パスワードは8文字以上100文字以下で入力してください')
        .max(100, 'パスワードは8文字以上100文字以下で入力してください')
        .matches(
          /^[a-zA-Z0-9!@#$%^&*.()]+$/g,
          'アルファベット（a～z と A～Z）、数字（0～9）、特殊文字（!@#$%^&*.()）のみを使用してください。'
        )
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[! @#$%^&*. ()])[A-Za-z\d! @#$%^&*. ()]{8,}$/,
          '文字、数字、記号の組み合わせて設定してください。'
        ),

      confirm_password: Yup.string().oneOf([Yup.ref('password')], 'パスワードが一致しません。')
    })
  });
  return (
    <>
      <Head>
        <title>Setting Password</title>
      </Head>
      <main className={commonStyles.login_body}>
        {/* Login Page Logo   */}
        <div className={commonStyles.login_logo}>
          <Image src={loginLogo} alt="Login Page Logo" width={35} height={35} />
        </div>

        {/* Login Card  */}
        <form onSubmit={formik.handleSubmit}>
          <div className={commonStyles.modal_content}>
            <h1 className={Styles.brand_title}>パスワードを設定してください。</h1>

            <div className={Styles.password_input}>
              <p>パスワード</p>

              <input
                type={passwordShown ? 'text' : 'password'}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                autoComplete="new-password"
                onBlur={formik.handleBlur}
                placeholder="パスワードを入力してください"
              />
              {passwordShown ? (
                <Image src={hidden} alt="hidden Icon" onClick={togglePassword} className={Styles.hidden} />
              ) : (
                <Image src={eye} alt="eye Icon" onClick={togglePassword} className={Styles.eye} />
              )}
            </div>
            <div className={Styles.password_input}>
              <p>確認用</p>

              <input
                type={confirmPasswordShown ? 'text' : 'password'}
                name="confirm_password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="パスワードを入力してください"
              />

              {confirmPasswordShown ? (
                <Image src={hidden} alt="hidden Icon" onClick={toggleConfirmPassword} className={Styles.hidden} />
              ) : (
                <Image src={eye} alt="eye Icon" onClick={toggleConfirmPassword} className={Styles.eye} />
              )}
            </div>
            {formik.errors.password && <div className={commonStyles.error}>{formik.errors.password && formik.errors.password}</div>}
            {formik.errors.confirm_password && (
              <div className={commonStyles.error}>{formik.errors.confirm_password && formik.errors.confirm_password}</div>
            )}

            <button className="common_btn common_btn_width mg_t20">次へ</button>
          </div>
        </form>
      </main>
    </>
  );
};

export default Setting_password;
