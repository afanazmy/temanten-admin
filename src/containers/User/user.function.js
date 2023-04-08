import { FormattedMessage, IsActive, TableAction } from 'components';

/**
 * @returns {import('antd').TableProps['columns']}
 */
export const columns = ({ canUpdate, canUpdateStatus }) => {
  /** @type {import('antd').TableProps['columns']} */
  const _columns = [
    {
      title: <FormattedMessage id="user.Username" />,
      dataIndex: 'username',
    },
    {
      title: <FormattedMessage id="common.Status" />,
      dataIndex: 'isActive',
      align: 'center',
      width: 150,
      render: (text) => <IsActive isActive={text} />,
    },
  ];

  if (canUpdate || canUpdateStatus) {
    _columns.push({
      onCell: () => ({ className: 'table-action-cell' }),
      actionColumn: true,
      dataIndex: 'id',
      width: 40,
      render: (id, { isActive }) => (
        <TableAction canUpdate={canUpdate} isActive={isActive} canUpdateStatus={canUpdateStatus} />
      ),
    });
  }

  return _columns;
};
