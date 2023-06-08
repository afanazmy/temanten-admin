import { FormattedMessage } from 'components';
import { Col, Drawer, Row, Steps } from 'antd';
import { forwardRef, useImperativeHandle } from 'react';

import DrawerSetupForm from './DrawerSetupForm';
import { useDrawerSetupController } from '../signIn.function';

const DrawerSetup = ({ setupWizards }, ref) => {
  const {
    open,
    items,
    step,
    setStep,
    onOpen,
    onClose,
    onFinish,
    onFinishFailed,
    loadingPostSetupWizard,
    variables,
    loadingVariables,
  } = useDrawerSetupController({
    setupWizards,
  });

  useImperativeHandle(ref, () => ({ onOpen, onClose }));

  return (
    <Drawer
      open={open}
      height="100%"
      closable={false}
      onClose={onClose}
      placement="bottom"
      title={<FormattedMessage id="signIn.Setup" />}
    >
      <Steps current={step} direction="horizontal" onChange={setStep} type="navigation" size="small" items={items} />

      <Row justify={'center'}>
        <Col span={24} style={{ maxWidth: 350 }}>
          <DrawerSetupForm
            step={step}
            setStep={setStep}
            onFinish={onFinish}
            variables={variables}
            setupWizards={setupWizards}
            onFinishFailed={onFinishFailed}
            loadingVariables={loadingVariables}
            loadingSubmit={loadingPostSetupWizard}
          />
        </Col>
      </Row>
    </Drawer>
  );
};

export default forwardRef(DrawerSetup);
