import { useRef } from 'react';
import { paths } from 'routes';
import { useCreation } from 'ahooks';
import { ModuleBar, Table } from 'components';
import { usePage, usePermission, useTable } from 'hooks';

import UserAdd from '../UserAdd';
import UserUpdate from '../UserUpdate';
import { columns } from '../user.function';
import { useUserFetch } from '../user.api';

const UserPage = () => {
  usePage({ title: 'user.User', activeMenu: paths.user });

  const drawerAdd = useRef();
  const drawerUpdate = useRef();

  const [canAdd, canUpdate, canUpdateStatus] = usePermission({
    permissions: ['AddUser', 'UpdateUser', 'UpdateUserStatus'],
  });

  const _columns = useCreation(
    () => columns({ canUpdate, canUpdateStatus, onUpdate: (record) => drawerUpdate.current?.onOpen?.(record) }),
    [canUpdate, canUpdateStatus],
  );

  const fetch = useUserFetch();
  const { loading: loadingGetUsers, tableProps, refresh } = useTable(fetch.getUsers);

  return (
    <>
      <ModuleBar canAdd={canAdd} drawerAdd={drawerAdd} loading={loadingGetUsers} />

      <Table {...tableProps} columns={_columns} rowKey="id" />

      <UserAdd ref={drawerAdd} refresh={refresh} />
      <UserUpdate ref={drawerUpdate} refresh={refresh} />
    </>
  );
};

export default UserPage;
