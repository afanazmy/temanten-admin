import { useRequest } from 'ahooks';
import { Button, Form } from 'antd';

import Drawer from './Drawer';
import { FormattedMessage } from 'components/Intl';

/**
 * @typedef {Object} ChildrenParam
 * @property {import('antd').FormInstance} form
 * @property {(values: any) => void} onFinish
 * @property {Object} error
 *
 * @typedef {Object} IDrawerAdd
 * @property {(param: ChildrenParam) => import('react').ReactNode} children
 * @property {() => void} refresh
 * @property {import('axios').AxiosInstance['post']} postService
 *
 * @typedef {import('antd').DrawerProps & IDrawerAdd} DrawerAddProps
 *
 * @param {DrawerAddProps} props
 */
const DrawerAdd = (props) => {
  const [form] = Form.useForm();
  const { children, refresh, postService, ...restProps } = props;

  const {
    run: postData,
    error,
    loading,
  } = useRequest(postService, {
    manual: true,
    onSuccess: () => {
      form?.resetFields?.();
      props?.onClose?.();
      refresh?.();
    },
  });

  const onFinish = (values) => postData(values);

  return (
    <Drawer
      placement="left"
      {...restProps}
      extra={
        <Button type="primary" loading={loading} onClick={() => form?.submit?.()}>
          <FormattedMessage id="common.Save" />
        </Button>
      }
    >
      {children({ form, onFinish, error })}
    </Drawer>
  );
};

export default DrawerAdd;
