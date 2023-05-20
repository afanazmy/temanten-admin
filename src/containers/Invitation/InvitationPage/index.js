import { Form } from 'antd';
import { useRef } from 'react';
import { paths } from 'routes';
import { Upload } from 'assets';
import { useCreation } from 'ahooks';
import Icon from '@ant-design/icons';
import { FormattedMessage, ModuleBar, Table } from 'components';
import { usePage, usePermission, useTable, useUpdateStatus } from 'hooks';

import InvitationAdd from '../InvitationAdd';
import InvitationUpdate from '../InvitationUpdate';
import { columns } from '../invitation.function';
import { useInvitationFetch } from '../invitation.api';
import { InvitationImportDrawer } from '../invitation-components';

const InvitationPage = () => {
  const drawerImport = useRef();

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
    ],
  });

  const drawerAdd = useRef();
  const drawerUpdate = useRef();
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
      update: { restore: 'restoreInvitation', delete: 'deleteInvitation' },
      bulkUpdate: { restore: 'restoreInvitations', delete: 'deleteInvitations' },
    },
    refresh,
    onResetSelection,
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
      />

      <Table {...tableProps} columns={_columns} rowKey="id" />

      <InvitationAdd ref={drawerAdd} refresh={refresh} />
      <InvitationUpdate ref={drawerUpdate} refresh={refresh} />
      <InvitationImportDrawer ref={drawerImport} refresh={refresh} />
    </>
  );
};

export default InvitationPage;
