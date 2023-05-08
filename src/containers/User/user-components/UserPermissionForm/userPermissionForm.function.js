import { Form } from 'antd';
import { useCreation, useMemoizedFn } from 'ahooks';

export const useUserPermissionFormController = ({ permissions }) => {
  const form = Form.useFormInstance();

  const options = useCreation(() => {
    const options = [];
    permissions?.forEach?.((group) => group?.permissions?.forEach?.((permission) => options.push(permission?.id)));
    return options;
  }, [permissions]);

  const onChangeParent = useMemoizedFn(
    /**
     * @param {import("antd/es/checkbox").CheckboxChangeEvent} e
     * @param {Number}
     */
    (e, index) => {
      e.stopPropagation();
      const permissionGroup = permissions?.[index];
      const _permissions = form.getFieldValue('permissions') || [];

      if (!e.target.checked) {
        const permissions = permissionGroup.permissions.map(({ id }) => id);
        return form.setFieldValue(
          'permissions',
          _permissions.filter((id) => !permissions.includes(id)),
        );
      }

      form.setFieldValue('permissions', [..._permissions, ...permissionGroup.permissions.map(({ id }) => id)]);
    },
  );

  const onChange = useMemoizedFn(
    /**
     * @param {import('antd/es/checkbox').CheckboxChangeEvent} e
     * @param {String} id
     */
    (e, id) => {
      const permissions = form.getFieldValue('permissions') || [];
      if (e.target.checked) {
        return form.setFieldValue('permissions', [...permissions, id]);
      }

      return form.setFieldValue(
        'permissions',
        permissions.filter((_id) => _id !== id),
      );
    },
  );

  return { options, onChange, onChangeParent };
};
