import React, { useEffect, useRef, useState } from 'react';
import commonStyles from '../../authComponents/authCommon.module.css';
import modalStyles from './HubDetailEditModal.module.css';
import modalCommonStyles from './../../hubTopComponents/hubTopModal.module.css';
import unsubscribStyle from '../../hubTopComponents/HubTopUI/Modals/UnsubscribeModal.module.css';
import CategoryEdit from '@/components/hubTopComponents/CategoryEdit/CategoryEdit';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Modal } from '@mui/material';
import client from '@/GraphqlClient/client';
import { gql } from 'apollo-boost';
import { useRouter } from 'next/router';
import Animations from '@/components/loader/Animations';
import { RootState } from '@/redux/app/store';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { updateHubInfo, singleHubInfo } from '@/queries/queries';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type SetPropsType = {
  setEditFunction: (a: boolean) => void;
  setEditConfirmFunction: (a: boolean) => void;
};

const HubDetailEditModal = ({ setEditFunction, setEditConfirmFunction }: SetPropsType) => {
  const categoriesForEdit = useAppSelector((state) => state?.get_all_categories?.all_categories);
  // console.log(categoriesForEdit);
  let catArr: string[] = new Array();
  type getProps = {
    id: string;
    text: string;
  };
  // console.log(gotAllCategories);
  categoriesForEdit.map((catItem) => {
    // console.log(catItem);
    catArr.push(catItem?.text as string);
  });
  const catArrStr = JSON.stringify(catArr);
  const [open, setOpen] = React.useState(true);

  const [loader, setLoader] = React.useState(true);
  interface hubDataTypes {
    categories: string[];
    connectassetnum: number;
    hubicon: string;
    hubmembernum: number;
    hubname: string;
    huburl: string;
    outputrssnum: number;
    publish_status: string;
  }
  const [editHubData, setEditHubData] = React.useState<hubDataTypes | undefined>();
  const [scope, setScope] = React.useState('GENERAL_PUBLIC');

  const myDivRef = useRef<HTMLDivElement>(null);
  const visibility = '一般公開（URLを知っている方がどなたでも閲覧可能になります。）';
  const router = useRouter();
  const gotHubIdForEdit = router.query.slug;

  const ecomediaUrl = 'https://ecomedia.io/yama1234/yamamedia';

  const [tagValue, setTagValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const addTags = (e: any) => {
    if (e.key == 'Enter' && tagValue) {
      setTags([...tags, tagValue]);
      setTagValue('');
    }
  };

  const deleteTag = (tag_remove: any) => {
    const remainTags = tags.filter((_, index) => index !== tag_remove);
    setTags(remainTags);
  };

  //Hide  modal if  press outside  modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (myDivRef.current && !myDivRef.current.contains(event.target as Node)) {
        // Code to execute when user clicks outside the div
        setEditFunction(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [myDivRef]);

  // Fetching Existing Data
  useEffect(() => {
    const UserToken = window.localStorage.getItem('UserToken');

    client
      .query({
        query: singleHubInfo,
        variables: {
          hubId: gotHubIdForEdit
        },
        context: {
          headers: {
            Authorization: `Bearer ${UserToken}`
          }
        }
      })
      .then((result) => {
        setEditHubData(result.data.getHubDetailInfo.hubdetail);
        setLoader(false);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [gotHubIdForEdit]);

  interface Tag {
    id: string;
    text: string;
  }
  const existingData: Tag[] = [];
  editHubData?.categories.forEach((ExistingCatitem, index) => {
    existingData.push({
      id: ExistingCatitem,
      text: ExistingCatitem
    });
  });

  // console.log(existingData, 'Existing Data');

  const hubName = localStorage.getItem('getHubName');
  const formik = useFormik({
    initialValues: {
      hub_name: `${hubName}`
    },
    onSubmit: (values) => {
      setOpen(false);

      const UserToken = window.localStorage.getItem('UserToken');

      client
        .mutate({
          mutation: updateHubInfo,
          variables: {
            hubId: gotHubIdForEdit,
            hubName: values.hub_name,
            hubCategory: catArr
          },
          context: {
            headers: {
              Authorization: `Bearer ${UserToken}`
            }
          }
        })
        .then((result: any) => {
          // console.log(result);
          // SetOpenHubConfirm(true);
          // setOpen(false);
          // props.parentStatus(false);
          // props.parentCreateStatus(true);
          toast.success(result.data.updateHubInfo.message);
          setEditFunction(false);
          setEditConfirmFunction(true);
        })
        .catch((error: any) => {
          // console.log(error);

          // setOpen(true);

          toast.error(error.message);
        });
    },
    validationSchema: Yup.object({
      hub_name: Yup.string().required('※必須入力').max(100, '100 文字以内で設定とする')
    })
  });

  return (
    <>
      {/* newmodal ---------- */}
      {loader == true && <Animations />}

      {loader == false && (
        <Modal className={modalCommonStyles.create_hub} open={open}>
          <Box className={modalCommonStyles.modal_box}>
            <h1 className={modalStyles.brand_title}>基本情報編集 </h1>
            <p className={unsubscribStyle.modal_text}>以下の情報を入力してください。</p>

            <div className="create_hub_modal_body">
              <div className={modalCommonStyles.email_input}>
                <p>ハブの名称</p>
                <input
                  name="hub_name"
                  value={formik.values.hub_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  required
                  placeholder=" ハブの名前を入力してください"
                  defaultValue={editHubData?.hubname}
                />
              </div>

              {formik.errors.hub_name && <div className={commonStyles.error}>{formik.errors.hub_name}</div>}

              <div className={modalCommonStyles.url_input}>
                <p>URL</p>
                <div className={modalCommonStyles.edit_url_input_content}>
                  {/* <p className={modalStyles.url_input_text}>{editHubData?.huburl}</p> */}
                  <input
                    className={modalStyles.url_link}
                    type="text"
                    placeholder=""
                    name="url"
                    value={ecomediaUrl}
                    disabled
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>

              <div className={modalCommonStyles.tag_input}>
                <p>ハブのカテゴリ</p>
                <CategoryEdit existingData={existingData}></CategoryEdit>
              </div>

              <div className={modalCommonStyles.page_visibility}>
                <div className={modalCommonStyles.page_visibility_border_text}>ハブのメディアページ公開範囲</div>
                <div className={modalCommonStyles.selection_inner}>
                  <select
                    required
                    value={scope}
                    onChange={(e) => {
                      setScope(e.target.value);
                    }}
                  >
                    <option defaultChecked value="GENERAL_PUBLIC">
                      {visibility}
                    </option>
                    {/* <option>限定公開（承認されたメンバーのみが閲覧可能になります。）</option> */}
                  </select>
                </div>
              </div>
            </div>
            <div className={unsubscribStyle.box}>
              <button
                className={`close_btn`}
                onClick={() => {
                  setEditFunction(false);
                  // console.log('close clicked');
                }}
              >
                閉じる
              </button>

              <button type="submit" className={`common_btn`} onClick={(e: any) => formik.handleSubmit()}>
                <Link href="#">解除する</Link>
              </button>
            </div>
          </Box>
        </Modal>
      )}
      {/* old modal--------- */}
      {/* {editConfirm && (
        <>
          <div className={`${modalCommonStyles.modal_body}`}>
            <div className={modalCommonStyles.editConfirmationModal}>
              <h1 className={modalStyles.brand_title}>ハブの基本情報が更新されました。 </h1>
              <p className={modalStyles.confirmEditSecondText}>ハブ詳細ページにて変更が反映されているのをご確認ください。</p>

              <div>
                <button
                  className={`${modalCommonStyles.editConfirmClzBtn}`}
                  onClick={() => {
                    setEditConfirm(false);
                  }}
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </>
      )} */}
    </>
  );
};

export default HubDetailEditModal;
