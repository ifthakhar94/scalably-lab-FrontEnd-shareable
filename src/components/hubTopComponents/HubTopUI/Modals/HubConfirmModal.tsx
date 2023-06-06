import React, { useEffect, useRef, useState } from 'react';
import commonStyles from '../../../authComponents/authCommon.module.css';
import modalStyles from './FirstModal.module.css';
import modalCommonStyles from '../../hubTopModal.module.css';
import unsubscribStyle from './UnsubscribeModal.module.css';
function HubConfirmModal({ isOpen }: { isOpen: boolean }) {
  const [hubConfirm, setHubConfirm] = useState(isOpen);

  const myDivRef = useRef<HTMLDivElement>(null);
  //Hide  modal if  press outside  modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (myDivRef.current && !myDivRef.current.contains(event.target as Node)) {
        // Code to execute when user clicks outside the div
        setHubConfirm(false);
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
        setHubConfirm(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  const defaultMOdalHide = () => {
    setHubConfirm(false);
  };
  return (
    <>
      {/* {hubConfirm && (
        <>
          <div className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}`}>
            <div className={modalCommonStyles.modal_content} ref={myDivRef}>
              <h1 className={modalStyles.brand_title}>ハブが作成されました。 </h1>
              <p className={unsubscribStyle.modal_text}>
                早速、ハブ詳細ページにてニュースアセットの設定などを <br /> 進めましょう。
              </p>

              <div className={unsubscribStyle.box}>
                <button className={`close_btn`} onClick={() => setHubConfirm(!hubConfirm)}>
                  閉じる
                </button>

                <button className={`common_btn`} onClick={() => setHubConfirm(!hubConfirm)}>
                  詳細を見る
                </button>
              </div>
            </div>
          </div>
        </>
      )} */}
    </>
  );
}

export default HubConfirmModal;
