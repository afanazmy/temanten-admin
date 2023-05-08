import { Button, Form } from 'antd';
import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';

import Drawer from './Drawer';
import { FormattedMessage } from 'components/Intl';

/**
 * @typedef {Object} ChildrenParam
 * @property {boolean} loading
 * @property {Object} data
 * @property {Object} error
 * @property {() => void} refreshData
 * @property {(values: any) => void} onFinish
 *
 * @typedef {Object} IDrawerUpdate
 * @property {string} id
 * @property {(param: ChildrenParam) => import('react').ReactNode} children
 * @property {import('axios').AxiosInstance['get']} getService
 * @property {import('axios').AxiosInstance['put']} putService
 *
 * @typedef {import('antd').DrawerProps & IDrawerUpdate} DrawerUpdateProps
 *
 * @param {DrawerUpdateProps} props
 */
const DrawerUpdate = (props) => {
  // supaya ketika buka drawer langsung loading
  const [loading, setLoading] = useState(true);

  const [form] = Form.useForm();
  const { id, children, refresh, getService, putService, ...restProps } = props;

  const {
    run: getData,
    data,
    error,
    refresh: refreshData,
  } = useRequest(getService, {
    manual: true,
    onFinally: () => setLoading(false),
    onBefore: () => (!loading ? setLoading(true) : false),
  });

  useEffect(() => {
    if (!id || !props.open) return;
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open, id]);

  const { run: putData, loading: loadingPut } = useRequest(putService, {
    manual: true,
    onSuccess: () => {
      props?.onClose?.();
      refresh?.();
    },
  });

  const onFinish = (values) => putData(values);

  return (
    <Drawer
      placement="right"
      {...restProps}
      extra={
        <Button type="primary" loading={loadingPut} onClick={() => form?.submit?.()}>
          <FormattedMessage id="common.Save" />
        </Button>
      }
    >
      {children({ form, loading, data: data?.result, error, onFinish, refreshData })}
    </Drawer>
  );
};

export default DrawerUpdate;
