import Head from 'next/head';
import { useState, useEffect } from 'react';
import commonMediaStyles from '../MediaTop/MediaTop.module.css';
import Image from 'next/image';
import hub_icon from '../../../assets/images/hub_icon.jpg';
import { Menubar, Polygon } from '@/custom-icons/CustomIcons';
import { useTranslation } from 'react-i18next';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './../../../redux/app/store';

import { setLanguageTag } from '@/redux/features/LanguageTagSlice/LanguageTagSlice';
import english from '../../../assets/CountryFlags/en.png';
import french from '../../../assets/CountryFlags/fr.png';
import japan from '../../../assets/CountryFlags/ja.jpg';
import React, { ReactNode } from 'react';
import Link from 'next/link';
import { FormControl, InputLabel, Select } from '@mui/material';
type ComponentProps = {
  children: ReactNode;
};
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;

const MediaLayout = ({ children }: ComponentProps) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const gotLanguage = useAppSelector((state) => state?.getLanguageTag);
  const [selectedLan, setSelectedLan] = useState<any>('日本語');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const languages = [
    { codeValue: 'ja', optionValue: '日本語', flag: japan },
    { codeValue: 'en', optionValue: 'English', flag: english },
    { codeValue: 'fr', optionValue: 'French', flag: french }
  ];

  function toggle() {
    setDropdownOpen(!dropdownOpen);
  }

  useEffect(() => {
    setSelectedLan(gotLanguage.languageOption);
    i18n.changeLanguage(gotLanguage.languageCode);
  }, []);

  const handleLanguage = (lan: any): void => {
    // console.log(lan);
    setSelectedLan(lan.optionValue);
    let selectedLanguage = lan.codeValue;
    dispatch(setLanguageTag({ code: lan.codeValue, option: lan.optionValue }));
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <>
      <div className={commonMediaStyles.totalDiv}>
        {/* header with icons ----------- */}
        <div className={commonMediaStyles.topBar}>
          <div className={commonMediaStyles.menuIcon}>
            <Menubar />
          </div>
          {/* icon------------------------- */}
          <div className={commonMediaStyles.hubIcon}>
            <Link href={'/media/mediaTop/ecomedia_ID/hub_URL'}>
              <Image src={hub_icon} alt="Hub Image" />
            </Link>
            {/* <Image src={hub_icon} alt="Hub Image" /> */}
          </div>
          {/* dropdown------------ */}

          <div className={commonMediaStyles.language_selection} id="aaa" onClick={() => toggle()}>
            <div className={commonMediaStyles.lan_list}>
              {selectedLan == '日本語' && <Image src={japan} alt="Japan Flag" width={16} height={15} />}
              {selectedLan == 'English' && <Image src={english} alt="Uk Flag" width={16} height={15} />}
              {selectedLan == 'French' && <Image src={french} alt="French Flag" width={16} height={15} />}
              <p>{selectedLan}</p>

              <div
                className={commonMediaStyles.language_dropdown}
                id="drpID"
                style={{
                  display: dropdownOpen ? 'block' : 'none'
                }}
              >
                <div className={commonMediaStyles.arrow}></div>
                <ul>
                  {languages.map((eachLan) => (
                    <li
                      className={commonMediaStyles.dropdownList}
                      onClick={() => {
                        handleLanguage({ codeValue: eachLan.codeValue, optionValue: eachLan.optionValue });
                      }}
                    >
                      <Image src={eachLan.flag} alt="Japan Flag" width={16} height={15} />
                      {eachLan.optionValue}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Polygon />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default MediaLayout;
