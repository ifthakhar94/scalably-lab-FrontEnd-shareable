import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import commonStyles from './../authCommon.module.css';
import Styles from './SettingBasicInfo.module.css';
import loginLogo from './../../../assets/images/login-logo.png';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Link from 'next/link';
import { gql } from '@apollo/client';
import client from '@/GraphqlClient/client';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import useAuthRedirect from '@/hooks/authHooks/useAuthRedirect';
import { hubtop_url } from '@/navCentralization/nav_url';
import { SetBasicInfo, PurposeList } from '@/queries/queries';

type purposeType = {
  typename: string;
  key: string;
  value: string;
  items?: {
    typename: string;
    key: string;
    value: string;
  };
};
const SettingBasicInfo = () => {
  const [authCode, setAuthCode] = useState(0);
  useAuthRedirect(authCode);

  const [modal, setModal] = useState(false);
  const [purposeList, setPurposeList] = useState<purposeType[]>([]);
  //  useState<purposeType as []>([])

  const [getQuerySuccess, setGetQuerySuccess] = useState('');
  const [purposeListArr, setPurposeListArr] = useState<any>([]);
  const router = useRouter();
  const [selectedState, setSelectedState] = useState('sending_news');
  const [selectedState2, setSelectedState2] = useState('personal_news_feed');
  const [selectedValue, setSelectedValue] = useState('');
  const changepurpose = (e: any) => {
    setSelectedState(e.target.value);

    const keyName = e.target.value;

    setSelectedState2((purposeListArr[keyName] as any).items[0].key);
  };
  const toggleModal = () => {
    setModal(!modal);
  };
  const formik = useFormik({
    initialValues: {
      eco_media_id: ''
    },
    onSubmit: (values: any) => {
      // console.log(values);
      const UserToken = window.localStorage.getItem('UserToken');
      client
        .mutate({
          mutation: SetBasicInfo,
          variables: {
            purpose: selectedState,
            purpose_detail: selectedState2,
            ecomedia_id: values.eco_media_id
          },
          context: {
            headers: {
              Authorization: `Bearer ${UserToken}`
            }
          }
        })
        .then((result) => {
          console.log(result);
          // window.localStorage.setItem('singupEmail', values.email);
          setGetQuerySuccess('Success Message Here!!');
          // window.localStorage.setItem('UserToken', result?.data?.createUser?.token);

          router.push(hubtop_url);
        })
        .catch((error) => {
          setGetQuerySuccess(' ');
          // Set Error Code for Redirect
          setAuthCode(error?.graphQLErrors[0]?.code);
          // setGetQueryError(error.message);
          toast.error(error.message);
        });
    },
    validationSchema: Yup.object({
      eco_media_id: Yup.string()
        .required('This Field is required')
        .min(4, 'EcoMedia IDは4文字以上14文字以下で設定してください')
        .max(14, 'EcoMedia IDは4文字以上14文字以下で設定してください')
        .matches(/^[a-zA-Z0-9_]+$/g, 'EcoMedia IDは英数字と"_"(アンダーバー)のみ使用可能です')
        .matches(/^(?!.*(?:admin|EcoMedia|Scalably)).*$/g, ' このEcoMedia IDは使用できません。他の文字の組み合わせをお試しください。')
    })
  });
  useEffect(() => {
    client
      .query({
        query: PurposeList
      })
      .then((result) => {
        const mypurposeList: any = [];
        // console.log(result);
        result.data.purposeList.map((item: any, index: any) => {
          mypurposeList[item.key] = item;
        });
        setPurposeListArr(mypurposeList);
        setPurposeList(result.data.purposeList);
      })
      .catch((error) => {
        setGetQuerySuccess(' ');
        // setGetQueryError(error.message);
        toast.error(error.message);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Setting Basic Information</title>
      </Head>
      <main className={commonStyles.login_body}>
        {/* <Container>
          <Row> */}
        {/* Login Page Logo   */}
        <div className={commonStyles.login_logo}>
          <Image src={loginLogo} alt="Login Page Logo" width={35} height={35} />
        </div>

        {/* {getQuerySuccess && <div className={commonStyles.error}>{getQuerySuccess}</div>} */}
        {/* Login Card  */}
        <form onSubmit={formik.handleSubmit}>
          <div className={commonStyles.modal_content}>
            <h1 className={Styles.brand_title}>EcoMedia内で利用する、共通のIDとなります。</h1>
            <p className={commonStyles.auth_card_sub_title}>一度設定すると変更することができないため、ご注意ください。 </p>

            <div className={Styles.setting_basic_selection}>
              <div className={Styles.basic_selection_border_text}>目的</div>
              <div className={Styles.selection_inner}>
                <select value={selectedState} onChange={changepurpose}>
                  {purposeList.map((singlePurpose: purposeType, index: number) => {
                    return (
                      <option key={index} value={singlePurpose.key} selected={singlePurpose.key == 'sending_news'}>
                        {singlePurpose.value}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className={Styles.setting_basic_selection}>
              <div className={Styles.basic_selection_border_text}>目的の詳細</div>
              <div className={Styles.selection_inner}>
                <select
                  value={selectedState2}
                  onChange={(e) => {
                    setSelectedState2(e.target.value);
                  }}
                >
                  {purposeListArr &&
                    purposeListArr[selectedState] &&
                    purposeListArr[selectedState].items.map((item: any, index: number) => {
                      return (
                        <option key={index} value={item.key}>
                          {item.value}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            <div className={Styles.email_input}>
              <div>
                <p>EcoMedia IDを入力してください。</p>
                <input name="eco_media_id" value={formik.values.eco_media_id} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              </div>
            </div>
            {formik.errors.eco_media_id && (
              <div className={commonStyles.error}>{formik.errors.eco_media_id && formik.errors.eco_media_id}</div>
            )}

            <p className={Styles.is_loged_in}>
              <Link href="#" onClick={toggleModal}>
                EcoMedia IDとは？
              </Link>
            </p>
            {/* <Link href="/underConstruction"> */}
            <button className="common_btn common_btn_width">完了する</button>
            {/* </Link> */}
          </div>
        </form>
        {modal && (
          <>
            <div className={commonStyles.modal_body}>
              <div className={commonStyles.modal_content}>
                <h1 className={Styles.brand_title}>EcoMedia IDとは？</h1>
                <p className={Styles.modal_text}>
                  EcoMedia内で利用する、共通のIDとなります。<br></br>
                  一度設定すると変更することができないため、ご注意ください一度設定すると変更することができないため、ご注意ください。
                </p>
                <div className={Styles.modal_text_pink_box}>
                  <div>
                    <p>あなたがハブを作成する場合、EcoMedia IDはURLの一部として利用されます。</p>
                  </div>
                </div>

                <button className="common_btn common_btn_width" onClick={() => setModal(!modal)}>
                  閉じる
                </button>
              </div>
            </div>
          </>
        )}
        {/* </Row>
        </Container> */}
      </main>
    </>
  );
};

export default SettingBasicInfo;
