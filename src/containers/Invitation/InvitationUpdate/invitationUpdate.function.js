import { useSetState } from 'ahooks';

import { useInvitationFetch } from '../invitation.api';

export const useInvitationUpdateController = () => {
  const [state, setState] = useSetState({ open: false, record: undefined, id: undefined });

  const { id } = state;
  const fetch = useInvitationFetch({ id: id });

  const onOpen = (record) => setState({ open: true, record, id: record.id });
  const onClose = () => setState({ open: false, record: undefined, id: undefined });

  return { state, fetch, onOpen, onClose };
};
