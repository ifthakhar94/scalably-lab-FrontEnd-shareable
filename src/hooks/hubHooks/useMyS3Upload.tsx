import React, { useRef } from 'react';
import { S3 } from 'aws-sdk';
import { ChangeEventHandler, useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
const useMyS3Upload = (givenAllowedTypes: any, singleUpload: boolean = true) => {
  const s3 = new S3({
    accessKeyId: process.env.NEXT_PUBLIC_S3_UPLOAD_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_UPLOAD_SECRET,
    region: process.env.NEXT_PUBLIC_S3_UPLOAD_REGION
  });

  const [file, setFile] = useState<File | null>(null);
  const [upload, setUpload] = useState<S3.ManagedUpload | null>(null);
  const [result, setResult] = useState<any | undefined>(undefined);
  const [error, setError] = useState<any | undefined>(undefined);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setFile(e.target.files![0]);
  };

  useEffect(() => {
    return upload?.abort();
  }, []);

  useEffect(() => {
    // progress.set(0);
    setUpload(null);
  }, [file]);

  const allowedTypes = Array.isArray(givenAllowedTypes) && givenAllowedTypes.length == 0 ? ['image/jpeg', 'image/png'] : givenAllowedTypes;

  const doValidate = (file: any) => {
    if (!file) return;
    if (allowedTypes.indexOf(file.type) == -1) {
      toast.error('ファイルの拡張子は.jpg、.pngのどちらかのものを設定してください');
      return false;
    }

    if (file?.size > 2000000) {
      toast.error('ファイルサイズは2MB以内で設定してください');
      return false;
    }

    return true;
  };

  const doUpload = async (file: any) => {
    const randKey = uuidv4();
    const fileRandName = `${randKey}${file?.name}`;

    const params = {
      Bucket: `${process.env.NEXT_PUBLIC_S3_UPLOAD_BUCKET}`,
      Key: fileRandName,
      Body: file
    };

    try {
      const upload = s3.upload(params);

      setUpload(upload);
      upload.on('httpUploadProgress', (p) => {});
      const uploadResult = await upload.promise();

      setResult(uploadResult);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    // only upload files that have been validated
    if (doValidate(file)) {
      doUpload(file);
    }

    return;
  }, [file]);

  //   useEffect(() => {
  //     console.log('Result', result);
  //   }, [result]);
  //   useEffect(() => {
  //     console.log('Error ', error);
  //   }, [error]);

  return { file, setFile, upload, setUpload, result, setResult, error, setError, handleFileChange };
};

export default useMyS3Upload;
