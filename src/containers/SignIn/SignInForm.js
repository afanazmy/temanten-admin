import { useIntl } from 'components';
import { validation } from 'helpers';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

/**
 * @param {import('antd').FormProps} props
 * @returns
 */
const SignInForm = ({ loading, ...props }) => {
  const { formatMessage } = useIntl();

  return (
    <Form {...props} name="sign-in-form">
      <Form.Item name="username" rules={[validation.required()]}>
        <Input autoFocus prefix={<UserOutlined />} placeholder={formatMessage({ id: 'common.Username' })} />
      </Form.Item>
      <Form.Item name="password" rules={[validation.required()]}>
        <Input.Password prefix={<LockOutlined />} placeholder={formatMessage({ id: 'common.Password' })} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
          {formatMessage({ id: 'signIn.Sign In' })}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignInForm;
