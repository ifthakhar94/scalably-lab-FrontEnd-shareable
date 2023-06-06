import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
import commonStyles from './../authCommon.module.css';
import Styles from './Login.module.css';
import loginLogo from './../../../assets/images/login-logo.png';
import google_icon from './../../../assets/images/google_icon.png';
import discord_icon from './../../../assets/images/discord_icon.png';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useLogin from '@/hooks/authHooks/useLogin';
import { signup_url } from '@/navCentralization/nav_url';

const Login = () => {
  const router = useRouter();
  //used custom hooks.........
  const formik = useLogin();

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main className={commonStyles.login_body}>
        {/* <Container>
          <Row> */}
        {/* Login Page Logo   */}
        <div className={commonStyles.login_logo}>
          <Image src={loginLogo} alt="Login Page Logo" width={35} height={35} />
        </div>

        {/* Login Card  */}
        <div className={commonStyles.modal_content}>
          <h1 className={commonStyles.brand_title}>EcoMediaにログイン</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className={Styles.email_input}>
              <p>メールアドレス</p>
              <input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="メールアドレスを入力してください"
              />
            </div>
            {formik.errors.email && <div className={commonStyles.error}>{formik.errors.email && formik.errors.email}</div>}
            <p className={Styles.is_loged_in}>
              アカウントがありませんか？ <Link href={signup_url}>新規登録</Link>
            </p>
            <button className="common_btn common_btn_width" type="submit">
              ログイン
            </button>
          </form>
          <div className={Styles.social_login}>
            <div className={Styles.social_login_title}>または</div>
            <div className={Styles.social_handles}>
              <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google`}>
                <div className={Styles.login_width_social_handle}>
                  <Image src={google_icon} alt="Google Icon" width={20} height={20} />
                  <p className="social_handle_name">Google でログイン</p>
                </div>
              </Link>
              <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/discord`}>
                <div className={Styles.login_width_social_handle}>
                  <Image src={discord_icon} alt="Google Icon" width={20} height={20} />
                  <p className="social_handle_name">Discord でログイン</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* </Row>
        </Container> */}
      </main>
    </>
  );
};

export default Login;
