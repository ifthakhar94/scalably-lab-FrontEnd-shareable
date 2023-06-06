import React, { useEffect, useRef, useState, useContext } from 'react';
import Styles from './NewsUI.module.css';
import TableIcon from './../../../assets/images/tableIcon.png';
import discord_icon from './../../../assets/images/discord_icon.png';
import telegram_icon from './../../../assets/images/TelegramIcon.png';
import post_outline from './../../../assets/images/post_outline.png';
import semantic_web from './../../../assets/images/semantic_web.png';

import Link from 'next/link';
import { news_asset } from '@/navCentralization/nav_url';
import { DownwardArrow, SearchIcon, ThreeDotsIcon } from '@/custom-icons/CustomIcons';
import Image from 'next/image';
import TablePagination from '@/components/hubTopComponents/TablePagination/TablePagination';
import CreateNwsAssetModal from '../Modals/CreateNewsAsset/CreateNwsAssetModal';
import { boolean } from 'yup';
import CommonLayout from '@/components/hubTopComponents/commonLayout/CommonLayout';
const NewsUI = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [hoverState, setHoverState] = useState(false);
  const HandlehreeDotClicked = () => {
    setHoverState(true);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const myDivRef = useRef<HTMLDivElement>(null);
  //Hide  operation modal if  press outside  modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (myDivRef.current && !myDivRef.current.contains(event.target as Node)) {
        setHoverState(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [myDivRef]);
  return (
    <>
      <CommonLayout>
        {/* News Assets BreadCrumb  */}
        <div className={Styles.news_assets_bread_crumb}>
          <ul>
            <li>
              <Link href={news_asset}>ニュースアセット管理ページ</Link>
            </li>
          </ul>
        </div>
        {/* List of registered news assets and search */}
        <div className={Styles.news_assets_list_search}>
          <div className={Styles.news_assets_section_title_search}>
            <div className={Styles.title_add_btn} onClick={handleOpen}>
              <h1>登録したニュースアセット一覧</h1>
              <p>ニュースアセットを追加</p>
            </div>
            <p className={Styles.text_before_search}>あなたが登録したニュースアセットの一覧です。</p>
            <div className={Styles.news_assets_search_area}>
              <SearchIcon />
              <input type="text" placeholder="検索する" />
            </div>
          </div>
          {/* news assets list table */}
          <div className={Styles.news_assets_list_table}>
            <table width="100%">
              <thead>
                <tr>
                  <th className={Styles.news_assets_first_th}>
                    <span>ニュースアセット</span> <DownwardArrow />
                  </th>

                  <th>ステータス</th>
                  <th className={Styles.get_yuan_th}>取得元</th>
                  <th className={Styles.access_point_th}>接続先</th>
                  <th className={Styles.category_th}>カテゴリ</th>
                  <th>第三者が設定したカテゴリ</th>
                  <th>操作</th>
                </tr>
              </thead>

              <tbody className={Styles.news_assets_table_body}>
                <tr>
                  <td>
                    <div className={Styles.data_content_wrapper}>
                      <Image src={TableIcon} alt="TableIcon" />
                      <div className={Styles.table_data_name_url}>
                        <h6>IOHK</h6>
                        <p>https://iohk.io/</p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className={Styles.public_asset}>全員に公開</div>
                  </td>
                  <td>
                    <div className={Styles.get_yuan}>
                      <div className={Styles.yuan_discord}>
                        <Image src={discord_icon} alt="Discord Icon" />
                        <span> 11 </span>
                      </div>
                      <div className={Styles.yuan_telegram}>
                        <Image src={telegram_icon} alt="Telegram Icon" />
                        <span> 4 </span>
                      </div>
                      <div className={Styles.yuan_post_outline}>
                        <Image src={post_outline} alt="Post Outline Icon" />
                        <span> 60 </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className={Styles.access_point}>
                      <Image src={semantic_web} alt="Semantic Web Icon" />
                      <span>5,000 ハブ</span>
                    </div>
                  </td>

                  <td>
                    <div className={Styles.data_category}>Blockchain</div>
                  </td>
                  <td>
                    <div className={Styles.categories_by_third_parties}>
                      <span>Blockchain</span>
                      <span>DAO</span>
                    </div>
                  </td>
                  <td className={Styles.TableThreeDots}>
                    <span onClick={HandlehreeDotClicked}>
                      <ThreeDotsIcon />
                    </span>
                    {hoverState && (
                      <div className={Styles.unlock_hover} ref={myDivRef}>
                        <h4>詳細</h4>
                        <h4 className={Styles.delete_popup}>削除する</h4>
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className={Styles.registred_news_assets_pagination}>
              <TablePagination />
            </div>
          </div>
        </div>
      </CommonLayout>
      {open && <CreateNwsAssetModal isOpen={true} />}
    </>
  );
};

export default NewsUI;
