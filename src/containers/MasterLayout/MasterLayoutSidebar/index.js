import { imgPaths } from 'assets';
import { useAppProvider } from 'hooks';
import { Avatar, Drawer, Grid, Layout, Menu } from 'antd';
import { getSidebarMenus, toAbsoluteUrl } from 'helpers';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { useMasterLayoutStyle } from '../masterLayout.style';

const { Sider } = Layout;

const Sidebar = (_p, ref) => {
  const [sidebar, setSidebar] = useState([]);
  const [_openKeys, _setOpenKeys] = useState();
  const [collapsed, setCollapsed] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const { md } = Grid.useBreakpoint();

  const { app } = useAppProvider();
  const { user, activeMenu, openKeys } = app || {};

  useEffect(() => {
    if (!user) return;
    setSidebar(getSidebarMenus({ user }));
  }, [user]);

  useEffect(() => {
    _setOpenKeys(openKeys);
  }, [openKeys]);

  const onOpenDrawer = () => setOpenDrawer(true);
  const onCancelDrawer = () => setOpenDrawer(false);

  useImperativeHandle(ref, () => ({ openDrawer, onOpenDrawer, onCancelDrawer }));

  const { logo } = useMasterLayoutStyle();

  if (!md) {
    return (
      <Drawer
        width="80%"
        placement="left"
        open={openDrawer}
        closeIcon={<span />}
        className="drawer-menu"
        onClose={onCancelDrawer}
        title={
          <div className="logo text-center">
            <img alt="logo" src={toAbsoluteUrl(imgPaths.images.equalLogo)} />
          </div>
        }
      >
        <div className="menu overflow">
          <Menu
            mode="inline"
            items={sidebar}
            onClick={onCancelDrawer}
            selectedKeys={[activeMenu]}
            openKeys={collapsed ? undefined : _openKeys}
            onOpenChange={(keys) => _setOpenKeys([keys?.at?.(-1)])}
          />
        </div>
      </Drawer>
    );
  }

  return (
    <Sider
      width={250}
      collapsible
      theme="light"
      breakpoint="lg"
      className="sidebar"
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Avatar size={24} shape="circle" src={toAbsoluteUrl(imgPaths.images.logo)} />

      <div className="menu overflow">
        <Menu
          mode="inline"
          items={sidebar}
          selectedKeys={[activeMenu]}
          openKeys={collapsed ? undefined : _openKeys}
          onOpenChange={(keys) => _setOpenKeys([keys?.at?.(-1)])}
        />
      </div>
    </Sider>
  );
};

export default forwardRef(Sidebar);
