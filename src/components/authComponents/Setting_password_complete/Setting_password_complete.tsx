import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import commonStyles from './../authCommon.module.css';
import Styles from './Setting_password_complete.module.css';
import loginLogo from './../../../assets/images/login-logo.png';
import Link from 'next/link';
import { login_url } from '@/navCentralization/nav_url';
const Setting_password_complete = () => {
  return (
    <>
      <Head>
        <title>Setting Password Complete</title>
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
          <h1 className={Styles.password_reset_title}>パスワードを再設定しました。</h1>
          <p className={Styles.password_reset_message}>
            ご入力いただいた内容でパスワードを再設定をしました。
            <br />
            ログインをお試しください。
          </p>
          <p className={Styles.back}>
            <Link href={login_url}>ログイン画面に戻る</Link>
          </p>
        </div>
        {/* </Row>
        </Container> */}
      </main>
    </>
  );
};

export default Setting_password_complete;
