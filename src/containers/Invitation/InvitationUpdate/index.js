import { Skeleton } from 'antd';
import { forwardRef, useImperativeHandle } from 'react';
import { DrawerUpdate, FormattedMessage } from 'components';

import InvitationForm from '../InvitationForm';
import { useInvitationUpdateController } from './invitationUpdate.function';

const InvitationUpdate = forwardRef(
  /**
   *
   * @param {import('antd').DrawerProps} props
   * @param {import('react').RefObject} ref
   * @returns
   */
  (props, ref) => {
    const { state, fetch, onOpen, onClose } = useInvitationUpdateController();

    useImperativeHandle(ref, () => ({ onOpen, onClose }));

    return (
      <DrawerUpdate
        id={state.id}
        open={state.open}
        onClose={onClose}
        refresh={props.refresh}
        getService={fetch.getInvitation}
        putService={fetch.putInvitation}
        title={<FormattedMessage id="invitation.Invitation" />}
      >
        {({ form, loading, data, error, onFinish }) => (
          <Skeleton loading={loading}>
            <InvitationForm isUpdate={true} form={form} error={error} onFinish={onFinish} initialValues={data} />
          </Skeleton>
        )}
      </DrawerUpdate>
    );
  },
);

export default InvitationUpdate;
