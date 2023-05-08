import { useRequest } from 'ahooks';
import { FormattedMessage, IsActive, TableAction } from 'components';
import { useUserFetch } from './user.api';

/**
 * @returns {import('antd').TableProps['columns']}
 */
export const columns = ({ canUpdate, onUpdate, canUpdateStatus }) => {
  /** @type {import('antd').TableProps['columns']} */
  const _columns = [
    {
      title: <FormattedMessage id="common.Username" />,
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
      render: (id, record) => (
        <TableAction
          record={record}
          onUpdate={onUpdate}
          canUpdate={canUpdate}
          isActive={record.isActive}
          canUpdateStatus={canUpdateStatus}
        />
      ),
    });
  }

  return _columns;
};

export const useUserController = ({ onFinish }) => {
  const fetch = useUserFetch();
  const { data: permission, loading: loadingPermission } = useRequest(fetch.getPermissions);

  const _onFinish = (values) => onFinish(values);

  return { permissions: permission?.result, loadingPermission, _onFinish };
};
