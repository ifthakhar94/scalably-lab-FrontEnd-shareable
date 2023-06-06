import React, { useEffect } from 'react';
import modalStyles from './FirstModal.module.css';
import modalCommonStyles from '../../hubTopModal.module.css';
import unsubscribStyle from './UnsubscribeModal.module.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import CatogeryInput from '../../CatogeryInput/CatogeryInput';
import Link from 'next/link';
import client from '@/GraphqlClient/client';
import { gql, useQuery } from '@apollo/client';
import { toast } from 'react-hot-toast';

import { RootState } from '@/redux/app/store';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import HubConfirmModal from './HubConfirmModal';
import CategoryEdit from '../../CategoryEdit/CategoryEdit';
import { newsAssetsCatSetupQuery } from '@/queries/queries';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function NewsAssetCategorySetup(props: {
  parentCreateStatus(arg0: boolean): unknown;
  parentStatus(arg0: boolean): unknown;
  isOpen: boolean;
  newsAssetName: string;
  ownerCategories: any;
  latestHubId: string;
  gotNewsAssetId: string;
  RefetchQuery: (data: any) => void;
}) {
  let gotAllCategories = useAppSelector((state) => state?.get_all_categories?.all_categories);

  interface Tag {
    id: string;
    text: string;
  }
  const existingData: Tag[] = [];
  props?.ownerCategories?.forEach((ExistingCatitem: any, index: any) => {
    existingData.push({
      id: ExistingCatitem.name,
      text: ExistingCatitem.name
    });
  });

  const [open, setOpen] = React.useState(props.isOpen);
  const [showCatSetupConfirm, setShowCatSetupConfirm] = React.useState(false);

  const [ecomedia_id, setEcomedia_id] = React.useState('');
  const [scope, setScope] = React.useState('GENERAL_PUBLIC');

  useEffect(() => {
    if (props.isOpen === true) {
      setOpen(true);
    }
  }, [props.isOpen]);

  const handleClose = () => {
    setOpen(false);
    props.parentStatus(false);
  };
  let catArr: string[] = new Array();
  type getProps = {
    id: string;
    text: string;
  };

  gotAllCategories.map((catItem) => {
    catArr.push(catItem?.text as string);
  });

  const handleConfimModalClose = () => {
    props.RefetchQuery(true);
    setShowCatSetupConfirm(false);
  };

  const handleSubmit = () => {
    const UserToken = window.localStorage.getItem('UserToken');

    client
      .mutate({
        mutation: newsAssetsCatSetupQuery,
        variables: {
          newsAssetId: props.gotNewsAssetId,
          hubId: props.latestHubId,
          categories: catArr
        },
        context: {
          headers: {
            Authorization: `Bearer ${UserToken}`
          }
        }
      })
      .then((result) => {
        console.log(result);
        setShowCatSetupConfirm(true);

        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal className={modalCommonStyles.create_hub} open={open} onClose={handleClose}>
        <Box className={modalCommonStyles.modal_box}>
          <h1 className={modalStyles.brand_title}>ニュースアセットのカテゴリを設定</h1>
          <p className={unsubscribStyle.modal_text}>自分が好きなカテゴリを付与できます。</p>

          <div className="create_hub_modal_body">
            <div className={modalCommonStyles.news_assets_title}>
              <p>ニュースアセット</p>
              <h4>{props.newsAssetName}</h4>
            </div>
            <div className={modalCommonStyles.tag_input}>
              <p>ハブのカテゴリ</p>
              <CategoryEdit existingData={existingData} />
            </div>
          </div>
          <div className={unsubscribStyle.box}>
            <button className={`close_btn`} onClick={handleClose}>
              閉じる
            </button>

            <button className={`common_btn`} onClick={handleSubmit}>
              設定する
            </button>
          </div>
        </Box>
      </Modal>

      {/* News Assets Category Setup Complete Modal   */}

      {showCatSetupConfirm && (
        <>
          <Modal
            className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}   ${modalCommonStyles.modal_scroller} `}
            open={true}
            onClose={handleClose}
          >
            <div className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}`}>
              <div className={modalCommonStyles.editConfirmationModal}>
                <h1 className={modalStyles.brand_title}>カテゴリが設定されました。</h1>
                <p className={unsubscribStyle.modal_text}>
                  ハブ詳細ページにてカテゴリの設定が反映されているのを
                  <br /> ご確認ください。
                </p>

                <div className={modalCommonStyles.news_assets_disconnect_btn}>
                  <button className={`${modalCommonStyles.editConfirmClzBtn}`} onClick={handleConfimModalClose}>
                    閉じる
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
}

export default NewsAssetCategorySetup;
