import React, { useEffect, useRef, useState } from 'react';
import commonStyles from '../../../authComponents/authCommon.module.css';
import modalStyles from './FirstModal.module.css';
import modalCommonStyles from '../../hubTopModal.module.css';
import unsubscribStyle from './UnsubscribeModal.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import CatogeryInput from '../../CatogeryInput/CatogeryInput';
import Link from 'next/link';
import client from '@/GraphqlClient/client';
import { gql } from 'apollo-boost';
import { toast } from 'react-hot-toast';
import router, { useRouter } from 'next/router';
import { HubConnectNewsAsset, additionalNewsAssetsearchResult, getHubListQuery } from '@/queries/queries';
import Grid from '@mui/material/Grid';
import HubTopUI from '../HubTopUI';
import defaultNewsIcon from './../../../../assets/images/news-default-img.png';
import avatar from './../../../../assets/images/default-photo.jpg';
import Image from 'next/image';
import { hubtop_url } from '@/navCentralization/nav_url';
import { SearchIcon, ThreeDotsBlueIcon, ThreeDotsIcon } from '@/custom-icons/CustomIcons';
type getHubDeleteModal = {
  isOpen: boolean;
  parentStatus: (value: boolean) => void;
  deleteModalParentStatus?: (value: boolean) => void;
  newsHubUpdate: 'confirmed' | 'error' | 'notdone';
  setHubDeleteUpdate: (value: string) => void;
};
interface getCategoriesProps {
  id: string;
  name: string;
}
interface NewsAsset {
  // Define the structure of your NewsAsset type
  newsAssetId: string;
  asseetIcon: string | null;
  asseetName: string;
  assetURL: string;
  self_icon: string;
  assetowner_id: string;
  publish_status: string;
  hubconnstatus: {
    hubId: string;
    status: string;
  };
  categories: {
    id: string;
    name: string;
  }[];
}
function AdditionalNewsAsset({ isOpen, parentStatus, newsHubUpdate, setHubDeleteUpdate, deleteModalParentStatus }: getHubDeleteModal) {
  const [open, setOpen] = React.useState(isOpen);
  const [enableDeleteConfirm, setEnableDeleteConfirm] = React.useState(false);
  const [userToken, setUserToken] = useState<string | null>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totaltPage, setTotaltPage] = useState(0);
  const [searchWord, setSearchWord] = useState<string | null>('');
  const [newsAssetArray, setNewsAssetArray] = useState<NewsAsset[]>([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (isOpen === true) {
      setOpen(true);
    }
  }, [isOpen]);

  // console.log( isOpen);

  const handleClose = () => {
    setOpen(false);
    parentStatus(false);
  };

  const router = useRouter();
  const gotHubId = router.query.slug;
  const handleHubDeleteConfirm = () => {
    setEnableDeleteConfirm(false);
    // setHubDeleteUpdate();
    // window.location.reload();
  };
  //connect  users  hub  is  and  news asset  id
  const handleConnect = (newsAssetId: string) => {
    const UserToken = window.localStorage.getItem('UserToken');
    client
      .mutate({
        mutation: HubConnectNewsAsset,
        variables: {
          newsAssetId: newsAssetId,
          hubId: gotHubId
        },
        context: {
          headers: {
            Authorization: `Bearer ${UserToken}`
          }
        }
      })
      .then((result: any) => {
        //console.log(result);
        const updatedArray = newsAssetArray.map((data) => {
          if (data.newsAssetId === newsAssetId) {
            if (data.publish_status === 'EVERYONE') {
              return { ...data, hubconnstatus: { ...data.hubconnstatus, status: 'CONNECTED' } };
            } else {
              return { ...data, hubconnstatus: { ...data.hubconnstatus, status: 'APPROVAL_PENDING' } };
            }
          }
          return data;
        });
        setNewsAssetArray(updatedArray);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: {
      searchWord: ''
    },
    onSubmit: (values) => {
      setNewsAssetArray([]);
      console.log(values.searchWord);
      setloading(true);
      const UserToken = window.localStorage.getItem('UserToken');
      setUserToken(UserToken);
      setSearchWord(values.searchWord);
      client
        .query({
          query: additionalNewsAssetsearchResult,
          variables: {
            hubId: gotHubId,
            searchWord: values.searchWord,
            pageNumber: 1,
            perPage: 4
          },
          context: {
            headers: {
              Authorization: `Bearer ${UserToken}`
            }
          }
        })
        .then((result: any) => {
          setloading(false);
          setNewsAssetArray(result.data.searchNewsAsset.newsAssetList);
          setCurrentPage(result.data.searchNewsAsset.pagination.currentPage);
          setTotaltPage(result.data.searchNewsAsset.pagination.totalPages);
        })
        .catch((error: any) => {
          setloading(false);
          console.log(error);
        });
    },

    validationSchema: Yup.object({
      searchWord: Yup.string().required()
    })
  });

  function handleScroll(event: React.UIEvent<HTMLDivElement>): void {
    const tempArray = [];
    const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;
    const scroll = scrollHeight - scrollTop - clientHeight;
    [];

    if (scroll > 0) {
    } else if (scroll == 0) {
      // We are at the bottom
      if (currentPage < totaltPage) {
        setloading(true);
        client
          .query({
            query: additionalNewsAssetsearchResult,
            variables: {
              hubId: gotHubId,
              searchWord: searchWord,
              pageNumber: currentPage + 1,
              perPage: 4
            },
            context: {
              headers: {
                Authorization: `Bearer ${userToken}`
              }
            }
          })
          .then((result: any) => {
            setloading(false);
            let mergenewsasset = [...newsAssetArray, ...result.data.searchNewsAsset.newsAssetList];
            console.log(mergenewsasset);
            setNewsAssetArray(mergenewsasset);
            setCurrentPage(result.data.searchNewsAsset.pagination.currentPage);
            setTotaltPage(result.data.searchNewsAsset.pagination.totalPages);
            // console.log(tempArray);
          })
          .catch((error: any) => {
            setloading(false);
            console.log(error);
          });
      }
    }
  }
  // console.log(newsAssetArray.length);
  return (
    <>
      <>
        <Modal
          className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body} ${modalCommonStyles.modal_scroller}`}
          open={open}
          onClose={handleClose}
        >
          <div className={modalCommonStyles.modal_content}>
            <div className={modalCommonStyles.modal_content_padding}>
              <h1 className={modalStyles.brand_title}>自分でニュースアセットを追加する </h1>
              <button className={`common_btn full_width mg_t20`}>新規ニュースアセットを作成</button>
              <div className={`mg_t20 ${modalCommonStyles.line_border}`}></div>
              <p className={`mg_t20 ${modalCommonStyles.asset_title}`}>ニュースアセットを探す</p>
              <div className={modalCommonStyles.search}>
                <SearchIcon />
                <input
                  type="text"
                  name="searchWord"
                  value={formik.values.searchWord}
                  onChange={(e) => {
                    formik.handleChange(e);
                    formik.submitForm();
                  }}
                  onBlur={formik.handleBlur}
                  placeholder="検索する"
                />
              </div>
            </div>

            <div className={modalCommonStyles.search_lists} onScroll={(event) => handleScroll(event)}>
              <div className={modalCommonStyles.search_data}>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={1}>
                    {newsAssetArray.map((list, index) => (
                      <Grid item xs={6} key={index}>
                        <div className={modalCommonStyles.single_data}>
                          <div className={modalCommonStyles.profile_ico}>
                            {list.self_icon !== '' ? (
                              <img src={list.asseetIcon as string} alt="photo" />
                            ) : (
                              <Image src={defaultNewsIcon} alt="photo" />
                            )}
                          </div>
                          <div className={modalCommonStyles.profile_info}>
                            <Link className={modalCommonStyles.title} href="#">
                              {list.asseetName}
                            </Link>
                            <Link className={modalCommonStyles.url} href="#">
                              {list.assetURL.length > 23 ? `${list.assetURL.substring(0, 23)}..` : list.assetURL}
                            </Link>
                          </div>
                          <p className={`${modalCommonStyles.owner}`}>オーナー</p>
                          <div className={`${modalCommonStyles.user_info}`}>
                            <div className={`${modalCommonStyles.avatar}`}>
                              {list.self_icon !== '' ? (
                                <img src={list.self_icon} alt="avatar" width={24} height={25} />
                              ) : (
                                <Image src={avatar} alt="Avatar" width={24} height={25} />
                              )}
                            </div>
                            <div className={`${modalCommonStyles.username}`}>@{list.assetowner_id}</div>
                          </div>
                          <p className={`${modalCommonStyles.category}`}>カテゴリー</p>
                          <div className={`${modalCommonStyles.categories}`}>
                            {list.categories.length > 0 &&
                              list.categories.map((category: getCategoriesProps) => (
                                <span key={category.id} className={`${modalCommonStyles.cat}`}>
                                  {category.name.length > 8 ? `${category.name.substring(0, 4)}...` : category.name}
                                </span>
                              ))}
                            {list.categories.length > 4 && (
                              <span className={modalCommonStyles.card_dots}>
                                <ThreeDotsBlueIcon />
                              </span>
                            )}
                          </div>
                          <div>
                            {list.publish_status == 'EVERYONE' ? (
                              <div>
                                {list.hubconnstatus.status == 'CONNECTED' ? (
                                  <div>
                                    <button className={modalCommonStyles.connectbtn} disabled={true}>
                                      接続済
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    className={modalCommonStyles.connectbtn}
                                    onClick={() => {
                                      handleConnect(list.newsAssetId);
                                    }}
                                  >
                                    接続する
                                  </button>
                                )}
                              </div>
                            ) : (
                              <div>
                                {list.hubconnstatus.status === 'CONNECTED' ? (
                                  <div>
                                    <button className={modalCommonStyles.connectbtn} disabled={true}>
                                      接続済
                                    </button>
                                  </div>
                                ) : list.hubconnstatus.status === 'APPROVAL_PENDING' ? (
                                  <button className={modalCommonStyles.connectbtn} disabled={true}>
                                    接続申請提出済
                                  </button>
                                ) : (
                                  <button
                                    className={modalCommonStyles.connectbtn}
                                    onClick={() => {
                                      handleConnect(list.newsAssetId);
                                    }}
                                  >
                                    接続申請を出す
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </Grid>
                    ))}
                    {loading && <div className={modalCommonStyles.loading}>Loading...</div>}
                  </Grid>
                </Box>
              </div>
            </div>
          </div>
        </Modal>
      </>
    </>
  );
}

export default AdditionalNewsAsset;
