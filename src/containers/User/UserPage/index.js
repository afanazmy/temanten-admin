import { paths } from 'routes';
import { usePage } from 'hooks';
import { FormattedMessage } from 'components';

const UserPage = () => {
  usePage({ title: 'user.User', activeMenu: paths.user });

  return (
    <h1>
      <FormattedMessage id="user.User" />
    </h1>
  );
};

export default UserPage;
