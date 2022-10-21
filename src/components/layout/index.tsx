import { WithChildren } from 'next-env';
import { ToastContainer } from 'react-toastify';
import React, { FC } from 'react';
import AppHeader from './header';
import 'react-toastify/dist/ReactToastify.css';

const Layout: FC<WithChildren> = ({ children }) => {
  return (
    <>
      <AppHeader />
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        newestOnTop={false}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={3}
      />
    </>
  );
};

export default Layout;
