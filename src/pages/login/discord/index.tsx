import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import client from '@/GraphqlClient/client';
import Style from './../../../styles/socialAuth.module.css';
import { hubtop_url, settingBasicInfo_url } from '@/navCentralization/nav_url';

const Discord = () => {
  const [discordAuthError, setdiscordAuthError] = useState('');
  const [discordAuthSuccess, setdiscordAuthSuccess] = useState('');
  const router = useRouter();
  if (router.query.status === 'failed') {
    router.push(`/auth/login`);
  }

  if (router.query.status === 'success' && router.query.token != '') {
    const discordAuthToken: any = router.query.token;

    client
      .query({
        query: gql`
            query {
              socialLogin(
                token: "${discordAuthToken}"
              ) {
                message
                user {
                  email
                  is_registered
                  purpose_setup
                  role
                  ecomedia_id
                  token
                }
              }
            }
          `
      })
      .then((result) => {
        const purpose_setup = result.data.socialLogin.user.purpose_setup;
        console.log(purpose_setup);
        const UserToken = window.localStorage.setItem('UserToken', discordAuthToken);
        setdiscordAuthError('');
        const { __typename, ...updatedObject } = result.data.socialLogin.user;

        window.localStorage.setItem('User_Data', JSON.stringify(updatedObject));

        setdiscordAuthSuccess('Success Message Here!!');
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

export default Discord;
