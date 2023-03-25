import { Result } from 'antd';
import { useCreation } from 'ahooks';
import { useAppProvider } from 'hooks';
import { getPossibleRoute } from 'helpers';
import { Navigate } from 'react-router-dom';
import { FormattedMessage } from 'components';

const LoadUserData = () => {
  const { app } = useAppProvider();
  const { permissions } = app?.user || {};

  const possibleRoute = useCreation(() => getPossibleRoute(permissions || []), [permissions]);
  console.log(possibleRoute);

  if (!possibleRoute) {
    return (
      <Result
        status="403"
        title="403"
        subTitle={<FormattedMessage id="loadUserData.You are not authorized to access this page." />}
      />
    );
  }

  return <Navigate to={possibleRoute} />;
};

export default LoadUserData;
