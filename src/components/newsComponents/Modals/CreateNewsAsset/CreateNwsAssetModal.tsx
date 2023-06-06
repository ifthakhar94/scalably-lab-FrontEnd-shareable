import React from 'react';
import modalStyles from '../../../hubTopComponents/HubTopUI/Modals/FirstModal.module.css';
import unsubscribStyle from '../../../hubTopComponents/HubTopUI/Modals/UnsubscribeModal.module.css';
import modalCommonStyles from '../../../hubTopComponents/hubTopModal.module.css';
import commonStyles from '../../../authComponents/authCommon.module.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import CatogeryInput from '@/components/hubTopComponents/CatogeryInput/CatogeryInput';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
function CreateNwsAssetModal({ isOpen }: { isOpen: boolean }) {
  const [open, setOpen] = React.useState(isOpen);
  const [selectedValue, setSelectedValue] = React.useState('a');
  const [tagLength, setTagLength] = React.useState(false); // New state for Category character count

  const handleClose = () => {
    setOpen(false);
  };
  const handleRadioButtonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      hub_name: '',
      url: 'https://hogehoge.io',
      explanation:
        'この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。'
    },
    onSubmit: (values) => {
      setOpen(false);

      const UserToken = window.localStorage.getItem('UserToken');
    },

    validationSchema: Yup.object({
      hub_name: Yup.string().required('※必須入力').max(100, '100 文字以内で設定とする'),
      url: Yup.string()
        .required('※必須入力')
        .matches(/^[0-9a-zA-Z-_]{1,}$/, 'ハイフン「-」、アンダーバー「_」のみ)')
    })
  });
  return (
    <>
      <Modal className={modalCommonStyles.create_hub} open={open} onClose={handleClose}>
        <Box className={modalCommonStyles.modal_box}>
          <h1 className={modalStyles.brand_title}>ニュースアセットを追加 </h1>
          <p className={unsubscribStyle.modal_text}>追加するニュースアセットの情報を入力しましょう。</p>
          <div className="create_hub_modal_body">
            <div className={modalCommonStyles.newsAsset_input}>
              <p>ニュースアセットの名称</p>
              <input type="text" name="hub_name" placeholder="ニュース アセットの名前を入力してください。" />
            </div>
          </div>

          {formik.errors.hub_name && <div className={commonStyles.error}>{formik.errors.hub_name}</div>}

          <div className={modalCommonStyles.url_input}>
            <p className={modalCommonStyles.lable_text}>URL</p>
            <div className={modalCommonStyles.explanation_input_content}>
              {/* <p>https://hogehoge.io</p> */}
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
          {/* {formik.errors.url && <div className={commonStyles.error}>{formik.errors.url}</div>} */}
          <div className={modalCommonStyles.url_input}>
            <p className={modalCommonStyles.lable_text}>説明文章</p>
            <div className={modalCommonStyles.explanation_textarea_content}>
              <textarea
                className={modalCommonStyles.explanation_textareaInside}
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                説明分を入力してください
              </textarea>
            </div>
          </div>

          <div className="create_hub_modal_body">
            <div className={modalCommonStyles.url_input}>
              <p className={modalCommonStyles.lable_text}>公開範囲設定</p>
              <div className={modalCommonStyles.radio_div}>
                <label className={modalCommonStyles.radioBox}>
                  <input
                    type="radio"
                    name="is_company"
                    className={modalCommonStyles.checkround}
                    value={'a'}
                    onChange={handleRadioButtonChange}
                  />
                  <p className={modalCommonStyles.radio_lable}>全員</p>
                </label>
                <label className={modalCommonStyles.radioBox}>
                  <input
                    type="radio"
                    name="is_company"
                    className={modalCommonStyles.checkround}
                    value={'b'}
                    onChange={handleRadioButtonChange}
                  />
                  <p className={modalCommonStyles.radio_lable}>承認が必要</p>
                </label>
              </div>
            </div>
          </div>
          <div className={modalCommonStyles.tag_input}>
            <p>カテゴリの設定</p>
            <CatogeryInput tagLength={tagLength} setTagLength={setTagLength} />
          </div>
          <div className={unsubscribStyle.creatAssetBtns}>
            <button className={`close_btn`} onClick={handleClose}>
              キャンセル
            </button>

            <button className={`common_btn`} onClick={(e: any) => formik.handleSubmit()}>
              ニュース取得元（RSS）の入力に進む
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default CreateNwsAssetModal;
