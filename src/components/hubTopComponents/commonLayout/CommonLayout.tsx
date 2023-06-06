import React, { ReactNode, useEffect } from 'react';
import EcoMedia_logo from './../../../assets/images/EcoMedia_logo.png';
import Styles from './HubTopLayout.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GearIcon, LeftLayoutIcon1, TableIcon, UserIcon1 } from '@/custom-icons/CustomIcons';
import Head from 'next/head';
import { Home_url, hubtop_url, login_url, news_asset } from '@/navCentralization/nav_url';
import { IconButton, MenuItem, Menu } from '@mui/material';

type ComponentProps = {
  children: ReactNode;
};
// const HubTopLayout = ({ children }: ComponentProps) => {
const CommonLayout = ({ children }: ComponentProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [ecomediaID, setEcomediaID] = React.useState<null | string>(null);

  useEffect(() => {
    let ecomedia_id = window.localStorage.getItem('ecomedia_id');
    setEcomediaID(JSON.parse(ecomedia_id as string));
  }, []);

  const open = Boolean(anchorEl);
  const handleGearClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleGearClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();
  const handleLogOut = () => {
    window.localStorage.removeItem('UserToken');
    window.localStorage.removeItem('User_Data');
    window.localStorage.removeItem('LoginEmail');
    window.localStorage.removeItem('ecomedia_id');
    router.push(login_url);
  };

  const isActive = (path: string) => {
    return router.pathname === path ? 'common_nav_active' : '';
  };
  return (
    <>
      <Head>
        <title>HubTop</title>
      </Head>
      {/* Section Header  */}
      <header className={Styles.hubtop_header}>
        <div className={Styles.hubtop_logo}>
          <Link href={Home_url}>
            <Image src={EcoMedia_logo} alt="EcoMedia_logo" width={111} height={20} />
          </Link>
        </div>
        <div className={Styles.hubtop_user_settings}>
          <div className={Styles.user_icon}>
            {/* <Image src={usericon} alt="usericon" width={26} height={23} /> */}
            <UserIcon1 />
          </div>
          <div className={Styles.setting_icon}>
            {/* <GearIcon /> */}
            <IconButton
              onClick={handleGearClick}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <GearIcon />
            </IconButton>
          </div>
        </div>
      </header>

      {/* Main Layout   */}
      <main className={Styles.main_layout}>
        <div className={Styles.main_layout_wrapper}>
          <div className={Styles.left_layout}>
            <ul className={Styles.left_layout_nav}>
              {/* className={Styles.active} */}
              <li className={isActive(hubtop_url)}>
                <LeftLayoutIcon1 />
                <Link href={hubtop_url} className={Styles.menuLinkText}>
                  ハブ
                </Link>
              </li>
              <li className={isActive(news_asset)}>
                <TableIcon />
                <Link href={news_asset} className={Styles.menuLinkText}>
                  ニュースアセット
                </Link>
              </li>
            </ul>
          </div>
          <div className={Styles.right_layout}>{children}</div>
        </div>
      </main>
    </>
  );
};

export default CommonLayout;
