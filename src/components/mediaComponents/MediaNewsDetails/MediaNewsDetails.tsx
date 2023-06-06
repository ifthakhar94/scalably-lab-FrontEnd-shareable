import React, { useState, useEffect } from 'react';
import commonMediaStyles from '../MediaTop/MediaTop.module.css';
import Image from 'next/image';
import { Container } from '@mui/material';
import articlePic from '../../../assets/images/article_big.png';
import { Clock, Facebook, Globe, Motokiji, Polygon, Tag, Twitter } from '@/custom-icons/CustomIcons';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import MediaLayout from '../MediaLayout/MediaLayout';
import Head from 'next/head';

const MediaNewsDetails = () => {
  const { t, i18n } = useTranslation();

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

  return (
    <>
      <Head>
        <title>Media News Details</title>
      </Head>
      <MediaLayout>
        <div className={commonMediaStyles.full_content}>
          <Container className={commonMediaStyles.newsdetail_content}>
            {/* title --------- */}
            <p className={commonMediaStyles.newsTitle}>{eachArticle.title}</p>

            {/* second div----------- */}
            <div className={commonMediaStyles.newsSecondDiv}>
              <div className={commonMediaStyles.newsDateDiv}>
                <div className={commonMediaStyles.globeDiv}>
                  <Globe />
                  <p>
                    <Link href={'#'}>{'KubeCopin'}</Link>
                  </p>
                </div>
                <div className={commonMediaStyles.dateDiv}>
                  <Clock />
                  <p>2023/02/17 19:01</p>
                </div>
              </div>

              <div className={commonMediaStyles.catDiv}>
                <Tag />
                <p>NFT</p>
              </div>

              <div className={commonMediaStyles.catDiv}>
                <div className={commonMediaStyles.facebookDiv}>
                  <p>
                    <Facebook />
                  </p>
                </div>
                <div className={commonMediaStyles.twitterDiv}>
                  <p>
                    <Twitter />
                  </p>
                </div>
              </div>
            </div>

            {/* Description div---------- */}
            <div className={commonMediaStyles.descriptionDiv}>{eachArticle.description}</div>
            <div className={commonMediaStyles.pictureDiv}>
              <Image src={articlePic} alt="Article pic" width={908} height={514} />
            </div>
            <div className={commonMediaStyles.lastDiv}>
              <p>
                <Motokiji />
              </p>
              <p>元記事</p>
            </div>

            <footer className={commonMediaStyles.footerDiv}>
              <p>© 2023 - Ecomedia</p>
            </footer>
          </Container>
        </div>
      </MediaLayout>
    </>
  );
};

export default MediaNewsDetails;
