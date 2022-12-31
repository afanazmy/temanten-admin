import { createContext } from 'react';
import { appConfig } from 'configuration';
import { LocalStorage, storageKey } from 'utils';

export const initialContextValues = {
  app: {
    user: null,
    language: LocalStorage.getItem(storageKey.language, appConfig.defaultLanguage),
    title: null,
    activeMenu: null,
    openKeys: undefined,
  },
  setApp: (app) => {},
};

export const AppContext = createContext(initialContextValues.app);
export const AppProvider = AppContext.Provider;
