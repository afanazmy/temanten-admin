import { useSetState } from 'ahooks';

import { useInvitationFetch } from '../invitation.api';

export const useInvitationAddController = () => {
  const [state, setState] = useSetState({ open: false });

  const fetch = useInvitationFetch();

  const onOpen = () => setState({ open: true });
  const onClose = () => setState({ open: false });

  return { state, fetch, onOpen, onClose };
};
