import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import commonStyles from './../authCommon.module.css';
import Styles from './Forget_password.module.css';
import loginLogo from './../../../assets/images/login-logo.png';
import Link from 'next/link';
import useForgetPassword from '@/hooks/authHooks/useForgetPassword';
import { login_url } from '@/navCentralization/nav_url';
const Forget_password = () => {
  const formik = useForgetPassword();

  return (
    <>
      <Head>
        <title>Forget Password</title>
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
          <h1 className={Styles.password_reset_title}>パスワードをリセットします</h1>
          <p className={Styles.password_reset_subtitle}>
            メールアドレスを入力すると、パスワードの再設定のURL
            <br />
            をお送りします。
          </p>

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
            <button type="submit" className="common_btn common_btn_width">
              送信する
            </button>
          </form>
          <p className={Styles.back}>
            <Link href={login_url}>戻る</Link>
          </p>
        </div>
        {/* </Row>
        </Container> */}
      </main>
    </>
  );
};

export default Forget_password;
