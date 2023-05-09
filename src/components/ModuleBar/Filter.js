import { Funnel } from 'assets';
import { useState } from 'react';
import Icon from '@ant-design/icons';
import { FormattedMessage } from 'components/Intl';
import { Button, Form, Popover, Space } from 'antd';

import FilterItem from './FilterItem';

/**
 * @typedef {Object} FilterProps
 * @property {import('./ModuleBar').ModuleBarProps['filters']} filters
 * @property {import('antd').FormInstance} form
 * @property {import('react').RefObject} container
 *
 * @param {FilterProps} props
 * @returns
 */
const Filter = ({ form, container, filters }) => {
  const [open, setOpen] = useState(false);

  const onOpenChange = (open) => setOpen(open);

  const onReset = () => {
    form?.resetFields?.();
    form?.submit?.();
  };

  return (
    <Popover
      open={open}
      trigger={'click'}
      placement="bottomLeft"
      onOpenChange={onOpenChange}
      getPopupContainer={() => container.current}
      content={
        <>
          {filters?.map?.(({ name, label, type }) => (
            <Form.Item key={name} name={name} label={<FormattedMessage id={label} />}>
              <FilterItem form={form} filterType={type} />
            </Form.Item>
          ))}

          <div style={{ textAlign: 'right' }}>
            <Space>
              <Button type="text" size="small" onClick={onReset}>
                <FormattedMessage id="common.Reset" />
              </Button>

              <Button type="text" htmlType="submit" size="small">
                <FormattedMessage id="common.Filter" />
              </Button>
            </Space>
          </div>
        </>
      }
    >
      <Button className="btn-snow-ui" type="text" icon={<Icon component={Funnel} />} />
    </Popover>
  );
};

export default Filter;
