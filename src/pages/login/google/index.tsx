import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import Style from './../../../styles/socialAuth.module.css';
import client from '@/GraphqlClient/client';
import { googleSocialLogin } from '@/queries/queries';
import { hubtop_url, settingBasicInfo_url } from '@/navCentralization/nav_url';

const google = () => {
  const [googleAuthError, setGoogleAuthError] = useState('');
  const [googleAuthSuccess, setGoogleAuthSuccess] = useState('');
  const router = useRouter();
  if (router.query.status === 'failed') {
    router.push('/auth/login');
  }

  if (router.query.status === 'success' && router.query.token != '') {
    const googleAuthToken: any = router.query.token;

    client
      .query({
        query: googleSocialLogin,
        variables: {
          token: googleAuthToken
        }
      })
      .then((result) => {
        const purpose_setup = result.data.socialLogin.user.purpose_setup;
        // console.log(purpose_setup);
        const UserToken = window.localStorage.setItem('UserToken', googleAuthToken);

        const { __typename, ...updatedObject } = result.data.socialLogin.user;

        window.localStorage.setItem('User_Data', JSON.stringify(updatedObject));

        //  localStorage.setItem('UserToken', result.data.login.user.token);
        //  window.localStorage.setItem('User_Data', JSON.stringify(result.data.login.user));
        window.localStorage.setItem('ecomedia_id', JSON.stringify(result.data.socialLogin.user.ecomedia_id));

        setGoogleAuthError('');
        setGoogleAuthSuccess('Success Message Here!!');
        if (!purpose_setup) {
          router.push(settingBasicInfo_url);
        } else {
          router.push(hubtop_url);
        }
      });
  }

  return (
    <>
      <div className={Style.social_auth}>
        <div className={Style.social_auth_wrapper}>
          <CircularProgress />
          <h2>Authenticating....</h2>
        </div>
      </div>
    </>
  );
};

export default google;
