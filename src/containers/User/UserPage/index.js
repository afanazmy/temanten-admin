import { paths } from 'routes';
import { usePage } from 'hooks';
import { ModuleBar } from 'components';

const UserPage = () => {
  usePage({ title: 'user.User', activeMenu: paths.user });

  return (
    <h1>
      <ModuleBar addPermission={true} />
    </h1>
  );
};

export default UserPage;
