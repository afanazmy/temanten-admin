import antdId from 'antd/es/locale/id_ID';
import { idIDCommonLocale } from 'languages/locales/id-ID';

import { idIDSignInLocale } from 'containers/SignIn/signIn.locale';
import { idIDMasterLayoutLocale } from 'containers/MasterLayout/masterLayout.locale';
import { idIDLoadUserDataLocale } from 'containers/LoadUserData/loadUserData.locale';
import { idIDDashboardLocale } from 'containers/Dashboard/dashboard.locale';
import { idIDUserLocale } from 'containers/User/user.locale';

const IdLang = {
  messages: {
    ...idIDCommonLocale,

    // containers language
    ...idIDSignInLocale,
    ...idIDMasterLayoutLocale,
    ...idIDLoadUserDataLocale,
    ...idIDDashboardLocale,
    ...idIDUserLocale,
  },
  antd: antdId,
  locale: 'idID',
};

export default IdLang;
