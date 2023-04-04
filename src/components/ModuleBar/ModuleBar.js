import Icon from '@ant-design/icons';
import { CircleNotch, Funnel, Plus } from 'assets';
import { Button, Space, theme } from 'antd';

import Search from './Search';

const ModuleBar = ({ addPermission, loading }) => {
  const { token } = theme.useToken();
  const { ModuleBar } = token || {};

  return (
    <div className="module-bar" style={{ backgroundColor: ModuleBar?.colorBgContainer }}>
      <Space size={8}>
        {addPermission ? <Button className="btn-snow-ui" type="text" icon={<Icon component={Plus} />} /> : null}
        <Button className="btn-snow-ui" type="text" icon={<Icon component={Funnel} />} />
        {loading ? <Icon component={CircleNotch} className="anticon-spin" /> : null}
      </Space>

      <Search />
    </div>
  );
};

export default ModuleBar;
