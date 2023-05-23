import { Trash } from 'assets';
import { useEffect } from 'react';
import Icon from '@ant-design/icons';
import { Button, Form, Input, Radio } from 'antd';
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

      <Form.List name="phoneNumbers">
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map((field) => (
                <div key={`phone-${field.key}`} style={{ display: 'flex' }}>
                  <Form.Item
                    {...field}
                    style={{ width: '100%' }}
                    label={
                      <>
                        <FormattedMessage id="common.Whatsapp No." /> #{field.name + 1}
                      </>
                    }
                    rules={[validation.required()]}
                  >
                    <Input prefix="+62" placeholder="89xxxxxxxxx" maxLength={13} />
                  </Form.Item>

                  <Button
                    type="text"
                    className="btn-snow-ui"
                    icon={<Icon component={Trash} />}
                    onClick={() => remove(field.name)}
                    style={{ marginTop: 'auto', marginBottom: 26, marginLeft: 8 }}
                  />
                </div>
              ))}

              <div style={{ textAlign: 'center' }}>
                <Button onClick={() => add()} type="dashed" disabled={fields?.length === 2}>
                  <FormattedMessage id="common.Add Whatsapp No." />
                </Button>
              </div>
            </>
          );
        }}
      </Form.List>

      <HiddenSubmit />
    </Form>
  );
};

export default InvitationForm;
