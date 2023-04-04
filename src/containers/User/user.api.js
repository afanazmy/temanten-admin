import { useAPI } from 'hooks';
import { withParams } from 'utils';
import { endpoints } from 'configuration';

export const useUserFetch = ({ id } = {}) => {
  const getUsers = useAPI(endpoints.getUsers);
  const getUser = useAPI(withParams(endpoints.getUser, { id }));
  const postUser = useAPI(endpoints.postUser, { method: 'post', showMessage: true });
  const putUser = useAPI(withParams(endpoints.putUser, { id }), { method: 'put', showMessage: true });
  const activateUser = useAPI(withParams(endpoints.activateUser, { id }), { method: 'put', showMessage: true });
  const deactivateUser = useAPI(withParams(endpoints.deactivateUser, { id }), { method: 'put', showMessage: true });
  const activateUsers = useAPI(endpoints.activateUsers, { method: 'put', showMessage: true });
  const deactivateUsers = useAPI(endpoints.deactivateUsers, { method: 'put', showMessage: true });

  return {
    getUsers,
    getUser,
    postUser,
    putUser,
    activateUser,
    deactivateUser,
    activateUsers,
    deactivateUsers,
  };
};
