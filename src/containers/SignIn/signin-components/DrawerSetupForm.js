import { useCreation } from 'ahooks';
import { validation } from 'helpers';
import { useAppProvider } from 'hooks';
import { Button, Form, Input, Result, Space, Tabs } from 'antd';
import { FormattedMessage, useIntl } from 'components';

/**
 * @typedef {Object} IDrawerSetupForm
 * @property {Number} step
 * @property {(current: Number) => void} setStep
 * @property {Array} setupWizards
 * @property {Boolean} loadingSubmit
 *
 * @typedef {import('antd').FormProps & IDrawerSetupForm} DrawerSetupFormProps
 *
 * @param {DrawerSetupFormProps} props
 * @returns
 */
const DrawerSetupForm = ({ step, setStep, setupWizards, loadingSubmit, ...props }) => {
  const { app } = useAppProvider();
  const { language } = app || {};

  const { formatMessage } = useIntl();

  const tabs = {
    superadmin: (
      <>
        <Form.Item
          rules={[validation.required()]}
          name={['superadmin', 'username']}
          label={<FormattedMessage id="common.Username" />}
        >
          <Input autoFocus />
        </Form.Item>

        <Form.Item
          rules={[validation.required()]}
          name={['superadmin', 'password']}
          label={<FormattedMessage id="common.Password" />}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          dependencies={['superadmin', 'password']}
          name={['superadmin', 'passwordConfirmation']}
          label={<FormattedMessage id="common.Confirm Password" />}
          rules={[
            validation.required(),
            (args) =>
              validation.confirmation({
                ...args,
                formatMessage,
                fieldName: ['superadmin', 'password'],
                id: 'signIn.Password confirmation do not match',
              }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" onClick={() => setStep(step + 1)}>
          <FormattedMessage id="common.Next" />
        </Button>
      </>
    ),
    finish: (
      <Result
        status={'info'}
        title={<FormattedMessage id="signIn.Finish Setup" />}
        subTitle={<FormattedMessage id="signIn.Are you sure you want to complete the setup?" />}
      >
        <Space>
          <Button loading={loadingSubmit} onClick={() => setStep?.(step - 1)}>
            <FormattedMessage id="common.Back" />
          </Button>

          <Button loading={loadingSubmit} htmlType="submit" type="primary">
            <FormattedMessage id="signIn.Finish Setup" />
          </Button>
        </Space>
      </Result>
    ),
  };

  const items = useCreation(() => {
    /** @type {import('antd').TabsProps['items']} */
    const items = setupWizards?.map?.(({ name, type }, key) => ({
      key: `${key}`,
      forceRender: true,
      children: tabs?.[type],
      label: name?.[language],
    }));

    items.push({
      forceRender: true,
      children: tabs.finish,
      key: `${setupWizards?.length}`,
      label: <FormattedMessage id="signIn.Finish Setup" />,
    });

    return items;
  }, [JSON.stringify(setupWizards), step]);

  return (
    <Form {...props} layout="vertical" style={{ marginTop: 24 }}>
      <Tabs items={items} activeKey={`${step}`} renderTabBar={() => <div />} />
    </Form>
  );
};

export default DrawerSetupForm;
