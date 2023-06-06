import React, { useState, useEffect } from 'react';
import commonMediaStyles from './MediaTop.module.css';
import Image from 'next/image';
import hub_icon from '../../../assets/images/hub_icon.jpg';
import asset_icon from '../../../assets/images/News Asset icon.jpg';
import Grid from '@mui/material/Grid';

import article from '../../../assets/images/article_big.png';
import { useTranslation } from 'react-i18next';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './../../../redux/app/store';
import { Container } from '@mui/material';
import Link from 'next/link';
import { Menubar, Polygon } from '@/custom-icons/CustomIcons';
import Head from 'next/head';
import { newsAsset_url } from '@/navCentralization/nav_url';
import { setLanguageTag } from '@/redux/features/LanguageTagSlice/LanguageTagSlice';
import english from '../../../assets/CountryFlags/en.png';
import french from '../../../assets/CountryFlags/fr.png';
import japan from '../../../assets/CountryFlags/ja.jpg';
import MediaLayout from '../MediaLayout/MediaLayout';

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const MediaTopUI = () => {
  const { t, i18n } = useTranslation();

  const kubeCards: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  let [articleArraySlice, setArticleArraySlice] = useState<number>(6);

  type article = {
    title: string;
    extra: string;
    date: string;
    description: string;
  };

  //temporary------this data we will get from api--------
  const eachArticle: article = {
    title: 'ビーライズホテルズ、マーケットプレイスへようこそ。',
    extra: 'KubeCoin',
    date: '2023/02/17',
    description:
      'マーケットプレイスが成長を続ける中、ビー・ライブ・ホテルズが当社のファミリーに加わることを 誇りに思います。ビー・ライブ・ホテルズは、ラグジュアリー志向の方にも、家族で楽しみたい方に も、あらゆるタイマーケットプレイスが成長を続ける中、ビー・ライブ・ホテルズが当社のファミリーに加わることを 誇りに思います。ビー・ライブ・ホテルズは、ラグジュアリー志向の方にも、家族で楽しみたい方に も、あらゆるタイプの旅行者に対応するオプショ'
  };
  // temporary------------
  const allArticles: any[] = [
    { eachArticle },
    { eachArticle },
    { eachArticle },
    { eachArticle },
    { eachArticle },
    { eachArticle },
    { eachArticle },
    { eachArticle }
  ];
  // temporary-----------
  const categoryList: string[] = [
    'BigData ',
    'Community',
    'CoreBlockchain',
    'DAO',
    'dApps',
    'Data',
    'Defi',
    'DID',
    'Enterprise',
    'GameFi',
    'Governance',
    'ID',
    'IDO-IFO-ISPO',
    'InformationTechnology',
    'Infrastructure',
    'Investment ',
    'IPFS ',
    'Launchpad',
    'Layer2-Scaling',
    'Meme',
    'Metaverse',
    'NFT',
    'NFT Marketplace',
    'NFT Tool',
    'Payment',
    'Social'
  ];

  // temporary------------
  const assetPartCategories: string[] = ['NFT', 'DAO', 'WAX', 'Blockchain'];

  const dispatch = useAppDispatch();

  const handleReadMore = (numOfArticles: any) => {
    console.log(numOfArticles);
    setArticleArraySlice(numOfArticles);
  };
  useEffect(() => {
    const handleKeyPress = (event: any) => {
      console.log(event);
      if (event.keyCode === 20) {
        // Call your function here
        // Replace `yourFunction` with the actual function you want to trigger
        handleReadMore(allArticles.length);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Media Top</title>
      </Head>
      <MediaLayout>
        <div className={commonMediaStyles.full_content}>
          <Container className={commonMediaStyles.container_content}>
            {/* container first part upto read mnore button------------ */}
            <div className={commonMediaStyles.container_first_content}>
              {/* category content------------ */}
              <div className={commonMediaStyles.categtory_content}>
                <p className={commonMediaStyles.category_title}>{t('mediatop.title1')}</p>
                <div className={commonMediaStyles.category_list}>
                  {categoryList.map((list) => (
                    <div className={commonMediaStyles.listText}>
                      <Link className={commonMediaStyles.linkText} href={`/media/mediaCategories/${list}`}>
                        {list}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* all article prinbt-------- */}

              <div className={commonMediaStyles.article_content}>
                <p className={commonMediaStyles.category_title}>{t('mediatop.title2')}</p>
                {/* each article------------------- */}

                {allArticles.slice(0, articleArraySlice).map((Article) => (
                  <Link href={`/media/mediaNewsDetails/ecomedia_id/hub_URL/${Article.eachArticle.title}`}>
                    <div className={commonMediaStyles.article}>
                      {/* {console.log(Article)} */}
                      {/* {arr.push(Article)} */}
                      <Image className={commonMediaStyles.img} src={article} alt="article Image" width={131} height={79} />
                      <div className={commonMediaStyles.article_leftContent}>
                        <p className={commonMediaStyles.leftContent_title}>{eachArticle.title}</p>
                        <div className={commonMediaStyles.leftContent_mdl}>
                          <p>{eachArticle.extra}</p>
                          <p>{eachArticle.date}</p>
                        </div>
                        <div className={commonMediaStyles.leftContent_des}>
                          {eachArticle.description.length > 100 && (
                            <>
                              <p>{eachArticle.description.substring(0, 90)}...</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                {allArticles.length > 6 && (
                  <div className={commonMediaStyles.readMore_btn_totalDiv}>
                    <button
                      className={commonMediaStyles.readMore_btn}
                      onClick={() => {
                        handleReadMore(allArticles.length);
                      }}
                    >
                      {t('mediatop.rm_btn')}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Container second part */}
            <div className={commonMediaStyles.container_second_content}>
              <div className={commonMediaStyles.container_second_contentTitle}>
                <p>{t('mediatop.title3')}</p>
              </div>
              {/* all assets cards list----------- */}
              <Grid container rowSpacing={3} columnSpacing={{ xs: 2, md: 6 }}>
                {kubeCards.map((item) => (
                  <Grid item md={3} xs={12}>
                    <Link href={newsAsset_url}>
                      <div className={commonMediaStyles.eachAssetsCard}>
                        <div className={commonMediaStyles.eachAssetTopPart}>
                          <div className={commonMediaStyles.assetIcon}>
                            <Image src={asset_icon} alt="Hub Image" />
                          </div>
                          <p>KubeCoin</p>
                        </div>
                        <div className={commonMediaStyles.eachAssetCPart}>
                          {assetPartCategories.map((category) => (
                            <span>#{category}</span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </Grid>
                ))}
              </Grid>

              {/* Read more button after assets list----------- */}
              <div className={commonMediaStyles.readMore_btn_totalDiv}>
                <button className={commonMediaStyles.readMore_btn}> {t('mediatop.rm_btn')}</button>
              </div>
            </div>
            <footer>
              <p>© 2023 - Ecomedia</p>
            </footer>
          </Container>
        </div>
      </MediaLayout>
    </>
  );
};

export default MediaTopUI;
