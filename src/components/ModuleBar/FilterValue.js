import { Form, Tag, Typography } from 'antd';
import { FormattedMessage } from 'components/Intl';

const { Text } = Typography;

/**
 * @typedef {Object} FilterValueProps
 * @property {import('antd').FormInstance} form
 * @property {import('./Filter').FilterProps['filters']} filters
 *
 * @param {FilterValueProps} props
 * @returns
 */
const FilterValue = ({ form, filters }) => {
  const types = ({ value, type }) => {
    const status = {
      0: <FormattedMessage id="common.Inactive" />,
      1: <FormattedMessage id="common.Active" />,
    };

    if (type === 'status') return status?.[value];
    return value;
  };

  const onClose = ({ name }) => {
    form?.resetFields?.([name]);
    form?.submit?.();
  };

  return (
    <div style={{ marginBottom: 6 }}>
      <Form.Item noStyle shouldUpdate={() => true}>
        {({ getFieldsValue }) => {
          const values = getFieldsValue();
          return filters?.map?.(({ name, label, type }) => {
            const value = values?.[name];
            if (!value) return null;

            return (
              <Tag key={name} closable onClose={() => onClose({ name })}>
                <Text type="secondary" style={{ fontSize: 12, marginRight: 12 }}>
                  <FormattedMessage id={label} />
                </Text>
                {types({ value, type })}
              </Tag>
            );
          });
        }}
      </Form.Item>
    </div>
  );
};

export default FilterValue;
