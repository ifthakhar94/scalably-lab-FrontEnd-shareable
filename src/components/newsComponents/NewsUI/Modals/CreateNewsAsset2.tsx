import React, { useEffect, useRef, useState } from 'react';
import commonStyles from '../../../authComponents/authCommon.module.css';
import modalStyles from './NewsAssetFirstModal.module.css';
import Image from 'next/image';
import * as Yup from 'yup';
import rssIcon from './../../../../assets/images/image21.png';
import { useFormik } from 'formik';
import { CrossIcon, RemoveIcon } from '@/custom-icons/CustomIcons';
import { Link } from '@mui/material';
function CreateNewsAsset2() {
  const [createNewsAsset2Modal, setCreateNewsAsset2Modal] = useState(false);
  const myDivRef = useRef<HTMLDivElement>(null);
  //Hide  modal if  press outside  modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (myDivRef.current && !myDivRef.current.contains(event.target as Node)) {
        // Code to execute when user clicks outside the div
        setCreateNewsAsset2Modal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [myDivRef]);
  //hide  modal  ESC key press
  useEffect(() => {
    const close = (e: any) => {
      if (e.keyCode === 27) {
        setCreateNewsAsset2Modal(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  const defaultMOdalHide = () => {
    setCreateNewsAsset2Modal(false);
  };
  const formik = useFormik({
    initialValues: {
      hub_url: ''
    },
    onSubmit: (values) => {},
    validationSchema: Yup.object({
      hub_url: Yup.string()
        .required('required field')
        .min(1)
        .trim()
        .max(100, 'max value is  100')
        .matches(/^[a-zA-Z0-9\-_]+$/g, 'required field')
    })
  });
  return (
    <>
      {createNewsAsset2Modal && (
        <>
          <div className={`${commonStyles.modal_body} ${modalStyles.modal_body_custom}`}>
            <div className={`${modalStyles.modal_content} ${modalStyles.fixheight}`} ref={myDivRef}>
              <h1 className={modalStyles.brand_title}>ニュース取得元（RSS）の入力</h1>
              <p className={modalStyles.modal_text}>アセットで取得するニュースの取得元を入力してください。</p>
              <div className={modalStyles.modal_text_pink_box}>
                <div>
                  <p>
                    入力したRSSがうまく読み込めなかった場合、RSSの形を調整していただく必要があります。
                    RSSの変換に関してはこちらから変換を行なってください。
                  </p>
                </div>
              </div>
              <div className={commonStyles.hub_area}>
                <div className={commonStyles.hub_inner}>
                  <div className={commonStyles.hub_url}>
                    <p>RSS</p>
                    <input
                      type="text"
                      name="hub_url"
                      value={formik.values.hub_url}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="RSSのURLを入力してください。"
                    />
                  </div>
                  {formik.errors.hub_url && <div className={`mg_b0 ${commonStyles.error}`}>{formik.errors.hub_url}</div>}
                  <button className={`common_btn full_width mg_t30`} onClick={(e: any) => formik.handleSubmit()}>
                    ニュースの取得元の追加
                  </button>
                </div>

                <div className={commonStyles.feeds}>
                  <div className={commonStyles.lists}>
                    <div className={commonStyles.lists_img_wrapper}>
                      <Image src={rssIcon} alt="icon" width={26} height={26} />
                      <div className={commonStyles.rss_data}>
                        <p>Writing - Union Square Ventures</p>
                        <p className={commonStyles.underline}>
                          <Link href="#">www.usv.com</Link>
                        </p>
                      </div>
                    </div>
                    <Link href="#">
                      <RemoveIcon />
                    </Link>
                  </div>
                  <Link href="#" className={commonStyles.add_new}>
                    <CrossIcon /> 追加する
                  </Link>
                </div>
              </div>
              <div className={commonStyles.confirmation_box}>
                <button className={`close_btn`} onClick={() => defaultMOdalHide()}>
                  戻る
                </button>

                <button className={`common_btn`}>ニュースアセットの登録を完了する</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CreateNewsAsset2;
