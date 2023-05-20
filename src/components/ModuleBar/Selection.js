import { useCreation } from 'ahooks';
import { Restore, Trash } from 'assets';
import { FormattedMessage } from 'components/Intl';
import Icon, { DownOutlined } from '@ant-design/icons';
import { Divider, Dropdown, Grid, Typography } from 'antd';

const { Text } = Typography;

const Selection = ({ selectedRows, canUpdateStatus, canDelete, updateStatus, selectionMenu = [] }) => {
  const { md } = Grid.useBreakpoint();

  const onUpdateStatus = (action) => {
    updateStatus?.({ records: selectedRows, action });
  };

  const statusMenu = useCreation(
    /** @returns {import('antd').MenuProps['items']} */
    () => {
      if (!canUpdateStatus) return [];

      return [
        ...selectionMenu,
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
    [canUpdateStatus, selectedRows, selectionMenu],
  );

  const deleteMenu = useCreation(
    /** @returns {import('antd').MenuProps['items']} */
    () => {
      if (!canDelete) return [];

      return [
        ...selectionMenu,
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
    [canDelete, selectedRows, selectionMenu],
  );

  const content = useCreation(
    () => (
      <div className="selection">
        <Divider type="vertical" />

        <Text type="secondary">
          {selectedRows?.length} <FormattedMessage id="common.Selected" /> <DownOutlined />
        </Text>
      </div>
    ),
    [selectedRows],
  );

  if (!md || !selectedRows?.length) return null;

  if (canDelete) {
    return (
      <Dropdown trigger="click" menu={{ items: deleteMenu }}>
        {content}
      </Dropdown>
    );
  }

  return (
    <Dropdown trigger="click" menu={{ items: statusMenu }}>
      {content}
    </Dropdown>
  );
};

export default Selection;
