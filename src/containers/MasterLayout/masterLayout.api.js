import { useAPI } from 'hooks';
import { endpoints } from 'configuration';

export const useMasterLayoutFetch = () => {
  const getAuthUser = useAPI(endpoints.getAuthUser);
  return { getAuthUser };
};
