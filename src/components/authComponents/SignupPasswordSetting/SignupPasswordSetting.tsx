// The is page is extra and  identical with Setting_password.tsx component

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

import commonStyles from './../authCommon.module.css';
import Styles from './SignupPasswordSetting.module.css';

import loginLogo from './../../../assets/images/login-logo.png';
import google_icon from './../../../assets/images/google_icon.png';
import discord_icon from './../../../assets/images/discord_icon.png';
import vector_icon from './../../../assets/images/Vector.png';
import Link from 'next/link';

const SignupPasswordSetting = () => {
  return (
    <>
      <Head>
        <title>Setting Password</title>
      </Head>
      <main className={commonStyles.login_body}>
        {/* <Container>
          <Row> */}
        {/* Login Page Logo   */}
        <div className={commonStyles.login_logo}>
          <Image src={loginLogo} alt="Login Page Logo" width={35} height={35} />
        </div>

        {/* Login Card  */}

        <div className={commonStyles.login_card}>
          <h1 className={Styles.brand_title}>パスワードを設定してください。</h1>
          <div className={Styles.password_input}>
            <div>
              <p>パスワード</p>
              <input type="password" value="jkhkhkhj" />
            </div>
            <div>
              <Image src={vector_icon} alt="Google Icon" width={14.67} height={10} />
            </div>
          </div>

          <div className={Styles.password_input}>
            <div>
              <p>確認用</p>
              <input type="password" value="jkhkhkhjkk" />
            </div>
            <div className={Styles.vector_icon_design}>
              <Image src={vector_icon} alt="Google Icon" width={14.67} height={10} />
            </div>
          </div>

          <button className="common_btn common_btn_width common_btn_extra_margin">Click</button>
        </div>
        {/* </Row>
        </Container> */}
      </main>
    </>
  );
};

export default SignupPasswordSetting;
