import { useContext, useMemo } from 'react';
import { GlobalModalContext } from 'components/layout/modal';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';
import NProgress from 'nprogress';

export const useProgress = () => {
  const onProgressStart = () => NProgress.start();
  const onProgressEnd = () => NProgress.done();

  useMemo(onProgressStart, []);

  return { onProgressStart, onProgressEnd };
};

export const useModal = () => {
  const context = useContext(GlobalModalContext);
  return context;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
