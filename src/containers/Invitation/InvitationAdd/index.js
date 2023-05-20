import { forwardRef, useImperativeHandle } from 'react';
import { DrawerAdd, FormattedMessage } from 'components';

import InvitationForm from '../InvitationForm';
import { useInvitationAddController } from './invitationAdd.function';

const InvitationAdd = forwardRef(
  /**
   *
   * @param {import('antd').DrawerProps} props
   * @param {import('react').RefObject} ref
   * @returns
   */
  (props, ref) => {
    const { state, fetch, onOpen, onClose } = useInvitationAddController();
    const { open } = state || {};

    useImperativeHandle(ref, () => ({ onOpen, onClose }));

    return (
      <DrawerAdd
        open={open}
        placement="left"
        onClose={onClose}
        refresh={props.refresh}
        postService={fetch.postInvitation}
        title={<FormattedMessage id="invitation.Add Invitation" />}
      >
        {({ form, error, onFinish }) => <InvitationForm form={form} error={error} onFinish={onFinish} />}
      </DrawerAdd>
    );
  },
);

export default InvitationAdd;
