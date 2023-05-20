import { Tag } from 'antd';
import { FormattedMessage, IsActive, TableAction } from 'components';

export const columns = ({ canUpdate, onUpdate, onUpdateStatus, canDelete }) => {
  /** @type {import('antd').TableProps['columns']} */
  const _columns = [
    {
      title: <FormattedMessage id="invitation.Recipient Name" />,
      dataIndex: 'recipientName',
    },
    {
      title: <FormattedMessage id="invitation.Group" />,
      dataIndex: 'isGroup',
      align: 'center',
      render: (text) => (
        <Tag color={text === 1 ? 'green' : 'orange'}>
          <FormattedMessage id={text === 1 ? 'common.Yes' : 'common.No'} />
        </Tag>
      ),
    },
    {
      title: <FormattedMessage id="invitation.Family" />,
      dataIndex: 'isFamilyMember',
      align: 'center',
      render: (text) => (
        <Tag color={text === 1 ? 'green' : 'orange'}>
          <FormattedMessage id={text === 1 ? 'common.Yes' : 'common.No'} />
        </Tag>
      ),
    },
    {
      title: <FormattedMessage id="common.Status" />,
      dataIndex: 'deletedAt',
      align: 'center',
      width: 150,
      render: (text) => <IsActive deletedAt={text} />,
    },
  ];

  if (canUpdate || canDelete) {
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
          canDelete={canDelete}
          isActive={record.isActive}
          deletedAt={record.deletedAt}
          onUpdateStatus={onUpdateStatus}
        />
      ),
    });
  }

  return _columns;
};

export const useInvitationController = ({ onFinish }) => {
  const _onFinish = (values) => onFinish(values);

  return { _onFinish };
};
