import '@/styles/globals.css';
import '@/styles/utility.css';
import '@/styles/styleVariables.css';
// import { Roboto } from 'next/font/google';

import type { AppProps } from 'next/app';
import { LicenseInfo } from '@mui/x-license-pro';
import { ApolloProvider } from '@apollo/client';
import client from '@/GraphqlClient/client';
import { Toaster } from 'react-hot-toast';
import { persistor, store } from '@/redux/app/store';
import { Provider } from 'react-redux';
import { appWithI18Next } from 'ni18n';
import { ni18nConfig } from '../../ni18n.config';
import { PersistGate } from 'redux-persist/integration/react';

LicenseInfo.setLicenseKey(process.env.NEXT_PUBLIC_LICENSE_KEY as string);

// const roboto = Roboto({
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
//   style: ['normal', 'italic'],
//   subsets: ['latin']
// });

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}></PersistGate>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
        <Toaster />
      </ApolloProvider>
    </Provider>
  );

  // <Component {...pageProps} />;
}
export default appWithI18Next(App, ni18nConfig);
