import { Form } from 'antd';
import { useRef } from 'react';
import { paths } from 'routes';
import { Restore, Trash, Upload } from 'assets';
import { useCreation, useRequest } from 'ahooks';
import { FormattedMessage, ModuleBar, Table } from 'components';
import Icon, { LoadingOutlined, QrcodeOutlined } from '@ant-design/icons';
import { usePage, usePermission, useTable, useUpdateStatus } from 'hooks';

import InvitationAdd from '../InvitationAdd';
import InvitationUpdate from '../InvitationUpdate';
import { columns, onSuccessExportQRCode } from '../invitation.function';
import { useInvitationFetch } from '../invitation.api';
import { InvitationImportDrawer } from '../invitation-components';

const InvitationPage = () => {
  const drawerAdd = useRef();
  const drawerUpdate = useRef();
  const drawerImport = useRef();
  const [form] = Form.useForm();

  const [canAdd, canUpdate, canDelete] = usePermission({
    permissions: ['AddInvitation', 'UpdateInvitation', 'DeleteInvitation'],
  });

  const fetch = useInvitationFetch();

  const {
    onFinishFilter,
    loading: loadingGetInvitations,
    tableProps,
    refresh,
    onResetSelection,
  } = useTable(fetch.getInvitations, { form, showSelection: canDelete });

  const { updateStatus, loading: loadingUpdateStatus } = useUpdateStatus({
    endpoint: {
      clear: 'clearInvitations',
      restore: 'restoreAllInvitations',
      update: { restore: 'restoreInvitation', delete: 'deleteInvitation' },
      bulkUpdate: { restore: 'restoreInvitations', delete: 'deleteInvitations' },
    },
    refresh,
    onResetSelection,
  });

  const { run: exportQRInvitation, loading: loadingExportQR } = useRequest(fetch.exportQRInvitation, {
    manual: true,
    onSuccess: onSuccessExportQRCode,
  });

  const _columns = useCreation(
    () =>
      columns({
        canUpdate,
        canDelete,
        onUpdate: (record) => drawerUpdate.current?.onOpen?.(record),
        onUpdateStatus: ({ record, action }) => updateStatus({ record, action }),
      }),
    [canUpdate, canDelete],
  );

  usePage({
    title: 'invitation.Invitation',
    activeMenu: paths.invitation,
    extraMenu: [
      {
        key: 'import',
        icon: <Icon component={Upload} />,
        onClick: () => drawerImport?.current?.onOpen?.(),
        label: <FormattedMessage id="invitation.Import Invitation" />,
      },
      {
        key: 'clear',
        icon: <Icon component={Trash} />,
        onClick: () => updateStatus({ action: 'clear' }),
        label: <FormattedMessage id="common.Clear" />,
      },
      {
        key: 'restore',
        icon: <Icon component={Restore} />,
        onClick: () => updateStatus({ action: 'restoreAll' }),
        label: <FormattedMessage id="common.Restore" />,
      },
    ],
  });

  return (
    <>
      <ModuleBar
        form={form}
        canAdd={canAdd}
        drawerAdd={drawerAdd}
        updateStatus={updateStatus}
        onFinishFilter={onFinishFilter}
        canDelete={canDelete}
        loading={loadingGetInvitations || loadingUpdateStatus}
        selectedRows={tableProps?.rowSelection?.selectedRows}
        filters={[{ name: 'deleted', label: 'common.Deleted', type: 'deleted' }]}
        selectionMenu={[
          {
            key: 'exportQRCode',
            label: <FormattedMessage id="invitation.Export QR Code" />,
            icon: loadingExportQR ? <LoadingOutlined /> : <QrcodeOutlined />,
            onClick: () => exportQRInvitation({ id: tableProps.rowSelection.selectedRowKeys }),
          },
        ]}
      />

      <Table {...tableProps} columns={_columns} rowKey="id" />

      <InvitationAdd ref={drawerAdd} refresh={refresh} />
      <InvitationUpdate ref={drawerUpdate} refresh={refresh} />
      <InvitationImportDrawer ref={drawerImport} refresh={refresh} />
    </>
  );
};

export default InvitationPage;
