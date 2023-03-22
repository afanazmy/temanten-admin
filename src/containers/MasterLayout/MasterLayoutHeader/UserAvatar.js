import { useRequest } from 'ahooks';
import { endpoints } from 'configuration';
import { stringToHslColor } from 'helpers';
import { FormattedMessage } from 'components';
import { useAPI, useAppProvider } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Menu, Popover } from 'antd';

import { onFinallyLogout } from '../masterLayout.function';

const UserPopup = () => {
  const navigate = useNavigate();

  const API = { getLogout: useAPI(endpoints.getLogout) };
  const { run: getLogout, loading: loadingLogout } = useRequest(API.getLogout, {
    manual: true,
    onFinally: () => onFinallyLogout({ navigate }),
  });

  const keys = { logout: 'logout' };
  const items = [
    {
      key: keys.logout,
      label: (
        <Button type="text" onClick={() => getLogout()} loading={loadingLogout}>
          <FormattedMessage id="signIn.Sign Out" />
        </Button>
      ),
    },
  ];

  return <Menu items={items} />;
};

const UserAvatar = () => {
  const { app } = useAppProvider();
  const { user } = app || {};

  return (
    <Popover content={<UserPopup />} placement="bottomRight" trigger={['click']}>
      <Avatar shape="square" size="large" style={{ backgroundColor: stringToHslColor(user?.username) }}>
        {user?.username?.charAt?.(0)}
      </Avatar>
    </Popover>
  );
};

export default UserAvatar;
