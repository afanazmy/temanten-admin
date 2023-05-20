import { Download } from 'assets';
import { useSetState } from 'ahooks';
import Icon from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { Drawer, FormattedMessage } from 'components';
import { forwardRef, useImperativeHandle, useState } from 'react';

import { useInvitationImportDrawerController } from './invitationImportDrawer.function';

const InvitationImportDrawer = forwardRef(({ refresh }, ref) => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useSetState({ files: [], replace: true });

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  useImperativeHandle(ref, () => ({ onOpen, onClose }));

  const { getTemplateInvitation, loadingGetTemplateInvitation, onFinish, loadingPostTemplateInvitation } =
    useInvitationImportDrawerController({
      refresh,
      onClose,
    });

  return (
    <Drawer
      open={open}
      onClose={onClose}
      destroyOnClose={true}
      title={<FormattedMessage id="invitation.Import Invitation" />}
      extra={
        <Button
          type="primary"
          disabled={!values.files?.length}
          onClick={() => onFinish(values)}
          loading={loadingPostTemplateInvitation}
        >
          <FormattedMessage id="common.Save" />
        </Button>
      }
    >
      <div style={{ textAlign: 'center' }}>
        <Button
          className="btn-snow-ui"
          icon={<Icon component={Download} />}
          loading={loadingGetTemplateInvitation}
          onClick={() => getTemplateInvitation()}
        >
          {' '}
          <FormattedMessage id="common.Download Template" />
        </Button>

        <br />

        <Upload
          beforeUpload={(_f, files) => {
            setValues({ files });
            return false;
          }}
        >
          <Button className="btn-snow-ui" loading={loadingPostTemplateInvitation} style={{ marginTop: 12 }}>
            <FormattedMessage id="common.Select File" />
          </Button>
        </Upload>

        {/* <Checkbox
          checked={values?.replace}
          style={{ marginTop: 12 }}
          onChange={({ target: { value } }) => setValues({ replace: value })}
        >
          <FormattedMessage id="invitation.Replace existing invitation" />
        </Checkbox> */}
      </div>
    </Drawer>
  );
});

export default InvitationImportDrawer;
