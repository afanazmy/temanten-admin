import { envs } from 'utils';
import { useCreation } from 'ahooks';
import { useAppProvider } from 'hooks';
import { Outlet } from 'react-router-dom';
import { sidebarMenus } from 'configuration';
import { FormattedMessage } from 'react-intl';
import { Avatar, Breadcrumb, Layout, Menu, Result, theme, Typography } from 'antd';
import { useMasterLayoutController } from '../masterLayout.function';
import { LoadingOutlined } from '@ant-design/icons';

const { Text } = Typography;
const { Sider, Content, Header } = Layout;

const MasterLayoutPage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { app } = useAppProvider();
  const menuItems = useCreation(() => sidebarMenus(), []);

  const { user, title, activeMenu } = app || {};
  const { loadingGetAuthUser, breadcrumbItems } = useMasterLayoutController({ title });

  const header = '72px';
  const padding = '14px';
  const margin = '6px';

  if (loadingGetAuthUser) {
    return (
      <Result
        icon={<LoadingOutlined />}
        title={<FormattedMessage id="masterLayout.loading.title" />}
        subTitle={<FormattedMessage id="masterLayout.loading.description" />}
      />
    );
  }

  return (
    <Layout className="master-layout">
      <Sider theme="light" trigger={null} collapsible collapsed={false}>
        <div className="logo">
          <Text strong>{envs('REACT_APP_APP_NAME')}</Text>
        </div>

        <Menu mode="inline" items={menuItems} selectedKeys={[activeMenu]} />
      </Sider>

      <Layout className="site-layout" style={{ background: colorBgContainer }}>
        <Header style={{ background: colorBgContainer }}>
          <Breadcrumb items={breadcrumbItems} />

          <Avatar size={28} shape="square">
            {user?.username?.at?.(0) || 'S'}
          </Avatar>
        </Header>

        <Content
          style={{
            padding,
            margin: `${margin} 14px`,
            background: colorBgContainer,
            minHeight: `calc(100vh - ${header} - ${padding} - ${margin})`,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MasterLayoutPage;
