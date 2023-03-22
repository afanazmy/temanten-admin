import antdId from 'antd/es/locale/id_ID';
import { idIDCommonLocale } from 'languages/locales/id-ID';

import { idIDSignInLocale } from 'containers/SignIn/signIn.locale';
import { idIDMasterLayoutLocale } from 'containers/MasterLayout/masterLayout.locale';
import { idIDLoadUserDataLocale } from 'containers/LoadUserData/loadUserData.locale';

const IdLang = {
  messages: {
    ...idIDCommonLocale,

    // containers language
    ...idIDSignInLocale,
    ...idIDMasterLayoutLocale,
    ...idIDLoadUserDataLocale,
  },
  antd: antdId,
  locale: 'idID',
};

export default IdLang;
