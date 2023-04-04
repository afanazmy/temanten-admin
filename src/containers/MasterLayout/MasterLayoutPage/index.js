import { envs } from 'utils';
import { imgPaths } from 'assets';
import { useCreation } from 'ahooks';
import { useAppProvider } from 'hooks';
import { Outlet } from 'react-router-dom';
import { sidebarMenus } from 'configuration';
import { FormattedMessage } from 'react-intl';
import { LoadingOutlined } from '@ant-design/icons';
import { Breadcrumb, Grid, Layout, Menu, Result, theme, Typography } from 'antd';

import { useMasterLayoutController } from '../masterLayout.function';

const { Text } = Typography;
const { Sider, Content, Header } = Layout;

const MasterLayoutPage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { app } = useAppProvider();
  const { md } = Grid.useBreakpoint();
  const menuItems = useCreation(() => sidebarMenus(), []);

  const { title, activeMenu } = app || {};
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
      {md ? (
        <Sider theme="light" trigger={null} collapsible collapsed={false}>
          <div className="logo">
            <img alt="temanten-logo" src={imgPaths.images.logo} />
            <Text strong>{envs('REACT_APP_APP_NAME')}</Text>
          </div>

          <Menu mode="inline" items={menuItems} selectedKeys={[activeMenu]} />
        </Sider>
      ) : null}

      <Layout className="site-layout" style={{ background: colorBgContainer }}>
        <Header style={{ background: colorBgContainer }}>
          <Breadcrumb items={breadcrumbItems} />
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
