import { useRef } from 'react';
import { useRequest } from 'ahooks';
import classNames from 'classnames';
import { useAppProvider } from 'hooks';
import { appConfig } from 'configuration';
import { Outlet } from 'react-router-dom';
import { Grid, Layout, Result } from 'antd';
import { FormattedMessage } from 'components';
import { LoadingOutlined } from '@ant-design/icons';

import Header from '../MasterLayoutHeader';
import Sidebar from '../MasterLayoutSidebar';
import { useMasterLayoutFetch } from '../masterLayout.api';
import { onFinallyGetAuthUser } from '../masterLayout.function';

const { Content } = Layout;

const MasterLayoutPage = () => {
  const sidebar = useRef();
  const { setApp } = useAppProvider();

  const fetch = useMasterLayoutFetch();
  const { loading } = useRequest(fetch.getAuthUser, {
    onFinally: (_, data) => onFinallyGetAuthUser({ setApp, data }),
  });

  const { md } = Grid.useBreakpoint();

  if (loading) {
    return (
      <Result
        icon={<LoadingOutlined />}
        title={<FormattedMessage id="masterLayout.loading.title" />}
        subTitle={<FormattedMessage id="masterLayout.loading.description" />}
      />
    );
  }

  const { onOpenDrawer } = sidebar?.current || {};

  return (
    <Layout hasSider className="master-layout">
      <Sidebar ref={sidebar} />

      <Layout className="site-layout ">
        <Header onClickMenu={onOpenDrawer} />

        <Content>
          <div className={classNames('container', { mobile: !md })}>
            <Outlet />
          </div>

          <div className={classNames({ 'p-12': md, 'pb-116': !md }, 'text-center')}>{appConfig.footer}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MasterLayoutPage;
