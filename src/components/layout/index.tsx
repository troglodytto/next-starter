import { WithChildren } from 'next-env';
import React, { FC } from 'react';
import AppHeader from './header';

const Layout: FC<WithChildren> = ({ children }) => {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
};

export default Layout;
