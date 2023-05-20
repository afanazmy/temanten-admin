import { useAPI } from 'hooks';
import { withParams } from 'utils';
import { endpoints } from 'configuration';

export const useInvitationFetch = ({ id } = {}) => {
  const getInvitations = useAPI(endpoints.getInvitations);
  const getInvitation = useAPI(withParams(endpoints.getInvitation, { id }));
  const postInvitation = useAPI(endpoints.postInvitation, { method: 'post', showMessage: true });
  const putInvitation = useAPI(withParams(endpoints.putInvitation, { id }), { method: 'put', showMessage: true });
  const activateInvitation = useAPI(withParams(endpoints.activateInvitation, { id }), {
    method: 'put',
    showMessage: true,
  });
  const deactivateInvitation = useAPI(withParams(endpoints.deactivateInvitation, { id }), {
    method: 'put',
    showMessage: true,
  });
  const activateInvitations = useAPI(endpoints.activateInvitations, { method: 'put', showMessage: true });
  const deactivateInvitations = useAPI(endpoints.deactivateInvitations, { method: 'put', showMessage: true });
  const getTemplateInvitation = useAPI(endpoints.downloadTemplateInvitation, { responseType: 'blob' });
  const postTemplateInvitation = useAPI(endpoints.importInvitation, { method: 'post', showMessage: true });

  return {
    getInvitations,
    getInvitation,
    postInvitation,
    putInvitation,
    activateInvitation,
    deactivateInvitation,
    activateInvitations,
    deactivateInvitations,
    getTemplateInvitation,
    postTemplateInvitation,
  };
};
