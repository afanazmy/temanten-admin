import { forwardRef, useImperativeHandle } from 'react';
import { DrawerAdd, FormattedMessage } from 'components';

import UserForm from '../UserForm';
import { useUserAddController } from './userAdd.function';

const UserAdd = forwardRef(
  /**
   *
   * @param {import('antd').DrawerProps} props
   * @param {import('react').RefObject} ref
   * @returns
   */
  (props, ref) => {
    const { state, fetch, onOpen, onClose } = useUserAddController();
    const { open } = state || {};

    useImperativeHandle(ref, () => ({ onOpen, onClose }));

    return (
      <DrawerAdd
        open={open}
        placement="left"
        onClose={onClose}
        refresh={props.refresh}
        postService={fetch.postUser}
        title={<FormattedMessage id="user.Add User" />}
      >
        {({ form, error, onFinish }) => <UserForm form={form} error={error} onFinish={onFinish} />}
      </DrawerAdd>
    );
  },
);

export default UserAdd;
