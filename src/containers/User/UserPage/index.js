import { Table } from 'antd';
import { paths } from 'routes';
import { usePage, useTable } from 'hooks';
import { useCreation } from 'ahooks';
import { ModuleBar } from 'components';

import { columns } from '../user.function';
import { useUserFetch } from '../user.api';

const UserPage = () => {
  usePage({ title: 'user.User', activeMenu: paths.user });

  const _columns = useCreation(() => columns(), []);

  const fetch = useUserFetch();
  const { loading: loadingGetUsers, tableProps } = useTable(fetch.getUsers);

  return (
    <>
      <ModuleBar addPermission={true} loading={loadingGetUsers} />

      <Table {...tableProps} columns={_columns} className="default-table" rowKey="id" />
    </>
  );
};

export default UserPage;
