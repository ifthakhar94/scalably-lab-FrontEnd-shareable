import React, { useEffect, useRef, useState } from 'react';
import commonStyles from '../../../authComponents/authCommon.module.css';
import modalStyles from './FirstModal.module.css';
import modalCommonStyles from '../../hubTopModal.module.css';
import unsubscribStyle from './UnsubscribeModal.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import CatogeryInput from '../../CatogeryInput/CatogeryInput';
import Link from 'next/link';
import client from '@/GraphqlClient/client';
import { gql } from 'apollo-boost';
import { toast } from 'react-hot-toast';
import { getHubListQuery } from '@/queries/queries';
import HubTopUI from '../HubTopUI';
import { useRouter } from 'next/router';
import { hubtop_url } from '@/navCentralization/nav_url';
type getHubDeleteModal = {
  isOpen: boolean;
  hubId: string;
  parentStatus: (value: boolean) => void;
  deleteModalParentStatus?: (value: boolean) => void;
  hubDeleteUpdate: 'confirmed' | 'error' | 'notdone';
  setHubDeleteUpdate: (value: string) => void;
};
function HubDeleteModal({ isOpen, hubId, parentStatus, hubDeleteUpdate, setHubDeleteUpdate, deleteModalParentStatus }: getHubDeleteModal) {
  const [open, setOpen] = React.useState(isOpen);
  const [enableDeleteConfirm, setEnableDeleteConfirm] = React.useState(false);
  const router = useRouter();
  const gotHubId = router.query.slug;
  useEffect(() => {
    if (isOpen === true) {
      setOpen(true);
    }
  }, [isOpen]);

  // console.log( isOpen);

  const handleClose = () => {
    setOpen(false);
    parentStatus(false);
  };
  const formik = useFormik({
    initialValues: {
      hub_delete_content: ''
    },
    onSubmit: (values) => {
      setOpen(false);
      parentStatus(false);
      setEnableDeleteConfirm(true);
      const UserToken = window.localStorage.getItem('UserToken');
      client
        .mutate({
          mutation: gql`
          mutation {
            deleteHub(hubId: "${hubId}", confirmText: "${values.hub_delete_content}",) {
              message
            }
          }
        `,
          context: {
            headers: {
              Authorization: `Bearer ${UserToken}`
            }
          }
        })
        .then((result: any) => {
          values.hub_delete_content = '';
          toast.success(result.data.deleteHub.message);
          setHubDeleteUpdate('confirmed');
          gotHubId && router.push(`${hubtop_url}?id=${hubId}`);
        })
        .catch((error: any) => {
          // toast.error(error.message);
        });
    },
    validationSchema: Yup.object({
      hub_delete_content: Yup.string()
        .required('”Delete this hub”と完全一致で入力してください')
        .matches(/Delete this hub/, '”Delete this hub”と完全一致で入力してください')
    })
  });

  const handleHubDeleteConfirm = () => {
    setEnableDeleteConfirm(false);
    // setHubDeleteUpdate();
    // window.location.reload();
  };
  return (
    <>
      <>
        <Modal
          className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}`}
          open={open}
          onClose={handleClose}
        >
          <Box className={modalCommonStyles.modal_content}>
            <h1 className={modalStyles.brand_title}>ハブを削除します。 </h1>

            <p className={unsubscribStyle.modal_text}>
              指定のハブを削除します。
              <br /> この処理は、元には戻せませんのでご注意ください。 下記のフォームに「Delete this hub」と入力ください。
            </p>
            <form onSubmit={formik.handleSubmit}>
              <div className={modalCommonStyles.hub_delete_name}>
                <p>テキストを入力してください。</p>
                <input
                  type="text"
                  name="hub_delete_content"
                  value={formik.values.hub_delete_content}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Delete this hubと入力してください"
                />
              </div>
              {formik.errors.hub_delete_content && <div className={commonStyles.error}>{formik.errors.hub_delete_content}</div>}

              <div className={`${unsubscribStyle.box}`}>
                <button className={`close_btn`} onClick={handleClose}>
                  閉じる
                </button>

                {/* <button className={`common_btn`} onClick={() => setOpen(!hubConfirm)}>
                  削除する
                </button> */}
                <button type="submit" className={`common_btn`}>
                  削除する
                </button>
              </div>
            </form>
          </Box>
        </Modal>
      </>

      {/* {enableDeleteConfirm && (
        <>
          <div className={modalCommonStyles.deleteHubConfirmation}>
            <div className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}`}>
              <div className={modalCommonStyles.modal_content}>
                <h1 className={modalStyles.brand_title}>ハブが削除されました。 </h1>
                <p className={unsubscribStyle.modal_text}>一覧画面より、対象のハブが削除されているのをご確認ください。</p>

                <div>
                  <button
                    className={`${modalCommonStyles.delete_confirm_close_btn}`}
                    // onClick={() => {
                    //   setEnableDeleteConfirm(false);
                    // }}
                    onClick={handleHubDeleteConfirm}
                  >
                    閉じる
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )} */}
    </>
  );
}

export default HubDeleteModal;
