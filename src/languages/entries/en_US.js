import antdEn from 'antd/es/locale/en_US';
import { enUSCommonLocale } from 'languages/locales/en-US';

import { enUSSignInLocale } from 'containers/SignIn/signIn.locale';
import { enUSMasterLayoutLocale } from 'containers/MasterLayout/masterLayout.locale';
import { enUSLoadUserDataLocale } from 'containers/LoadUserData/loadUserData.locale';
import { enUSDashboardLocale } from 'containers/Dashboard/dashboard.locale';
import { enUSUserLocale } from 'containers/User/user.locale';
import { enUSInvitationLocale } from 'containers/Invitation/invitation.locale';

const EnLang = {
  messages: {
    ...enUSCommonLocale,

    // containers language
    ...enUSSignInLocale,
    ...enUSMasterLayoutLocale,
    ...enUSLoadUserDataLocale,
    ...enUSDashboardLocale,
    ...enUSUserLocale,
    ...enUSInvitationLocale,
  },
  antd: antdEn,
  locale: 'en-US',
};

export default EnLang;
