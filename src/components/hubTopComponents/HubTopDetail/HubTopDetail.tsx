import React, { useEffect, useState } from 'react';
import CommonLayout from '../commonLayout/CommonLayout';
import Styles from './HubTopDetail.module.css';
import { ChevronRight, ThreeDotsIcon, PencilEdit, SearchIcon } from '@/custom-icons/CustomIcons';
import Image from 'next/image';
import unsubscribStyle from './../HubTopUI/Modals/UnsubscribeModal.module.css';
import table_user from './../../../assets/images/table_logo.png';
import userPro from './../../../assets/images/pro.png';
import CustomTablePagination from '../TablePagination/TablePagination';
import HubDetailEditModal from '@/components/modalComponents/hubDetailEditModal/HubDetailEditModal';
import { RootState } from '@/redux/app/store';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import client from '@/GraphqlClient/client';
import modalStyles from './../../modalComponents/hubDetailEditModal/HubDetailEditModal.module.css';
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
import { useRouter } from 'next/router';
import Animations from '@/components/loader/Animations';
import modalCommonStyles from './../../hubTopComponents/hubTopModal.module.css';
import Link from 'next/link';
import { hubtop_url } from '@/navCentralization/nav_url';
import { useQuery } from '@apollo/client';
import { GetHubNewsAssetListQueryString, getHubDetailQuery, getHubListQuery } from '@/queries/queries';
import HubIconUpload from '@/components/hubTopComponents/HubTopDetail/HubIconUpload';
import HubDeleteModal from '../HubTopUI/Modals/HubDeleteModal';
import NewsAssetCategorySetup from '../HubTopUI/Modals/NewsAssetCategorySetup';
import AdditionalNewsAsset from '../HubTopUI/Modals/AdditionalNewsAsset';
import Test from '../HubTopUI/Modals/AdditionalNewsAsset';
import Pagination from './../TablePagination/TablePagination.module.css';
import { NextIcon, PrevIcon } from '@/custom-icons/CustomIcons';
// import ConnectModal from '../HubTopUI/Modals/ConnectModal';
import DisconnectModal from '../HubTopUI/Modals/DisconnectModal';

const HubTopDetail = () => {
  const router = useRouter();
  const gotHubId: any = router.query.slug;
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

  const [editModal, setEditModal] = useState(false);

  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = React.useState();
  const [fromData, setFromData] = useState();
  const [toData, setToData] = useState();
  const [totalItems, setTotalItems] = useState();

  const [editConfirmModal, setEditConformModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [hubData, setHubData] = useState<hubDataTypes | undefined>();
  const [deleteModalopen, setDeleteModalopen] = useState(false);
  const [additionalNewsModalopen, setAdditionalNewsModalopen] = useState(false);
  const [connectModalopen, setConnectModalopen] = useState(false);
  const [disconnectModalopen, setDisconnectModalopen] = useState(false);

  const [hubId, setHubId] = useState('');
  const [newsAssetCategorySetupConfirm, setNewsAssetCategorySetupConfirm] = useState(false);
  const [hubDeleteUpdate, setHubDeleteUpdate] = useState<'confirmed' | 'error' | 'notdone'>('notdone');
  const [newsHubUpdate, setNewsHubUpdate] = useState<'confirmed' | 'error' | 'notdone'>('notdone');
  const [open, setOpen] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [newsAssetName, setNewsAssetName] = useState('');

  // News Assets List States
  interface NewsAssetsListDataTypes {
    map: any;
    assetcategories: any;
    asseticon: string | null;
    assetname: string | null;
    asseturl: string | null;
    ecomedia_id: string | null;
    newsAssetId: string | null;
    public_status: string | null;
    self_icon: string | null;
    third_party_categories: any;
  }
  const [newsAssetsSearchWord, setNewsAssetsSearchWord] = useState('');
  const [gotNewsAssetId, setGotNewsAssetId] = useState('');
  const [newsAssetsPageNumber, setNewsAssetsPageNumber] = useState(1);
  const [newsAssetsPerPage, setNewsAssetsPerPage] = useState(5);
  const [newsAssetsData, setNewsAssetsData] = useState<NewsAssetsListDataTypes>();
  const [newsAssetCategories, setNewsAssetCategories] = useState<string[]>();
  const [ownerCategories, setOwnerCategories] = useState<string[]>();
  const [newsAssetsChildData, setNewsAssetsChildData] = useState<boolean>();
  const [categorySetupRefetch, setCategorySetupRefetch] = useState<boolean>();

  // Hub Delete from hub Details page
  const handleDeleteModalOpen = (hubId: string) => {
    setDeleteModalopen(true);

    setHubId(hubId);
  };
  const handleAdditionalModalOpen = () => {
    setAdditionalNewsModalopen(true);
    console.log('additionalNewsModalopen', additionalNewsModalopen);
  };
  //Refecth data when modal is closed
  useEffect(() => {
    refetchPosts();
  }, [additionalNewsModalopen == false]);
  const handleConnectModalOpen = () => {
    setConnectModalopen(true);
  };
  const handleDisconnectModalOpen = (newsAssetsID: any) => {
    setDisconnectModalopen(true);
    setGotNewsAssetId(newsAssetsID);
    setDisconnectModalopen(true);
  };
  const getStatus = (data: boolean | ((prevState: boolean) => boolean)) => {
    setOpen(data);
    setDeleteModalopen(data);
  };
  const getNewsStatus = (data: boolean | ((prevState: boolean) => boolean)) => {
    setOpen(data);
    setDeleteModalopen(data);
    setAdditionalNewsModalopen(data);
  };
  const getConnectStatus = (data: boolean | ((prevState: boolean) => boolean)) => {
    setOpen(data);
    setDeleteModalopen(data);
    setConnectModalopen(data);
    // console.log('data', data);
  };

  const getDisconnectStatus = (data: boolean | ((prevState: boolean) => boolean)) => {
    setOpen(data);
    setDeleteModalopen(data);
    setDisconnectModalopen(data);

    // setDisconnectModalopen(data);
  };
  const handleEdit = (): any => {
    setEditModal(true);
    localStorage.setItem('getHubName', `${hubData?.hubname}`);
  };

  const handleOpen = (newsAssetsName: any, ownerCategories: any, newsAssetsID: any) => {
    setOpen(true);
    setNewsAssetName(newsAssetsName);
    setOwnerCategories(ownerCategories);
    setGotNewsAssetId(newsAssetsID);
  };

  const getParentStatus = (data: boolean | ((prevState: boolean) => boolean)) => {
    if (data == true) {
      setNewsAssetCategorySetupConfirm(true);
    } else {
      setNewsAssetCategorySetupConfirm(false);
    }
  };
  useEffect(() => {
    const UserToken = window.localStorage.getItem('UserToken');

    client
      .query({
        query: getHubDetailQuery,
        variables: {
          hubId: gotHubId
        },
        context: {
          headers: {
            Authorization: `Bearer ${UserToken}`
          }
        }
      })
      .then((result) => {
        setHubData(result.data.getHubDetailInfo.hubdetail);
        setLoader(false);
      })
      .catch((error) => {});
  }, [gotHubId]);

  //Refresh data  api call
  let UserToken = null;
  if (typeof window !== 'undefined') {
    UserToken = window.localStorage.getItem('UserToken');
  }

  const {
    loading,
    error,
    data,
    refetch: refetchHubList
  } = useQuery(getHubDetailQuery, {
    context: {
      headers: {
        authorization: 'Bearer ' + UserToken
      }
    },
    variables: {
      hubId: gotHubId
    }
  });
  function fetchDataAndUpdate() {
    refetchHubList();
    setEditConformModal(false);
  }

  useEffect(() => {
    if (data) {
      setHubData(data.getHubDetailInfo.hubdetail);
      setLoader(false);
      // setEditConformModal(false);
    }
  }, [data]);

  // News Assets List API Implementation

  const {
    loading: postsLoading,
    error: postsError,
    data: postData,
    refetch: refetchPosts
  } = useQuery(GetHubNewsAssetListQueryString, {
    variables: {
      hubId: gotHubId,
      searchWord: newsAssetsSearchWord,
      pageNumber: newsAssetsPageNumber,
      perPage: newsAssetsPerPage
    },
    context: {
      headers: {
        authorization: 'Bearer ' + UserToken
      }
    }
  });

  useEffect(() => {
    refetchPosts();
    setNewsAssetsChildData(false);
  }, [newsAssetsChildData]);

  // Refetching After Category Setup
  function handleRefetchAfterCatSetup(data: any): void {
    setCategorySetupRefetch(data);
  }
  useEffect(() => {
    refetchPosts();
    setOpen(false);
    setCategorySetupRefetch(false);
  }, [categorySetupRefetch]);

  useEffect(() => {
    // console.log(postData?.getHubNewsAssetList?.hubNewsAssetList);
    setNewsAssetsData(postData?.getHubNewsAssetList?.hubNewsAssetList);
    setNewsAssetCategories(postData?.getHubNewsAssetList.hubNewsAssetList);
    setTotalItems(postData?.getHubNewsAssetList.pagination.totalItems);
    setTotalPages(postData?.getHubNewsAssetList.pagination.totalPages);
    setCurrentPage(postData?.getHubNewsAssetList.pagination.currentPage);
    setFromData(postData?.getHubNewsAssetList.pagination.fromData);
    setToData(postData?.getHubNewsAssetList.pagination.toData);

    // Fetching News Assets Categories

    const subarray: any = [];
    postData?.getHubNewsAssetList?.hubNewsAssetList?.map((item: any, index: number) => {
      item.third_party_categories.map((single__thirdparty_category: { name: any }) => subarray.push(single__thirdparty_category.name));
      item.assetcategories.map((single__category: { name: any }) => subarray.push(single__category.name));
    });
    setNewsAssetCategories(subarray);
  }, [postData]);
  // prev paginate hub list
  const prevPaginate = () => {
    let newPageNumber = newsAssetsPageNumber - 1;
    setNewsAssetsPageNumber(newPageNumber);

    UserToken = window.localStorage.getItem('UserToken');
    client
      .query({
        query: GetHubNewsAssetListQueryString,
        variables: {
          pageNumber: newsAssetsPageNumber
        },
        context: {
          headers: {
            Authorization: `Bearer ${UserToken}`
          }
        }
      })
      .then((result: any) => {
        setNewsAssetsPageNumber(newPageNumber);
        setNewsAssetsData(result?.getHubNewsAssetList?.hubNewsAssetList);
        setNewsAssetCategories(result?.getHubNewsAssetList?.hubNewsAssetList);
        setTotalItems(result?.getHubNewsAssetList?.pagination?.totalItems);
        setTotalPages(result?.getHubNewsAssetList?.pagination?.totalPages);
        setCurrentPage(result?.getHubNewsAssetList?.pagination?.currentPage);
        setFromData(result?.getHubNewsAssetList?.pagination?.fromData);
        setToData(result?.getHubNewsAssetList?.pagination?.toData);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  //Next paginate hub list
  const nextPaginate = () => {
    let newPageNumber = newsAssetsPageNumber + 1;
    setNewsAssetsPageNumber(newPageNumber);

    UserToken = window.localStorage.getItem('UserToken');
    client
      .query({
        query: GetHubNewsAssetListQueryString,
        variables: {
          pageNumber: newsAssetsPageNumber
        },
        context: {
          headers: {
            Authorization: `Bearer ${UserToken}`
          }
        }
      })
      .then((result: any) => {
        setNewsAssetsPageNumber(newPageNumber);
        setNewsAssetsData(result?.getHubNewsAssetList?.hubNewsAssetList);
        setNewsAssetCategories(result?.getHubNewsAssetList?.hubNewsAssetList);
        setTotalItems(result?.getHubNewsAssetList?.pagination?.totalItems);
        setTotalPages(result?.getHubNewsAssetList?.pagination?.totalPages);
        setCurrentPage(result?.getHubNewsAssetList?.pagination?.currentPage);
        setFromData(result?.getHubNewsAssetList?.pagination?.fromData);
        setToData(result?.getHubNewsAssetList?.pagination?.toData);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  // console.log('setDisconnectModalopen', disconnectModalopen);
  // news assets disconnect Child data && Refetch News Assets List

  function handleChildData(data: any): void {
    setNewsAssetsChildData(data);
  }

  const handleClose = () => {
    setDisconnectModalopen(false);
    setOpen(false);
    refetchPosts();
  };
  const calRefetchHubList = (event: string) => {
    setNewsAssetsSearchWord(event.trim());
    setTimeout(() => {
      refetchPosts(); // Call the function after a delay
    }, 300);
  };
  // console.log(newsAssetCategories);

  return (
    <>
      <CommonLayout>
        {loader == true && (
          <>
            <Animations />
          </>
        )}
        {/* Main page div-------- */}

        {loader == false && (
          <div>
            {/* Topbar div ---------- */}
            <div className={Styles.top_bar}>
              <div>
                <Link href={hubtop_url}>ハブ管理ページ</Link>
              </div>
              <div className={Styles.chev_icon}>
                <ChevronRight></ChevronRight>
              </div>
              <div>{hubData?.hubname}</div>
            </div>

            {/* Profile bar ----- */}
            <div className={Styles.profile_bar}>
              {/* Left Section of profile bar ------- */}
              <div className={Styles.left_section}>
                <HubIconUpload hubId={gotHubId} hubIconURL={hubData?.hubicon} />
              </div>
              {/* Right side of profilebar------- */}
              <div className={Styles.right_section}>
                {/* First section ------- */}
                <div className={Styles.first_section}>
                  <div>
                    <p className={Styles.section_head_common}>名称</p>
                    <p className={Styles.cardano_heading}>{hubData?.hubname}</p>
                  </div>
                  <div className={Styles.right_of_first_section}>
                    {/* <div className={Styles.searchbar}></div> */}
                    <button
                      onClick={() => {
                        handleEdit();
                      }}
                      className={Styles.editBtnBar}
                    >
                      編集
                    </button>

                    <div className={Styles.dots_dropdown}>
                      <ThreeDotsIcon></ThreeDotsIcon>
                      <div>
                        <ul className={Styles.dropdown_options}>
                          <li>チームメンバーの管理</li>
                          <li className={Styles.dropdown_HiddenOptions}>メンバーの招待</li>
                          <li>ハブを外部に出力する</li>
                          <li
                            onClick={() => {
                              handleDeleteModalOpen(`${gotHubId}`);
                            }}
                          >
                            ハブを削除する
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Second section------ */}
                <div className={Styles.first_section}>
                  <div>
                    <p className={Styles.section_head_common}>カテゴリー</p>
                    <div className={Styles.tags_parent}>
                      {hubData?.categories &&
                        hubData?.categories.map((tag) => (
                          <>
                            <div className={Styles.second_section_cat}>{tag}</div>
                          </>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Third Section -------- */}
                <div className={Styles.first_section}>
                  <div>
                    <p className={Styles.section_head_common}>URL</p>
                    <p className={Styles.uri_text}>
                      {hubData && (
                        <Link href={hubData?.huburl} target="_blank">
                          {hubData?.huburl}
                        </Link>
                      )}
                    </p>
                  </div>
                </div>

                {/* Fourth section-------- */}
                <div className={Styles.fourth_section}>
                  <p className={Styles.section_head_common}>公開設定</p>
                  <p className={Styles.fourth_section_text}>{hubData?.publish_status}</p>
                </div>
                {/* Fifth Section -------------- */}
                <div className={Styles.fifth_section}>
                  <div>
                    <p className={Styles.section_head_common}>接続アセット数</p>
                    <p className={Styles.fifth_section_2ndtext}>{hubData?.connectassetnum} アセット</p>
                  </div>
                  <div>
                    <p className={Styles.section_head_common}>チームメンバー数</p>
                    <p className={Styles.fifth_section_2ndtext}>{hubData?.hubmembernum} 人</p>
                  </div>
                  <div>
                    <p className={Styles.section_head_common}>発行RSS数</p>
                    <p className={Styles.fifth_section_2ndtext}>{hubData?.outputrssnum}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* //Table section ---------- */}
            <div className={Styles.table_section}>
              <div className={Styles.table_section_list_title}>
                <p className={Styles.table_title_text}>ニュースアセット一覧</p>
                <div className={Styles.right_text}>
                  <p
                    onClick={() => {
                      handleAdditionalModalOpen();
                    }}
                  >
                    ニュースアセットを追加
                  </p>
                </div>
              </div>
              <div className={Styles.sub_hub_list_search}>
                <SearchIcon />
                <input
                  type="text"
                  placeholder="検索する"
                  onChange={(event) => {
                    calRefetchHubList(event.target.value); // Pass the input value to the function
                  }}
                />
              </div>

              <div className={Styles.sub_hub_list_table}>
                <table>
                  <thead>
                    <tr>
                      <th>アセット名</th>
                      <th>オーナー</th>
                      <th>カテゴリ</th>
                      <th>ステータス</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {newsAssetsData.map(((single_news_data, index) = {}))} */}
                    {newsAssetsData &&
                      newsAssetsData?.map((single_news_data: NewsAssetsListDataTypes, index: number) => (
                        <tr key={index}>
                          <td>
                            <div className={Styles.table_first_colum}>
                              <Image src={single_news_data?.asseticon ? single_news_data?.asseticon : table_user} alt="Table User Image" />
                              <div className={Styles.url_text}>
                                <p>{single_news_data?.assetname} </p>
                                <p>{single_news_data?.asseturl}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className={Styles.table_second_colum}>
                              <Image src={single_news_data?.self_icon ? single_news_data?.self_icon : userPro} alt="Table User Image" />
                              <p className={Styles.ecoIDText}>@{single_news_data?.ecomedia_id} </p>
                            </div>
                          </td>
                          <td>
                            <>
                              {(() => {
                                const assetCategories = single_news_data.assetcategories;
                                if (assetCategories) {
                                  const assetCategoryElements = [];
                                  for (let i = 0; i < assetCategories.length; i++) {
                                    assetCategoryElements.push(
                                      <React.Fragment key={i}>
                                        <span key={index} className={Styles.table_cat}>
                                          {assetCategories[i].name}
                                        </span>
                                      </React.Fragment>
                                    );
                                  }
                                  return assetCategoryElements;
                                } else {
                                  return null;
                                }
                              })()}
                            </>
                            <>
                              {(() => {
                                const third_party_categories = single_news_data.third_party_categories;
                                if (third_party_categories) {
                                  const third_party_categoryElements = [];
                                  for (let i = 0; i < third_party_categories.length; i++) {
                                    third_party_categoryElements.push(
                                      <React.Fragment key={i}>
                                        <span key={index} className={Styles.table_cat}>
                                          {third_party_categories[i].name}
                                        </span>
                                      </React.Fragment>
                                    );
                                  }
                                  return third_party_categoryElements;
                                } else {
                                  return null;
                                }
                              })()}
                            </>
                          </td>
                          <td>{single_news_data?.public_status}</td>
                          <td className={Styles.dots_dropdown}>
                            <ThreeDotsIcon></ThreeDotsIcon>
                            <div>
                              <ul className={Styles.dropdown_lists}>
                                <li
                                  onClick={() => {
                                    handleOpen(
                                      single_news_data?.assetname,
                                      single_news_data?.third_party_categories,
                                      single_news_data?.newsAssetId
                                    );
                                  }}
                                >
                                  カテゴリを設定
                                </li>
                                <li
                                  onClick={() => {
                                    handleDisconnectModalOpen(single_news_data?.newsAssetId);
                                  }}
                                >
                                  接続を解除する
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className={Styles.list_pagination}>
                  <div className={Pagination.tablePagination}>
                    <div className="pagination_range">
                      <span className={Pagination.start_range}> {fromData}</span> - <span className={Pagination.end_range}> {toData} </span>{' '}
                      of
                      <span className={Pagination.total_pages}> {totalItems} </span> 件中
                    </div>
                    <div className="pagination_icons">
                      <span
                        className={`${Pagination.prev_icon} ${currentPage !== undefined && currentPage <= 1 ? Pagination.disable : ''}`}
                        onClick={() => {
                          prevPaginate();
                        }}
                      >
                        <PrevIcon />
                      </span>
                      <span
                        className={`${Pagination.next_icon} ${
                          (totalPages !== undefined && totalPages == currentPage) || totalItems == 0 ? Pagination.disable : ''
                        }`}
                        onClick={() => {
                          nextPaginate();
                        }}
                      >
                        <NextIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CommonLayout>
      {editModal && (
        <HubDetailEditModal
          setEditConfirmFunction={(val: boolean) => {
            setEditConformModal(val);
          }}
          setEditFunction={(val: boolean) => {
            setEditModal(val);
          }}
        ></HubDetailEditModal>
      )}
      {editConfirmModal && (
        <>
          <div className={`${modalCommonStyles.modal_body}`}>
            <div className={modalCommonStyles.editConfirmationModal}>
              <h1 className={modalStyles.brand_title}>ハブの基本情報が更新されました。 </h1>
              <p className={modalStyles.confirmEditSecondText}>ハブ詳細ページにて変更が反映されているのをご確認ください。</p>

              <div>
                <button className={`${modalCommonStyles.editConfirmClzBtn}`} onClick={() => fetchDataAndUpdate()}>
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* <AdditionalNewsAsset isModalOpen={false} /> */}
      {/* Delete Hub Modal  */}

      <HubDeleteModal
        parentStatus={getStatus}
        isOpen={deleteModalopen}
        hubId={hubId}
        hubDeleteUpdate={hubDeleteUpdate}
        setHubDeleteUpdate={(val: any) => setHubDeleteUpdate(val)}
      />
      <AdditionalNewsAsset
        parentStatus={getNewsStatus}
        isOpen={additionalNewsModalopen}
        newsHubUpdate={newsHubUpdate}
        setHubDeleteUpdate={(val: any) => setHubDeleteUpdate(val)}
      />

      <DisconnectModal
        parentStatus={getDisconnectStatus}
        isOpen={disconnectModalopen}
        newsHubUpdate={newsHubUpdate}
        setHubDeleteUpdate={(val: any) => setHubDeleteUpdate(val)}
        gotNewsAssetId={gotNewsAssetId}
        onData={handleChildData}
      />

      {/* Disconnect Confirm and Refetch news assets list API   */}

      {/* News assets category Modal  */}
      <NewsAssetCategorySetup
        parentStatus={getStatus}
        parentCreateStatus={getParentStatus}
        isOpen={open}
        newsAssetName={newsAssetName}
        ownerCategories={ownerCategories}
        latestHubId={gotHubId}
        gotNewsAssetId={gotNewsAssetId}
        RefetchQuery={handleRefetchAfterCatSetup}
      />

      {/* NewsAssetCategorySetup confirm modal */}
      {newsAssetCategorySetupConfirm && (
        <>
          <div className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}`}>
            <div className={modalCommonStyles.modal_content}>
              <h1 className={modalStyles.brand_title}>ハブが作成されました。 </h1>
              <p className={unsubscribStyle.modal_text}>
                早速、ハブ詳細ページにてニュースアセットの設定などを <br /> 進めましょう。
              </p>

              <div className={unsubscribStyle.box}>
                <button className={`close_btn`} onClick={() => setNewsAssetCategorySetupConfirm(!newsAssetCategorySetupConfirm)}>
                  閉じる
                </button>

                <button className={`common_btn`} onClick={() => setNewsAssetCategorySetupConfirm(true)}>
                  詳細を見る
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HubTopDetail;
