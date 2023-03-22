import { useAPI } from 'hooks';
import { endpoints } from 'configuration';

const useSignInFetch = () => {
  const getSetupWizards = useAPI(endpoints.getSetupWizards);
  const postSetupWizard = useAPI(endpoints.postSetupWizard, { method: 'post', showMessage: true });
  const postSignIn = useAPI(endpoints.signIn, { method: 'post' });

  return { getSetupWizards, postSetupWizard, postSignIn };
};

export default useSignInFetch;
