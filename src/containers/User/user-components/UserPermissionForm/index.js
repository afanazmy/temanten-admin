import { useAppProvider } from 'hooks';
import { Checkbox, Collapse, Form } from 'antd';

import { useUserPermissionFormController } from './userPermissionForm.function';

const UserPermissionForm = ({ permissions }) => {
  const { app } = useAppProvider();
  const { language } = app || {};

  const _permissions = Form.useWatch('permissions');
  const { options, onChange, onChangeParent } = useUserPermissionFormController({ permissions });

  return (
    <>
      <Form.Item hidden noStyle name="permissions">
        <Checkbox.Group options={options} />
      </Form.Item>

      <Collapse accordion style={{ width: '100%' }}>
        {permissions?.map?.((permission, index) => {
          const { id, permissionGroupName, permissions } = permission;
          const every = permissions?.every?.(({ id }) => _permissions?.includes(id));
          const some = !every && permissions?.some?.(({ id }) => _permissions?.includes(id));

          return (
            <Collapse.Panel
              forceRender
              key={`panel-permission-${id}`}
              header={
                <Checkbox
                  checked={every}
                  indeterminate={some}
                  key={`parent-${id}`}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => onChangeParent(e, index)}
                >
                  <span onClick={(e) => e.stopPropagation()}>{permissionGroupName?.[language]}</span>
                </Checkbox>
              }
            >
              {permissions?.map?.((permission) => {
                const { id, permissionLabel } = permission;
                return (
                  <div key={id}>
                    <Checkbox
                      style={{ width: '100%' }}
                      onChange={(e) => onChange(e, id)}
                      checked={_permissions?.includes?.(id)}
                    >
                      {permissionLabel?.[language]}
                    </Checkbox>
                  </div>
                );
              })}
            </Collapse.Panel>
          );
        })}
      </Collapse>
    </>
  );
};

export default UserPermissionForm;
