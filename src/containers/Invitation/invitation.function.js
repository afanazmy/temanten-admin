import { Tag } from 'antd';
import { downloadBlob } from 'helpers';
import { FormattedMessage, IsActive, TableAction } from 'components';

import { InvitationRecipient } from './invitation-components';

export const columns = ({ refresh, canUpdate, onUpdate, onUpdateStatus, canDelete }) => {
  /** @type {import('antd').TableProps['columns']} */
  const _columns = [
    {
      title: <FormattedMessage id="invitation.Recipient Name" />,
      dataIndex: 'recipientName',
      render: (_t, record) => <InvitationRecipient refresh={refresh} record={record} />,
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

export const onSuccessExportQRCode = (response) => {
  downloadBlob(response, { fileName: 'qr_codes.zip' });
};
