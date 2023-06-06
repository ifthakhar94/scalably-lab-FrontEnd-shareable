import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import commonStyles from './../authCommon.module.css';
import Styles from './Signup.module.css';
import loginLogo from './../../../assets/images/login-logo.png';
import google_icon from './../../../assets/images/google_icon.png';
import discord_icon from './../../../assets/images/discord_icon.png';
import Link from 'next/link';
import useSignup from '@/hooks/authHooks/useSignup';
import { login_url, privacypolicy, terms, underConstruction } from '@/navCentralization/nav_url';

const Signup = () => {
  const formik = useSignup();

  return (
    <>
      <Head>
        <title>SignUp</title>
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
          <h1 className={Styles.brand_title}>EcoMediaにようこそ</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className={Styles.email_input}>
              <p>メールアドレス</p>
              <input name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            </div>
            {formik.errors.email && <div className={commonStyles.error}>{formik.errors.email && formik.errors.email}</div>}
            <p className={Styles.is_loged_in}>
              続行することでEcoMediaの<Link href={terms}>利用規約</Link>に同意し、<br></br>
              <Link href={privacypolicy}>プライバシーポリシー</Link>を読んだものとみなされます。
            </p>
            <button className="common_btn common_btn_width" type="submit">
              メールアドレスで登録
            </button>
          </form>
          <div className={Styles.has_already_account}>
            すでにアカウントがありますか？ <Link href={login_url}>ログイン</Link>
          </div>
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

export default Signup;
