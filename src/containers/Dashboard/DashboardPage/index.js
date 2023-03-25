import { paths } from 'routes';
import { usePage } from 'hooks';
import { FormattedMessage } from 'components';

const DashboardPage = () => {
  usePage({ title: 'dashboard.Dashboard', activeMenu: paths.dashboard });

  return (
    <h1>
      <FormattedMessage id="dashboard.Dashboard" />
    </h1>
  );
};

export default DashboardPage;
