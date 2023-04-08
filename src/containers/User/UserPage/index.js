import { paths } from 'routes';
import { useCreation } from 'ahooks';
import { ModuleBar, Table } from 'components';
import { usePage, usePermission, useTable } from 'hooks';

import { columns } from '../user.function';
import { useUserFetch } from '../user.api';

const UserPage = () => {
  usePage({ title: 'user.User', activeMenu: paths.user });

  const [canAdd, canUpdate, canUpdateStatus] = usePermission({
    permissions: ['AddUser', 'UpdateUser', 'UpdateUserStatus'],
  });

  const _columns = useCreation(() => columns({ canUpdate, canUpdateStatus }), [canUpdate, canUpdateStatus]);

  const fetch = useUserFetch();
  const { loading: loadingGetUsers, tableProps } = useTable(fetch.getUsers);

  return (
    <>
      <ModuleBar canAdd={canAdd} loading={loadingGetUsers} />

      <Table {...tableProps} columns={_columns} rowKey="id" />
    </>
  );
};

export default UserPage;
