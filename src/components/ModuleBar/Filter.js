import { Funnel } from 'assets';
import { useState } from 'react';
import Icon from '@ant-design/icons';
import { Button, Form, Popover } from 'antd';
import { FormattedMessage } from 'components/Intl';

import FilterItem from './FilterItem';

/**
 * @typedef {Object} FilterProps
 * @property {import('./ModuleBar').ModuleBarProps['filters']} filters
 * @property {import('antd').FormInstance} form
 * @property {() => void} onFinishFilter
 *
 * @param {FilterProps} props
 * @returns
 */
const Filter = ({ form, onFinishFilter, filters }) => {
  const [open, setOpen] = useState(false);

  // const onClose = () => setOpen(false);
  const onOpenChange = (open) => setOpen(open);

  return (
    <Popover
      open={open}
      trigger={'click'}
      placement="bottomLeft"
      onOpenChange={onOpenChange}
      content={
        <Form form={form} layout="vertical" onFinish={onFinishFilter}>
          {filters?.map?.(({ name, label, type }) => (
            <Form.Item key={name} name={name} label={<FormattedMessage id={label} />}>
              <FilterItem form={form} filterType={type} />
            </Form.Item>
          ))}

          <div style={{ textAlign: 'right' }}>
            <Button type="text" htmlType="submit" size="small">
              <FormattedMessage id="common.Filter" />
            </Button>
          </div>
        </Form>
      }
    >
      <Button className="btn-snow-ui" type="text" icon={<Icon component={Funnel} />} />
    </Popover>
  );
};

export default Filter;
