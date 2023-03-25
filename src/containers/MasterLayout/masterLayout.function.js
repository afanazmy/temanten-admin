import { paths } from 'routes';
import { useAppProvider } from 'hooks';
import { FormattedMessage } from 'components';
import { removeDataForLogout } from 'helpers';
import { LocalStorage, storageKey } from 'utils';
import { useCreation, useRequest } from 'ahooks';

import { useMasterLayoutFetch } from './masterLayout.api';

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

  const { loading: loadingGetAuthUser } = useRequest(fetch.getAuthUser, {
    onFinally: (_, data) => onFinallyGetAuthUser({ setApp, data }),
  });

  const breadcrumbItems = useCreation(() => {
    if (!title) return [{ title: 'Home' }];
    return [{ title: 'Home' }, { title: <FormattedMessage id={title} /> }];
  }, [title]);

  return { loadingGetAuthUser, breadcrumbItems };
};
