import Icon from '@ant-design/icons';
import { Button, Space, theme } from 'antd';
import { CircleNotch, Funnel, Plus } from 'assets';

import Search from './Search';

const ModuleBar = ({ canAdd, drawerAdd, onAdd, loading }) => {
  const { token } = theme.useToken();
  const { ModuleBar } = token || {};

  const _onAdd = () => {
    if (typeof onAdd === 'function') return onAdd();
    drawerAdd?.current?.onOpen?.();
  };

  return (
    <div className="module-bar" style={{ backgroundColor: ModuleBar?.colorBgContainer }}>
      <Space size={8}>
        {canAdd ? (
          <Button className="btn-snow-ui" type="text" icon={<Icon component={Plus} />} onClick={_onAdd} />
        ) : null}

        <Button className="btn-snow-ui" type="text" icon={<Icon component={Funnel} />} />

        {loading ? <Icon component={CircleNotch} className="anticon-spin" /> : null}
      </Space>

      <Search />
    </div>
  );
};

export default ModuleBar;
