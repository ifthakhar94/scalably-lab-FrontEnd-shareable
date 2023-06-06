import React, { useEffect, useRef, useState, useContext } from 'react';
import CommonLayout from '../commonLayout/CommonLayout';
import Link from 'next/link';
import Styles from './HubTopUI.module.css';
import { PlusIcon, SearchIcon, ThreeDotsIcon } from '@/custom-icons/CustomIcons';
import User from './../../../assets/images/user.png';
import Image from 'next/image';
import ConditionalCategory from '../ConditionalCategory/ConditionalCategory';
import CustomTablePagination from '../TablePagination/TablePagination';
import table_user from './../../../assets/images/table_user.png';
import commonStyles from '../../authComponents/authCommon.module.css';
import modalStyles from './Modals/FirstModal.module.css';
import unsubscribStyle from './Modals/UnsubscribeModal.module.css';
import modalCommonStyles from './../hubTopModal.module.css';
import UnsubscribeModal from './Modals/UnsubscribeModal';
import FirstModal from './Modals/FirstModal';
import { error401, hubdetails_url, hubtop_url } from '@/navCentralization/nav_url';
import FirstModalPopup2 from './Modals/FirstModalPopup2';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import RssModal from './Modals/RssModal';
import CreateHubModal from './Modals/CreateHubModal';
import HubDeleteModal from './Modals/HubDeleteModal';
import client from '@/GraphqlClient/client';
import Pagination from './../TablePagination/TablePagination.module.css';
import { NextIcon, PrevIcon } from '@/custom-icons/CustomIcons';
import { getHubListQuery } from '@/queries/queries';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { onError } from '@apollo/client/link/error';

import PulsateAnimation from '@/components/loader/PulsateAnimation';
import NewsAssetCategorySetupCompleteModal from './Modals/NewsAssetCategorySetupComplete';
import NewsAssetConnectionCompleteModal from './Modals/NewsAssetConnectionComplete';

const HubTopUI = () => {
  const [open, setOpen] = useState(false);
  const [deleteModalopen, setDeleteModalopen] = useState(false);
  const [storeStatus, setStoreStatus] = useState(false);
  const [storeData, setStoreData] = useState(false);
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = React.useState();
  const [fromData, setFromData] = useState();
  const [toData, setToData] = useState();
  const [isDeleted, setIsDeleted] = useState<string | null>('');
  const [totalItems, setTotalItems] = useState();
  const [enableDeleteConfirm, setEnableDeleteConfirm] = useState(false);
  const [hubConfirm, setHubConfirm] = useState(false);
  const [hubDeleteUpdate, setHubDeleteUpdate] = useState<'confirmed' | 'error' | 'notdone'>('notdone');
  const [loader, setLoader] = useState(true);
  const [newHubId, setNewHubId] = useState('');

  type SingleHubTypes = {
    hubname: string;
    connectassetnum: number;
    hubId: string;
    hubmembernum: number;
    huburl: string;
    publish_status: string;
    categories: string[];
  };
  const [hubList, setHubList] = React.useState<SingleHubTypes[] | undefined>();
  const [hubId, setHubId] = React.useState('');
  const handleOpen = () => setOpen(true);
  const router = useRouter();
  const gotHubId = router.query.id;

  useEffect(() => {
    refetch();

    // console.log(gotHubId);
  }, [gotHubId]);

  const handleDeleteModalOpen = (hubId: string) => {
    setDeleteModalopen(true);
    setHubId(hubId);
  };

  const formik = useFormik({
    initialValues: {
      hub_name: '',
      url: ''
    },
    onSubmit: (values) => {
      setCreateHub(false);
    },
    validationSchema: Yup.object({
      hub_name: Yup.string().required('※必須入力').max(100, '100 文字以内で設定とする'),
      url: Yup.string()
        .required('※必須入力')
        .matches(/^[0-9a-zA-Z-_]{1,}$/, 'ハイフン「-」、アンダーバー「_」のみ)')
    })
  });
  const myDivRef = useRef<HTMLDivElement>(null);
  //Hide  modal if  press outside  modal
  useEffect(() => {
    setIsDeleted(localStorage.getItem('isDeleted'));
    let defaultModal = window.localStorage.getItem('defaultModal');
    if (defaultModal == 'false') {
      setFirstModal(false);
    } else {
      setFirstModal(true);
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (myDivRef.current && !myDivRef.current.contains(event.target as Node)) {
        // Code to execute when user clicks outside the div
        setCreateHub(true);
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
        setCreateHub(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const [firstModal, setFirstModal] = useState(false);
  const [createHub, setCreateHub] = useState(false);

  const [newsAssetConnectionModal, setNewsAssetConnectionModal] = useState(false);
  const hubConfirmDialog = () => {
    setCreateHub(false);
  };
  const confirmStatusModal = () => {
    setStoreData(true);
  };
  const getStatus = (data: boolean | ((prevState: boolean) => boolean)) => {
    setOpen(data);
    setDeleteModalopen(data);
  };

  const getParentStatus = (data: boolean | ((prevState: boolean) => boolean)) => {
    // console.log('data', data);
    if (data == true) {
      setHubConfirm(true);
    } else {
      setHubConfirm(false);
    }
  };

  // to call this list when any hub is deleted
  useEffect(() => {
    if (hubDeleteUpdate == 'confirmed') {
      setEnableDeleteConfirm(true);
    }
  }, [hubDeleteUpdate]);

  //Refresh data  api call
  let UserToken = null;
  if (typeof window !== 'undefined') {
    UserToken = window.localStorage.getItem('UserToken');
  }

  const { loading, error, data, refetch } = useQuery(getHubListQuery, {
    context: {
      headers: {
        authorization: 'Bearer ' + UserToken
      }
    }
  });
  useEffect(() => {
    if (data && data.hubLists && data.hubLists.hublist) {
      setHubList(data.hubLists.hublist);
      setTotalItems(data.hubLists.pagination.totalItems);
      setTotalPages(data.hubLists.pagination.totalPages);
      setCurrentPage(data.hubLists.pagination.currentPage);
      setFromData(data.hubLists.pagination.fromData);
      setToData(data.hubLists.pagination.toData);
      setEnableDeleteConfirm(false);
      setHubDeleteUpdate('notdone');
      setHubConfirm(false);
      setHubConfirm(false);
      setLoader(false);
    }
  }, [data]);

  if (error) {
    // console.log('Error Testig', error.graphQLErrors[0].code); // https://myhub/834038343
  }

  {
    // error && router.push(error401);
  }

  // {
  //   error?.graphQLErrors.map(({ message }, i) => console.log('error message', message));
  // }

  // prev paginate hub list
  const prevPaginate = () => {
    const UserToken = window.localStorage.getItem('UserToken');
    let prevPageNumber = currentPage !== undefined ? currentPage - 1 : undefined;
    client.query({
      query: getHubListQuery,
      variables: {
        pageNumber: 1
      },
      context: {
        headers: {
          Authorization: `Bearer ${UserToken}`
        }
      }
    });
    client
      .query({
        query: getHubListQuery,
        variables: {
          pageNumber: prevPageNumber
        },
        context: {
          headers: {
            Authorization: `Bearer ${UserToken}`
          }
        }
      })
      .then((result) => {
        setHubList(result.data.hubLists.hublist);
        setTotalItems(result.data.hubLists.pagination.totalItems);
        setTotalPages(result.data.hubLists.pagination.totalPages);
        setCurrentPage(result.data.hubLists.pagination.currentPage);
        setFromData(result.data.hubLists.pagination.fromData);
        setToData(result.data.hubLists.pagination.toData);
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  //Next paginate hub list
  const nextPaginate = () => {
    const UserToken = window.localStorage.getItem('UserToken');
    let nextPage = currentPage !== undefined ? currentPage + 1 : undefined;

    client
      .query({
        query: getHubListQuery,
        variables: {
          pageNumber: nextPage
        },
        context: {
          headers: {
            Authorization: `Bearer ${UserToken}`
          }
        }
      })
      .then((result) => {
        setHubList(result.data.hubLists.hublist);
        setTotalItems(result.data.hubLists.pagination.totalItems);
        setTotalPages(result.data.hubLists.pagination.totalPages);
        setCurrentPage(result.data.hubLists.pagination.currentPage);
        setFromData(result.data.hubLists.pagination.fromData);
        setToData(result.data.hubLists.pagination.toData);

        // setHubList(mypurposeList);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  // After creating hub push to created hub details from confirmation modal
  const handleSpecificHubDetais = () => {
    refetch().then((response) => {
      router.push(`${hubdetails_url}/${response.data.hubLists.hublist[0].hubId}`);
    });
  };

  return (
    <>
      <CommonLayout>
        {/* BreadCrumb   */}
        <div className={Styles.section_breadcrumb}>
          <ul>
            <li>
              <Link href="#">ハブ管理ページ</Link>
            </li>
          </ul>
        </div>

        {/* Hub List  */}
        <section className={Styles.hub_list}>
          <div className={Styles.hub_list_title}>
            <h2>ハブ一覧</h2>
            <p>あなたが管理中、管理チームメンバーとなっているハブ一覧です。</p>
          </div>

          {loader == true && <PulsateAnimation />}
          {loader == false && (
            <div className={Styles.hub_list_inner}>
              {/* Create Hub  */}
              <div className={`${Styles.hub_list_item} ${Styles.hub_list_create}`}>
                <Link href="#" onClick={handleOpen}>
                  <div className={Styles.hub_list_create_btn}>
                    <PlusIcon />
                    <p>新規作成</p>
                  </div>
                </Link>
              </div>

              {/* Hub List Single Item  */}
              {hubList &&
                hubList.map((single_hub: SingleHubTypes, index) => {
                  return (
                    <div className={Styles.hub_list_item} key={index}>
                      <div className={Styles.list_card_title}>
                        <Image src={User} alt="User Image" />
                        <h2>
                          <Link href={`${hubdetails_url}/${single_hub.hubId}`}>{single_hub.hubname} </Link>
                        </h2>
                        <div className={Styles.card_dots}>
                          <ThreeDotsIcon />
                          <div
                            className={Styles.hub_card_delete}
                            onClick={() => {
                              handleDeleteModalOpen(single_hub.hubId);
                            }}
                          >
                            <h4>解除する</h4>
                          </div>
                        </div>
                      </div>
                      <Link href={`${hubdetails_url}/${single_hub.hubId}`}>
                        <div className={Styles.hub_list_member_count}>
                          <p>メンバー</p>
                          <h6>{single_hub.hubmembernum}人</h6>
                        </div>
                        <div className={Styles.range_and_assets}>
                          <p>公開範囲</p>
                          <p>接続アセット数</p>
                        </div>
                        <div className={Styles.public_and_assets_value}>
                          <p>{single_hub.publish_status}</p>
                          <p>{single_hub.connectassetnum}</p>
                        </div>
                        <div className={Styles.card_category}>
                          <div className={Styles.card_category_title}>
                            <h4>カテゴリー</h4>
                          </div>
                          <div className={Styles.card_category_items}>
                            <ConditionalCategory categories={single_hub.categories} />
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>
          )}

          <div className={Styles.list_pagination}>
            <div className={Pagination.tablePagination}>
              <div className="pagination_range">
                <span className={Pagination.start_range}> {fromData}</span> - <span className={Pagination.end_range}> {toData} </span> of
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
        </section>

        {/* Subscribed Hub List and Search  */}
        <section className={Styles.sub_hub_list}>
          <div className={Styles.sub_hub_list_title}>
            <h2>購読しているハブ一覧</h2>

            <p>あなたが購読しているハブの一覧です。</p>
          </div>
          <div className={Styles.sub_hub_list_search}>
            <SearchIcon />
            <input type="text" placeholder="検索する" />
          </div>
          <div className={Styles.sub_hub_list_table}>
            <table>
              <thead>
                <tr>
                  <th>ハブ名称</th>
                  <th>オーナー</th>
                  <th>カテゴリ</th>
                  <th>ステータス</th>
                  <th>メンバー</th>
                  <th>接続アセット数</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className={Styles.logo_name}>
                      <Image src={table_user} alt="Table User Image" />
                      <h6>Cardano</h6>
                    </div>
                  </td>

                  <td>
                    <span className={Styles.table_eco_id}> @ecomedia_id </span>
                  </td>

                  <td>
                    <span className={Styles.table_cat}>カテゴリ1</span>
                    <span className={Styles.table_cat}>カテゴリゴリゴリゴリ2</span>
                    <span className={Styles.table_cat}>カテゴリ3</span>
                    <span className={Styles.table_cat}>カテゴリ4</span>
                    <span className={Styles.table_cat_dots}>...</span>
                  </td>

                  <td>公開中</td>

                  <td>102人</td>
                  <td>82アセット</td>
                  <td className={Styles.TableThreeDots}>
                    <ThreeDotsIcon />
                    <div className={Styles.unlock_hover}>
                      <h4>解除する</h4>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className={Styles.logo_name}>
                      <Image src={table_user} alt="Table User Image" />
                      <h6>Cardano</h6>
                    </div>
                  </td>

                  <td>
                    <span className={Styles.table_eco_id}> @ecomedia_id </span>
                  </td>

                  <td>
                    <span className={Styles.table_cat}>カテゴリ1</span>
                    <span className={Styles.table_cat}>カテゴリゴリゴリゴリ2</span>
                    <span className={Styles.table_cat}>カテゴリ3</span>
                    <span className={Styles.table_cat}>カテゴリ4</span>
                    <span className={Styles.table_cat_dots}>...</span>
                  </td>

                  <td>公開中</td>

                  <td>102人</td>
                  <td>82アセット</td>
                  <td className={Styles.TableThreeDots}>
                    <ThreeDotsIcon />
                    <div className={Styles.unlock_hover}>
                      <h4>解除する</h4>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={Styles.table_pagination}>
              <CustomTablePagination />
            </div>
          </div>
          {/* First Modal */}
          <FirstModal />
          {/* First Modal popup 2 */}
          <FirstModalPopup2 />
          {/* Generate Rss Modal */}
          <RssModal />
          {/* Create Hub Modal */}
          <CreateHubModal
            parentStatus={getStatus}
            parentCreateStatus={getParentStatus}
            // parentDataStoreStatus={getStoreStatus}
            isOpen={open}
          />
          <HubDeleteModal
            parentStatus={getStatus}
            isOpen={deleteModalopen}
            hubId={hubId}
            hubDeleteUpdate={hubDeleteUpdate}
            setHubDeleteUpdate={(val: any) => setHubDeleteUpdate(val)}
          />
          {/* <HubDeleteConfirmModal parentStatus={getDeleteConfirmStatus} isOpen={deleteConfirmModalopen} /> */}
          {/*  Hub Confirm Modal */}
          {/* Unsubscribe */}
          <UnsubscribeModal />
        </section>
      </CommonLayout>
      {/* Hub  delete confirm  modal */}
      {enableDeleteConfirm && (
        <>
          <div className={modalCommonStyles.deleteHubConfirmation}>
            <div className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}`}>
              <div className={modalCommonStyles.modal_content}>
                <h1 className={modalStyles.brand_title}>ハブが削除されました。 </h1>
                <p className={unsubscribStyle.modal_text}>一覧画面より、対象のハブが削除されているのをご確認ください。</p>

                <div>
                  <button className={`${modalCommonStyles.delete_confirm_close_btn}`} onClick={() => refetch()}>
                    閉じる
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Create Hub confirm modal */}
      {hubConfirm && (
        <>
          <div className={`${modalCommonStyles.modal_body} ${modalCommonStyles.add_hub_confirm_modal_body}`}>
            <div className={modalCommonStyles.modal_content} ref={myDivRef}>
              <h1 className={modalStyles.brand_title}>ハブが作成されました。 </h1>
              <p className={unsubscribStyle.modal_text}>
                早速、ハブ詳細ページにてニュースアセットの設定などを <br /> 進めましょう。
              </p>

              <div className={unsubscribStyle.box}>
                <button className={`close_btn`} onClick={() => refetch()}>
                  閉じる
                </button>

                <button className={`common_btn`} onClick={handleSpecificHubDetais}>
                  詳細を見る
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <NewsAssetCategorySetupCompleteModal isOpen={false} />

      <NewsAssetConnectionCompleteModal isOpen={false} />
    </>
  );
};

export default HubTopUI;
