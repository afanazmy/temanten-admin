import { useContext } from 'react';
import { AppContext } from 'context';

export const useAppProvider = () => {
  return useContext(AppContext);
};
