import antdId from 'antd/es/locale/id_ID';
import { idIDCommonLocale } from 'languages/locales/id-ID';

import { idIDSignInLocale } from 'containers/SignIn/signIn.locale';
import { idIDMasterLayoutLocale } from 'containers/MasterLayout/masterLayout.locale';
import { idIDLoadUserDataLocale } from 'containers/LoadUserData/loadUserData.locale';
import { idIDDashboardLocale } from 'containers/Dashboard/dashboard.locale';
import { idIDUserLocale } from 'containers/User/user.locale';
import { idIDInvitationLocale } from 'containers/Invitation/invitation.locale';

const IdLang = {
  messages: {
    ...idIDCommonLocale,

    // containers language
    ...idIDSignInLocale,
    ...idIDMasterLayoutLocale,
    ...idIDLoadUserDataLocale,
    ...idIDDashboardLocale,
    ...idIDUserLocale,
    ...idIDInvitationLocale,
  },
  antd: antdId,
  locale: 'idID',
};

export default IdLang;
