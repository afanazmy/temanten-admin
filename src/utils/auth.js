import { LocalStorage, storageKey } from 'utils';

export const getToken = () => {
  const token = LocalStorage.getItem(storageKey.accessToken);
  return token?.token;
};

export const isLogin = () => {
  return !!getToken();
};
