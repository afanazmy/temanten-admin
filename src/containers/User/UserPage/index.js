import { useRef } from 'react';
import { paths } from 'routes';
import { useCreation } from 'ahooks';
import { ModuleBar, Table } from 'components';
import { usePage, usePermission, useTable } from 'hooks';

import UserAdd from '../UserAdd';
import UserUpdate from '../UserUpdate';
import { columns } from '../user.function';
import { useUserFetch } from '../user.api';
import { Form } from 'antd';

const UserPage = () => {
  usePage({ title: 'user.User', activeMenu: paths.user });

  const drawerAdd = useRef();
  const drawerUpdate = useRef();
  const [form] = Form.useForm();

  const [canAdd, canUpdate, canUpdateStatus] = usePermission({
    permissions: ['AddUser', 'UpdateUser', 'UpdateUserStatus'],
  });

  const _columns = useCreation(
    () => columns({ canUpdate, canUpdateStatus, onUpdate: (record) => drawerUpdate.current?.onOpen?.(record) }),
    [canUpdate, canUpdateStatus],
  );

  const fetch = useUserFetch();
  const { onFinishFilter, loading: loadingGetUsers, tableProps, refresh } = useTable(fetch.getUsers, { form });

  return (
    <>
      <ModuleBar
        form={form}
        canAdd={canAdd}
        drawerAdd={drawerAdd}
        loading={loadingGetUsers}
        onFinishFilter={onFinishFilter}
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
