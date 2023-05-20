import { useEffect } from 'react';
import { Form, Input, Radio } from 'antd';
import { setFieldsError, validation } from 'helpers';
import { FormattedMessage, HiddenSubmit } from 'components';

import { useInvitationController } from '../invitation.function';

/**
 *
 * @param {import("antd").FormProps} props
 * @returns
 */
const InvitationForm = (props) => {
  const { isUpdate, onFinish, error, ...restProps } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => props.form?.resetFields?.(), [props.initialValues]);

  useEffect(() => setFieldsError({ error, form: props.form }));

  const { _onFinish } = useInvitationController({ form: props.form, onFinish });

  return (
    <Form {...restProps} onFinish={_onFinish} layout="vertical">
      <Form.Item
        name="recipientName"
        label={<FormattedMessage id="invitation.Recipient Name" />}
        rules={[validation.required()]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="isGroup"
        initialValue={0}
        rules={[validation.required()]}
        label={<FormattedMessage id="invitation.Group" />}
        tooltip={<FormattedMessage id="invitation.Group.help" />}
      >
        <Radio.Group optionType="button">
          <Radio.Button value={0}>
            <FormattedMessage id="common.No" />
          </Radio.Button>
          <Radio.Button value={1}>
            <FormattedMessage id="common.Yes" />
          </Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="isFamilyMember"
        initialValue={0}
        rules={[validation.required()]}
        label={<FormattedMessage id="invitation.Family" />}
        tooltip={<FormattedMessage id="invitation.Family.help" />}
      >
        <Radio.Group optionType="button">
          <Radio.Button value={0}>
            <FormattedMessage id="common.No" />
          </Radio.Button>
          <Radio.Button value={1}>
            <FormattedMessage id="common.Yes" />
          </Radio.Button>
        </Radio.Group>
      </Form.Item>

      <HiddenSubmit />
    </Form>
  );
};

export default InvitationForm;
