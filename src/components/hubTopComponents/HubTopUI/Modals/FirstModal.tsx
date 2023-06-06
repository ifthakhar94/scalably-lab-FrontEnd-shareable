import React, { useEffect, useRef, useState } from 'react';
import commonStyles from '../../../authComponents/authCommon.module.css';
import modalStyles from './FirstModal.module.css';
import Image from 'next/image';
import diagram from './../../../../assets/images/diagram.png';
function FirstModal() {
  const [firstModal, setFirstModal] = useState(false);
  const myDivRef = useRef<HTMLDivElement>(null);
  //Hide  modal if  press outside  modal
  useEffect(() => {
    let defaultModal = window.localStorage.getItem('defaultModal');
    if (defaultModal == 'false') {
      setFirstModal(false);
    } else {
      setFirstModal(true);
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (myDivRef.current && !myDivRef.current.contains(event.target as Node)) {
        // Code to execute when user clicks outside the div
        setFirstModal(false);
        localStorage.setItem('defaultModal', 'false');
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
        setFirstModal(false);
        localStorage.setItem('defaultModal', 'false');
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  const defaultMOdalHide = () => {
    localStorage.setItem('defaultModal', 'false');
    setFirstModal(false);
  };
  return (
    <>
      {firstModal && (
        <>
          <div className={`${commonStyles.modal_body} ${modalStyles.modal_body_custom}`}>
            <div className={modalStyles.modal_content} ref={myDivRef}>
              <h1 className={modalStyles.brand_title}>ハブの管理ページへようこそ！</h1>
              <p className={modalStyles.modal_text}>EcoMediaがあなたの活動をお手伝いします！</p>
              <div className={modalStyles.modal_text_pink_box}>
                <div>
                  <p>
                    あなた自身はもちろん、あなたの所属する会社、コミュニティに、世界中の情報を、メンバーの言語に翻訳して共有することができます。
                  </p>
                </div>
              </div>
              <div className={modalStyles.modal_image}>
                <Image src={diagram} alt="Diagram" width={531} height={186} />
              </div>
              <button className={`common_btn ${modalStyles.btn_custom_width}`} onClick={() => defaultMOdalHide()}>
                次へ
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default FirstModal;
