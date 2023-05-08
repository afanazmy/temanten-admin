import { Skeleton } from 'antd';
import { forwardRef, useImperativeHandle } from 'react';
import { DrawerUpdate, FormattedMessage } from 'components';

import UserForm from '../UserForm';
import { useUserUpdateController } from './userUpdate.function';

const UserUpdate = forwardRef(
  /**
   *
   * @param {import('antd').DrawerProps} props
   * @param {import('react').RefObject} ref
   * @returns
   */
  (props, ref) => {
    const { state, fetch, onOpen, onClose } = useUserUpdateController();

    useImperativeHandle(ref, () => ({ onOpen, onClose }));

    return (
      <DrawerUpdate
        id={state.id}
        open={state.open}
        onClose={onClose}
        refresh={props.refresh}
        getService={fetch.getUser}
        putService={fetch.putUser}
        title={<FormattedMessage id="user.User" />}
      >
        {({ form, loading, data, error, onFinish }) => (
          <Skeleton loading={loading}>
            <UserForm isUpdate={true} form={form} error={error} onFinish={onFinish} initialValues={data} />
          </Skeleton>
        )}
      </DrawerUpdate>
    );
  },
);

export default UserUpdate;
