import { useRequest } from 'ahooks';
import { useInvitationFetch } from 'containers/Invitation/invitation.api';

export const useInvitationImportDrawerController = ({ onClose, refresh }) => {
  const fetch = useInvitationFetch();

  const { run: getTemplateInvitation, loading: loadingGetTemplateInvitation } = useRequest(
    fetch.getTemplateInvitation,
    {
      manual: true,
      onSuccess: (response) => {
        const url = URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'invitation_template.xlsx';
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      },
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
