import { envs } from 'utils';
import { imgPaths } from 'assets';
import { Col, Row, Skeleton, Typography } from 'antd';

import SignInForm from './SignInForm';
import { DrawerSetup } from './signin-components';
import { useSignInController } from './signIn.function';

const { Title } = Typography;

const SignInPage = () => {
  const { form, drawerSetup, onSignIn, setupWizards, loadingGetSetupWizards, loadingPostSignIn } =
    useSignInController();

  return (
    <Row justify={'center'} style={{ height: window.innerHeight, alignItems: 'center' }}>
      <Col span={24} style={{ maxWidth: 300 }}>
        <Skeleton loading={loadingGetSetupWizards}>
          <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
            <img alt="temanten-logo" src={imgPaths.images.logo} style={{ maxHeight: 42, margin: '0px 12px' }} />
            {envs('REACT_APP_APP_NAME')}
          </Title>

          <SignInForm form={form} onFinish={onSignIn} loading={loadingPostSignIn} />
        </Skeleton>
      </Col>

      <DrawerSetup ref={drawerSetup} setupWizards={setupWizards} />
    </Row>
  );
};

export default SignInPage;
