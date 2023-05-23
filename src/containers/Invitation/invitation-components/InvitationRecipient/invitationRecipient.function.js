import { useMemoizedFn, useRequest } from 'ahooks';

import { useInvitationFetch } from 'containers/Invitation/invitation.api';

export const useInvitationRecipientController = ({ refresh }) => {
  const fetch = useInvitationFetch();

  const { run: putSentInvitation, loading: loadingSentInvitation } = useRequest(fetch.putSentInvitation, {
    manual: true,
    onSuccess: () => refresh?.(),
  });

  const onSent = useMemoizedFn((e, id) => {
    e?.stopPropagation?.();
    if (loadingSentInvitation) return;
    putSentInvitation({ id: [id] });
  });

  return { onSent, loadingSentInvitation };
};
