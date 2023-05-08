import { useSetState } from 'ahooks';

import { useUserFetch } from '../user.api';

export const useUserAddController = () => {
  const [state, setState] = useSetState({ open: false });

  const fetch = useUserFetch();

  const onOpen = () => setState({ open: true });
  const onClose = () => setState({ open: false });

  return { state, fetch, onOpen, onClose };
};
