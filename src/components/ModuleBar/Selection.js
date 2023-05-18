import { useCreation } from 'ahooks';
import { Restore, Trash } from 'assets';
import { FormattedMessage } from 'components/Intl';
import Icon, { DownOutlined } from '@ant-design/icons';
import { Divider, Dropdown, Grid, Typography } from 'antd';

const { Text } = Typography;

const Selection = ({ selectedRows, canUpdateStatus, canDelete, updateStatus }) => {
  const { md } = Grid.useBreakpoint();

  const onUpdateStatus = (action) => {
    updateStatus?.({ records: selectedRows, action });
  };

  const statusMenu = useCreation(
    /** @returns {import('antd').MenuProps['items']} */
    () => {
      if (!canUpdateStatus) return [];

      return [
        {
          key: 'bulkActivate',
          icon: <Icon component={Restore} />,
          onClick: () => onUpdateStatus('bulkActivate'),
          label: <FormattedMessage id="common.Activate" />,
        },
        {
          key: 'bulkDeactivate',
          icon: <Icon component={Trash} />,
          onClick: () => onUpdateStatus('bulkDeactivate'),
          label: <FormattedMessage id="common.Deactivate" />,
        },
      ];
    },
    [canUpdateStatus, selectedRows],
  );

  const deleteMenu = useCreation(
    /** @returns {import('antd').MenuProps['items']} */
    () => {
      if (!canUpdateStatus) return [];

      return [
        {
          key: 'bulkRestore',
          icon: <Icon component={Restore} />,
          onClick: () => onUpdateStatus('bulkRestore'),
          label: <FormattedMessage id="common.Restore" />,
        },
        {
          key: 'bulkDelete',
          icon: <Icon component={Trash} />,
          onClick: () => onUpdateStatus('bulkDelete'),
          label: <FormattedMessage id="common.Delete" />,
        },
      ];
    },
    [canUpdateStatus, selectedRows],
  );

  const content = useCreation(
    () => (
      <div>
        <Divider type="vertical" />

        <Text type="secondary">
          {selectedRows?.length} <FormattedMessage id="common.Selected" /> <DownOutlined />
        </Text>
      </div>
    ),
    [selectedRows],
  );

  if (!md || !selectedRows?.length) return null;

  if (canDelete) return <Dropdown menu={{ items: deleteMenu }}>{content}</Dropdown>;

  return <Dropdown menu={{ items: statusMenu }}>{content}</Dropdown>;
};

export default Selection;
