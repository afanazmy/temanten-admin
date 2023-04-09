import { envs } from 'utils';
import { Drawer } from 'components';
import Icon from '@ant-design/icons';
import { useCreation } from 'ahooks';
import { useAppProvider } from 'hooks';
import { Sidebar, imgPaths } from 'assets';
import { sidebarMenus } from 'configuration';
import { Button, Menu, Typography } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

const { Text } = Typography;

const MasterLayoutDrawer = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  const { app } = useAppProvider();
  const menuItems = useCreation(() => sidebarMenus(), []);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  useImperativeHandle(ref, () => ({ onOpen, onClose }));

  const { activeMenu } = app || {};

  return (
    <>
      <Button type="text" onClick={onOpen} className="btn-snow-ui" icon={<Icon component={Sidebar} />} />

      <Drawer
        open={open}
        title={
          <div className="logo">
            <img alt="temanten-logo" src={imgPaths.images.logo} />
            <Text strong>{envs('REACT_APP_APP_NAME')}</Text>
          </div>
        }
        onClose={onClose}
        width="100%"
        placement="left"
        className="master-layout-drawer"
      >
        <Menu mode="inline" items={menuItems} selectedKeys={[activeMenu]} onClick={onClose} />
      </Drawer>
    </>
  );
});

export default MasterLayoutDrawer;
