import { Form } from 'antd';
import { useRef } from 'react';
import { paths } from 'routes';
import { useCreation } from 'ahooks';
import { ModuleBar, Table } from 'components';
import { usePage, usePermission, useTable, useUpdateStatus } from 'hooks';

import UserAdd from '../UserAdd';
import UserUpdate from '../UserUpdate';
import { columns } from '../user.function';
import { useUserFetch } from '../user.api';

const UserPage = () => {
  usePage({ title: 'user.User', activeMenu: paths.user });

  const drawerAdd = useRef();
  const drawerUpdate = useRef();
  const [form] = Form.useForm();

  const [canAdd, canUpdate, canUpdateStatus] = usePermission({
    permissions: ['AddUser', 'UpdateUser', 'UpdateUserStatus'],
  });

  const fetch = useUserFetch();
  const {
    onFinishFilter,
    loading: loadingGetUsers,
    tableProps,
    refresh,
    onResetSelection,
  } = useTable(fetch.getUsers, { form, showSelection: canUpdateStatus });

  const { updateStatus, loading: loadingUpdateStatus } = useUpdateStatus({
    endpoint: {
      update: { activate: 'activateUser', deactivate: 'deactivateUser' },
      bulkUpdate: { activate: 'activateUsers', deactivate: 'deactivateUsers' },
    },
    refresh,
    onResetSelection,
  });

  const _columns = useCreation(
    () =>
      columns({
        canUpdate,
        canUpdateStatus,
        onUpdate: (record) => drawerUpdate.current?.onOpen?.(record),
        onUpdateStatus: ({ record, action }) => updateStatus({ record, action }),
      }),
    [canUpdate, canUpdateStatus],
  );

  return (
    <>
      <ModuleBar
        form={form}
        canAdd={canAdd}
        drawerAdd={drawerAdd}
        updateStatus={updateStatus}
        onFinishFilter={onFinishFilter}
        canUpdateStatus={canUpdateStatus}
        loading={loadingGetUsers || loadingUpdateStatus}
        selectedRows={tableProps?.rowSelection?.selectedRows}
        filters={[
          { name: 'username', label: 'common.Username', type: 'string' },
          { name: 'isActive', label: 'common.Status', type: 'status' },
        ]}
      />

      <Table {...tableProps} columns={_columns} rowKey="id" />

      <UserAdd ref={drawerAdd} refresh={refresh} />
      <UserUpdate ref={drawerUpdate} refresh={refresh} />
    </>
  );
};

export default UserPage;
