/// <reference types="next/image-types/global" />

import { NextPage } from 'next';
import { ReactNode } from 'react';

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

interface WithChildren {
  children: ReactNode;
}

type NextPageWithLayout<T = Record<string, unknown>> = NextPage<T> & {
  PageLayout?: ComponentType<InsHTMLAttributes<unknown>>;
};

interface AuthState {
  email: string;
  username: string;
  profileImage: string;
  isAuthorized: boolean;
  isOnline: boolean;
  isLoading: boolean;
}
