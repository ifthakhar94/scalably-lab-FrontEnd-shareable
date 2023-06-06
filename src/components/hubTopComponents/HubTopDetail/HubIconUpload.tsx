import { useEffect, useState } from 'react';
import { PencilEdit } from '@/custom-icons/CustomIcons';
import Styles from './HubTopDetail.module.css';
import useMyS3Upload from '@/hooks/hubHooks/useMyS3Upload';
import profileLogo from './../../../assets/images/profile.png';
import { hubIconUpdateQuery } from '@/queries/queries';
import client from '@/GraphqlClient/client';
import { toast } from 'react-hot-toast';

export default function HubIconUpload({ hubId, hubIconURL }: any) {
  const [hubIconUrl, setHubIconUrl] = useState('');

  const { handleFileChange, result } = useMyS3Upload(['image/jpeg', 'image/png']);

  useEffect(() => {
    hubIconURL ? setHubIconUrl(hubIconURL) : setHubIconUrl(result?.Location);
    const UserToken = window.localStorage.getItem('UserToken');
    // console.log(hubId);
    client
      .mutate({
        mutation: hubIconUpdateQuery,
        variables: {
          hubId: `${hubId}`,
          hubIcon: `${hubIconUrl}`
        },
        context: {
          headers: {
            Authorization: `Bearer ${UserToken}`
          }
        }
      })
      .then((results) => {
        setHubIconUrl(results?.data?.updateHubIcon?.imageUrl);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [handleFileChange]);

  return (
    <>
      <div>
        <img src={hubIconUrl ? hubIconUrl : profileLogo.src} alt="Profile_logo" width={240} height={240} className={Styles.hubicon_img} />
      </div>
      <div className={Styles.edit_section}>
        <PencilEdit></PencilEdit>
        <input type="file" onChange={handleFileChange} />
        <p className={Styles.editPic_font}>画像を変更</p>
      </div>
    </>
  );
}
