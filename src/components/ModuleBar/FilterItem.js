import { Input, Segmented } from 'antd';
import { FormattedMessage } from 'components/Intl';

const FilterItem = ({ filterType, form, ...props }) => {
  if (filterType === 'status') {
    return (
      <Segmented
        {...props}
        onChange={(value) => {
          props?.onChange?.(value);
          form?.submit?.();
        }}
        options={[
          { label: <FormattedMessage id="common.All" />, value: '' },
          { label: <FormattedMessage id="common.Active" />, value: '1' },
          { label: <FormattedMessage id="common.Inactive" />, value: '0' },
        ]}
      />
    );
  }

  if (filterType === 'deleted') {
    return (
      <Segmented
        {...props}
        onChange={(value) => {
          props?.onChange?.(value);
          form?.submit?.();
        }}
        options={[
          { label: <FormattedMessage id="common.Hide" />, value: '' },
          { label: <FormattedMessage id="common.Show" />, value: 'showDeleted' },
          { label: <FormattedMessage id="common.Only Deleted" />, value: 'onlyDeleted' },
        ]}
      />
    );
  }

  return (
    <Input
      {...props}
      allowClear
      onChange={(e) => {
        props?.onChange?.(e);
        if (e?.target?.value) return;
        form?.submit?.();
      }}
    />
  );
};

export default FilterItem;
