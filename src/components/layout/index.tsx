import { ThemeProvider } from '@material-ui/core';
import theme from 'material-ui';
import { WithChildren } from 'next-env';
import React, { FC } from 'react';

const Layout: FC<WithChildren> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Layout;
