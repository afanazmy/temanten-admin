import { useRequest } from 'ahooks';
import { downloadBlob } from 'helpers';

import { useInvitationFetch } from 'containers/Invitation/invitation.api';

export const useInvitationImportDrawerController = ({ onClose, refresh }) => {
  const fetch = useInvitationFetch();

  const { run: getTemplateInvitation, loading: loadingGetTemplateInvitation } = useRequest(
    fetch.getTemplateInvitation,
    {
      manual: true,
      onSuccess: (response) => downloadBlob(response, { fileName: 'invitation_template.xlsx' }),
    },
  );

  const { run: postTemplateInvitation, loading: loadingPostTemplateInvitation } = useRequest(
    fetch.postTemplateInvitation,
    {
      manual: true,
      onSuccess: () => {
        refresh?.();
        onClose?.();
      },
    },
  );

  const onFinish = (values) => {
    const form = new FormData();
    form.append('file', values.files?.[0]);
    form.append('type', values?.replace ? 'replace' : 'add');

    postTemplateInvitation(form);
  };

  return { getTemplateInvitation, loadingGetTemplateInvitation, onFinish, loadingPostTemplateInvitation };
};
