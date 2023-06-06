import Head from 'next/head';
import Image from 'next/image';
import commonStyles from './../authCommon.module.css';
import loginLogo from './../../../assets/images/login-logo.png';
import React, { FC, useEffect, useRef, useState } from 'react';
import Styles from './EmailOTP.module.css';
import Link from 'next/link';
import { gql } from '@apollo/client';
import client from '@/GraphqlClient/client';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { settingPassword_url, signup_url, underConstruction } from '@/navCentralization/nav_url';
import { verifyEmail } from '@/queries/queries';
interface Props {}
let currentOTPIndex: number = 0;
const EmailOTP: FC<Props> = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);
  const router = useRouter();
  const [otpError, setOtpError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = target;
    const newOTP: string[] = [...otp];
    newOTP[currentOTPIndex] = value.substring(value.length - 1);
    if (!value) setActiveOTPIndex(currentOTPIndex - 1);
    else setActiveOTPIndex(currentOTPIndex + 1);
    setOtp(newOTP);
  };

  const handleOnKeyDown = ({ key }: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    currentOTPIndex = index;
    if (key === 'Backspace') setActiveOTPIndex(currentOTPIndex - 1);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  const handleOtpSubmit = (e: any) => {
    e.preventDefault();

    const getEmail = window.localStorage.getItem('singupEmail');

    if (otp[0] !== '' && otp[1] !== '' && otp[2] !== '' && otp[3] !== '' && otp[4] !== '' && otp[5] !== '' && otp[6] !== '') {
      setOtpError('');
      const stringOtp = otp.toString();
      const numberOtp = stringOtp.replaceAll(',', '');
      client
        .query({
          query: verifyEmail,
          variables: {
            email: getEmail,
            otp: numberOtp
          }
        })
        .then(() => router.push({ pathname: settingPassword_url }))
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      toast.error('OTP は 6 桁でなければなりません ');
    }
  };

  return (
    <>
      <Head>
        <title>Email OTP</title>
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
          <h1 className={commonStyles.brand_title}>認証コード入力</h1>
          <p className={commonStyles.auth_card_sub_title}>メールアドレスに届いた認証コードを入力してください</p>
          {/* {otpError && <div className={commonStyles.error}>{otpError}</div>} */}
          {/* {otpSuccess && <div className={commonStyles.error}>{otpSuccess}</div>} */}
          <form onSubmit={handleOtpSubmit}>
            <div className={Styles.otp_input_field}>
              {otp.map((_, index) => {
                return (
                  <div className="otp_input_inner" key={index}>
                    <input
                      ref={index === activeOTPIndex ? inputRef : null}
                      type="text"
                      placeholder="0"
                      onChange={handleOnChange}
                      value={otp[index]}
                      onKeyDown={(e) => handleOnKeyDown(e, index)}
                      name={('field_' + index).toString()}
                    />
                  </div>
                );
              })}
            </div>
            <button className="common_btn common_btn_width" type="submit">
              次へ
            </button>
          </form>
          <div className={Styles.has_already_account}>
            コードが届きませんか？ <Link href="#">再送信</Link>
          </div>
          <Link href={signup_url} className={Styles.back_to_email_page}>
            メールアドレスの入力に戻る
          </Link>
        </div>
        {/* </Row>
        </Container> */}
      </main>
    </>
  );
};

export default EmailOTP;
