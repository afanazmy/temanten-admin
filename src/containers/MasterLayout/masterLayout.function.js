import { paths } from 'routes';
import { useAppProvider } from 'hooks';
import { FormattedMessage } from 'components';
import { removeDataForLogout } from 'helpers';
import { LocalStorage, storageKey } from 'utils';
import { useCreation, useMemoizedFn, useRequest } from 'ahooks';

import { useMasterLayoutFetch } from './masterLayout.api';
import { useRef } from 'react';

export const onFinallyGetAuthUser = ({ setApp, data }) => {
  if (!data?.result) return;
  setApp({ user: data?.result, language: data?.result?.language });
  LocalStorage.setItem(storageKey.language, data?.result?.language);
};

export const onFinallyLogout = ({ navigate }) => {
  removeDataForLogout();
  navigate?.(paths.signIn);
};

export const useMasterLayoutController = ({ title }) => {
  const { setApp } = useAppProvider();
  const fetch = useMasterLayoutFetch();

  const drawer = useRef();

  const { loading: loadingGetAuthUser } = useRequest(fetch.getAuthUser, {
    onFinally: (_, data) => onFinallyGetAuthUser({ setApp, data }),
  });

  const breadcrumbItems = useCreation(() => {
    if (!title) return [{ title: 'Home' }];
    return [{ title: 'Home' }, { title: <FormattedMessage id={title} /> }];
  }, [title]);

  const onOpen = useMemoizedFn(() => {
    drawer?.current?.onOpen?.();
  });

  const onClose = useMemoizedFn(() => {
    drawer?.current?.onClose?.();
  });

  return { loadingGetAuthUser, breadcrumbItems, drawer, onOpen, onClose };
};
