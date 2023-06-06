import React, { useEffect } from 'react';
import commonStyles from '../../../authComponents/authCommon.module.css';
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
import { gql } from '@apollo/client';
import { toast } from 'react-hot-toast';

import { RootState } from '@/redux/app/store';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import HubConfirmModal from './HubConfirmModal';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function CreateHubModal(props: {
  // parentDataStoreStatus(arg0: boolean): unknown;
  parentCreateStatus(arg0: boolean): unknown;
  parentStatus(arg0: boolean): unknown;
  isOpen: boolean;
}) {
  const gotAllCategories = useAppSelector((state) => state?.get_all_categories?.all_categories);
  // console.log('open', props.parentDataStoreStatus);
  const [open, setOpen] = React.useState(props.isOpen);
  const [openHubConfirm, SetOpenHubConfirm] = React.useState(false);

  const [ecomedia_id, setEcomedia_id] = React.useState('');
  const [tagLength, setTagLength] = React.useState(false); // New state for Category character count

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
  const catArrStr = JSON.stringify(catArr);

  const formik = useFormik({
    initialValues: {
      hub_name: '',
      url: ''
    },
    onSubmit: (values) => {
      setOpen(false);
      props.parentStatus(false);
      props.parentCreateStatus(false);

      const UserToken = window.localStorage.getItem('UserToken');

      client
        .mutate({
          mutation: gql`
            mutation {
              createHub(
                hubName: "${values.hub_name}"
                url: "${values.url}"
                hubCategory:${catArrStr}
                publicScope: ${scope} # GENERAL_PUBLIC/LIMITED_PUBLIC
              ) {
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
          // console.log(result.data.createHub);
          toast.success(result.data.createHub.message);
          SetOpenHubConfirm(true);
          setOpen(false);
          props.parentStatus(false);
          props.parentCreateStatus(true);
          values.hub_name = '';
          values.url = '';
          // localStorage.setItem('hub_id67', values.hub_name);
        })
        .catch((error: any) => {
          toast.error(error.message);
          setOpen(true);
          props.parentCreateStatus(false);
        });
    },
    validationSchema: Yup.object({
      hub_name: Yup.string().required('ハブの名称を入力してください。').max(100, 'ハブの名称は100文字以内で入力してください。'),
      url: Yup.string()
        .required('URLを入力してください。')
        .matches(/^[0-9a-zA-Z-_]{1,}$/, 'URLは半角英数(0-9、a-z、A-Z)、ハイフン「-」、アンダーバー「_」のみを使用してください。')
    })
  });

  useEffect(() => {
    const Local_User_Data = JSON.parse(window.localStorage.getItem('ecomedia_id') || '{}');

    setEcomedia_id(Local_User_Data);
  }, []);

  // console.log(tags);

  return (
    <>
      <Modal className={modalCommonStyles.create_hub} open={open} onClose={handleClose}>
        <Box className={modalCommonStyles.modal_box}>
          <h1 className={modalStyles.brand_title}>ハブを作ろう </h1>
          <p className={unsubscribStyle.modal_text}>以下の情報を入力してください。</p>

          <div className="create_hub_modal_body">
            <div className={modalCommonStyles.email_input}>
              <p>ハブの名称</p>
              <input
                type="text"
                name="hub_name"
                value={formik.values.hub_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="ハブの名前を入力してください"
              />
            </div>

            {formik.errors.hub_name && <div className={commonStyles.error}>{formik.errors.hub_name}</div>}

            <div className={modalCommonStyles.url_input}>
              <p>URL</p>
              <div className={modalCommonStyles.url_input_content}>
                <p>
                  {process.env.NEXT_PUBLIC_ECOMEDIA_COMMON_URL}/{ecomedia_id}
                </p>
                <input
                  type="text"
                  placeholder="-設定したいURLを入力してください"
                  name="url"
                  value={formik.values.url}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>
            {formik.errors.url && <div className={commonStyles.error}>{formik.errors.url}</div>}

            <div className={modalCommonStyles.tag_input}>
              <p>ハブのカテゴリ</p>
              <CatogeryInput tagLength={tagLength} setTagLength={setTagLength} />
            </div>
            {tagLength && <div className={commonStyles.error}>カテゴリは30文字以内で入力してください。</div>}

            <div className={modalCommonStyles.page_visibility}>
              <div className={modalCommonStyles.page_visibility_border_text}>ハブのメディアページ公開範囲</div>
              <div className={modalCommonStyles.selection_inner}>
                <select
                  value={scope}
                  onChange={(e) => {
                    setScope(e.target.value);
                  }}
                >
                  <option defaultChecked value="GENERAL_PUBLIC">
                    一般公開（URLを知っている方がどなたでも閲覧可能になります。）
                  </option>
                  {/* <option defaultChecked value="LIMITED_PUBLIC">
                    一般公開（URLを知っている方がどなたでも閲覧可能になります。）
                  </option> */}
                </select>
              </div>
            </div>
          </div>
          <div className={unsubscribStyle.box}>
            <button className={`close_btn`} onClick={handleClose}>
              閉じる
            </button>

            <button className={`common_btn`} onClick={(e: any) => formik.handleSubmit()}>
              ハブを作成する
            </button>
          </div>
        </Box>
      </Modal>
      {/* <HubConfirmModal isOpen={openHubConfirm} /> */}
    </>
  );
}

export default CreateHubModal;
