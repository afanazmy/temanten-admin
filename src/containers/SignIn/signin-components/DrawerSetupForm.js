import { useCreation } from 'ahooks';
import { validation } from 'helpers';
import { useAppProvider } from 'hooks';
import { FormattedMessage, useIntl } from 'components';
import { Button, DatePicker, Divider, Form, Input, Result, Space, Tabs, Tag } from 'antd';

/**
 * @typedef {Object} IDrawerSetupForm
 * @property {Number} step
 * @property {(current: Number) => void} setStep
 * @property {Array} setupWizards
 * @property {Boolean} loadingSubmit
 * @property {String[]} variables
 * @property {Boolean} loadingVariables
 *
 * @typedef {import('antd').FormProps & IDrawerSetupForm} DrawerSetupFormProps
 *
 * @param {DrawerSetupFormProps} props
 * @returns
 */
const DrawerSetupForm = ({ step, setStep, setupWizards, loadingSubmit, variables, loadingVariables, ...props }) => {
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
    app: (
      <>
        <Divider orientation="left">
          <FormattedMessage id="common.Bride" />
        </Divider>

        <Form.Item
          rules={[validation.required()]}
          name={['app', 'bride']}
          label={<FormattedMessage id="common.Fullname" />}
        >
          <Input />
        </Form.Item>

        <Form.Item
          rules={[validation.required()]}
          name={['app', 'bride_nickname']}
          label={<FormattedMessage id="common.Nickname" />}
        >
          <Input />
        </Form.Item>

        <Form.Item
          rules={[validation.required()]}
          name={['app', 'bride_father']}
          label={<FormattedMessage id="common.Father" />}
        >
          <Input />
        </Form.Item>

        <Form.Item
          rules={[validation.required()]}
          name={['app', 'bride_mother']}
          label={<FormattedMessage id="common.Mother" />}
        >
          <Input />
        </Form.Item>

        <Divider orientation="left">
          <FormattedMessage id="common.Groom" />
        </Divider>

        <Form.Item
          rules={[validation.required()]}
          name={['app', 'groom']}
          label={<FormattedMessage id="common.Fullname" />}
        >
          <Input />
        </Form.Item>

        <Form.Item
          rules={[validation.required()]}
          name={['app', 'groom_nickname']}
          label={<FormattedMessage id="common.Nickname" />}
        >
          <Input />
        </Form.Item>

        <Form.Item
          rules={[validation.required()]}
          name={['app', 'groom_father']}
          label={<FormattedMessage id="common.Father" />}
        >
          <Input />
        </Form.Item>

        <Form.Item
          rules={[validation.required()]}
          name={['app', 'groom_mother']}
          label={<FormattedMessage id="common.Mother" />}
        >
          <Input />
        </Form.Item>

        <Divider orientation="left">
          <FormattedMessage id="common.Akad" />
        </Divider>

        <Form.Item
          rules={[validation.required()]}
          name={['app', 'akad_datetime']}
          label={<FormattedMessage id="common.Date" />}
        >
          <DatePicker showTime format="DD MMM YYYY HH:mm" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          rules={[validation.required()]}
          name={['app', 'akad_place']}
          label={<FormattedMessage id="common.Place" />}
        >
          <Input />
        </Form.Item>

        <Form.Item
          rules={[validation.required()]}
          name={['app', 'akad_map']}
          label={<FormattedMessage id="common.Map" />}
        >
          <Input />
        </Form.Item>

        <Divider orientation="left">
          <FormattedMessage id="common.Reception" />
        </Divider>

        <Form.Item
          rules={[validation.required()]}
          name={['app', 'reception_datetime']}
          label={<FormattedMessage id="common.Date" />}
        >
          <DatePicker showTime format="DD MMM YYYY HH:mm" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          rules={[validation.required()]}
          name={['app', 'reception_place']}
          label={<FormattedMessage id="common.Place" />}
        >
          <Input />
        </Form.Item>

        <Form.Item
          rules={[validation.required()]}
          name={['app', 'reception_map']}
          label={<FormattedMessage id="common.Map" />}
        >
          <Input />
        </Form.Item>

        <Form.Item name={['app', 'dresscode']} label={<FormattedMessage id="common.Dresscode" />}>
          <Input allowClear />
        </Form.Item>

        <Divider orientation="left">
          <FormattedMessage id="invitation.Invitation" />
        </Divider>

        <Form.Item
          rules={[validation.required()]}
          name={['app', 'dresscode']}
          label={<FormattedMessage id="common.Invitation Wording" />}
          extra={
            <>
              <span>
                <FormattedMessage id="common.Available Variables" />{' '}
              </span>
              {variables?.map?.((variable) => (
                <Tag key={variable} color="blue">
                  {variable}
                </Tag>
              ))}
            </>
          }
        >
          <Input.TextArea allowClear rows={7} />
        </Form.Item>
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
