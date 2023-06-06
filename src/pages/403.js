import React from 'react';
import { useRouter } from 'next/router';
// import Styles from './../styles/global.css';
const Error404 = () => {
  const router = useRouter();
  function goBack() {
    router.back();
  }
  return (
    <div className="error_403">
      <h2>403</h2>
      <h5>Access Denied / Forbidden</h5>
      <button onClick={goBack}>Go back</button>
    </div>
  );
};

export default Error404;
