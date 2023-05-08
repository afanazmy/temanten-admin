import { useSetState } from 'ahooks';

import { useUserFetch } from '../user.api';

export const useUserUpdateController = () => {
  const [state, setState] = useSetState({ open: false, record: undefined, id: undefined });

  const { id } = state;
  const fetch = useUserFetch({ id: id });

  const onOpen = (record) => setState({ open: true, record, id: record.id });
  const onClose = () => setState({ open: false, record: undefined, id: undefined });

  return { state, fetch, onOpen, onClose };
};
