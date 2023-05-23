import { Popconfirm, Spin, Tag } from 'antd';
import { FormattedMessage } from 'components';

import { useInvitationRecipientController } from './invitationRecipient.function';

const InvitationRecipient = ({ refresh, record }) => {
  const { recipientName, phoneNumbers } = record || {};
  const { onSent, loadingSentInvitation } = useInvitationRecipientController({ refresh });

  return (
    <>
      <span>{recipientName}</span>
      <div>
        {phoneNumbers?.map?.(({ id, phoneNumber, isSent }) => (
          <Popconfirm
            key={id}
            onConfirm={(e) => onSent(e, id)}
            onCancel={(e) => e.stopPropagation()}
            title={<FormattedMessage id="invitation.Send Invitation" />}
            description={<FormattedMessage id="invitation.Do you want to send invitation to this number?" />}
          >
            <Tag color={isSent ? 'blue' : undefined} style={{ cursor: 'pointer' }} onClick={(e) => e.stopPropagation()}>
              <Spin spinning={loadingSentInvitation}>+62{phoneNumber}</Spin>
            </Tag>
          </Popconfirm>
        ))}
      </div>
    </>
  );
};

export default InvitationRecipient;
