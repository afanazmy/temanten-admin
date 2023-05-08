import { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { setFieldsError, validation } from 'helpers';
import { FormattedMessage, HiddenSubmit, useIntl } from 'components';

import { useUserController } from '../user.function';
import { UserPermissionForm } from '../user-components';

/**
 *
 * @param {import("antd").FormProps} props
 * @returns
 */
const UserForm = (props) => {
  const [changePassword, setChangePassword] = useState(false);
  const { formatMessage } = useIntl();

  const { isUpdate, onFinish, error, ...restProps } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => props.form?.resetFields?.(), [props.initialValues]);

  useEffect(() => setFieldsError({ error, form: props.form }));

  const { _onFinish, permissions, loadingPermission } = useUserController({ form: props.form, onFinish });

  return (
    <Form {...restProps} onFinish={_onFinish} layout="vertical">
      <Form.Item name="username" label={<FormattedMessage id="common.Username" />} rules={[validation.required()]}>
        <Input />
      </Form.Item>

      {!isUpdate || changePassword ? (
        <>
          <Form.Item name="password" label={<FormattedMessage id="common.Password" />} rules={[validation.required()]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="passwordConfirmation"
            label={<FormattedMessage id="common.Confirm Password" />}
            rules={[
              validation.required(),
              ({ getFieldValue }) => validation.confirmation({ formatMessage, getFieldValue, fieldName: 'password' }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </>
      ) : null}

      {isUpdate ? (
        <div style={{ textAlign: 'center' }}>
          <Button style={{ marginBottom: 24 }} onClick={() => setChangePassword(!changePassword)}>
            {changePassword ? 'Cancel Change Password' : 'Change Password'}
          </Button>
        </div>
      ) : null}

      <UserPermissionForm permissions={permissions} loading={loadingPermission} />

      <HiddenSubmit />
    </Form>
  );
};

export default UserForm;
