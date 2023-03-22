import { paths } from 'routes';
import { removeDataForLogout } from 'helpers';
import { LocalStorage, storageKey } from 'utils';

export const onFinallyGetAuthUser = ({ setApp, data }) => {
  if (!data?.result) return;
  setApp({ user: data?.result, language: data?.result?.language });
  LocalStorage.setItem(storageKey.language, data?.result?.language);
};

export const onFinallyLogout = ({ navigate }) => {
  removeDataForLogout();
  navigate?.(paths.signIn);
};
