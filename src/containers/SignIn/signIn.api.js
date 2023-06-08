import { useAPI } from 'hooks';
import { endpoints } from 'configuration';

const useSignInFetch = () => {
  const getSetupWizards = useAPI(endpoints.getSetupWizards);
  const postSetupWizard = useAPI(endpoints.postSetupWizard, { method: 'post', showMessage: true });
  const postSignIn = useAPI(endpoints.signIn, { method: 'post' });
  const getSetting = useAPI(endpoints.getSetting);

  return { getSetupWizards, postSetupWizard, postSignIn, getSetting };
};

export default useSignInFetch;
