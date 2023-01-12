import axios from 'axios';
import { message } from 'antd';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { apiBaseUrl, interceptors } from 'utils';
import { useEffect, useRef, useState } from 'react';
import { deleteEmptyRequest, getParamsOrder } from 'helpers';
import { useCreation, useMemoizedFn, useRequest, useSetState } from 'ahooks';

/**
 * @typedef {"get" | "post" | "postForm" | "put" | "putForm" | "patch" | "patchForm" | "delete"} Method
 * @param {String} endpoint
 * @param {{baseURL: String, raw: Boolean, showMessage: Boolean, method: Method}} config
 */
export const useAPI = (endpoint, config = {}) => {
  const { raw, showMessage } = config;
  const navigate = useNavigate();
  const { formatMessage } = useIntl();

  const instance = useCreation(() => {
    const instance = axios.create(config);
    instance.defaults.baseURL = apiBaseUrl(config.baseURL);

    instance.interceptors.request.use(interceptors.request.onSuccess, interceptors.request.onError);

    instance.interceptors.response.use(
      (response) => interceptors.response.onSuccess(response, { raw, showMessage, intl: formatMessage }),
      (error) => interceptors.response.onError(error, { intl: formatMessage, navigate }),
    );

    return instance;
  }, [config]);

  const method = config.method || 'get';
  const onlyTwoParams = method === 'get' || method === 'delete';

  /**
   * @param {Object} param
   * @param {import('axios').AxiosRequestConfig} _config override default config on API call
   * @returns
   */
  const request = useMemoizedFn((params, _config = {}) => {
    return instance?.[method]?.(
      _config?.url || endpoint || config?.url,
      onlyTwoParams ? { ...config, ..._config, params } : params,
      { ...config, ..._config },
    );
  });

  return request;
};

/**
 * @typedef {Object} IOptions
 * @property {import('antd').FormInstance} form
 * @property {Boolean} paginate
 *
 * @typedef {Object} IResult
 * @property {() => void} onFilter
 * @property {() => void} onReload
 * @property {() => void} onResetFilter
 * @property {(data: Object) => void} onFinishFilter
 * @property {import('antd').TableProps} tableProps
 *
 * @param {import('ahooks/lib/useRequest/src/types').Service} service
 * @param {import('ahooks/lib/useRequest/src/types').Options & IOptions} options
 * @param {import('ahooks/lib/useRequest/src/types').Plugin} plugins
 * @return {import('ahooks/lib/useRequest/src/types').Result & IResult}
 */
export const useTable = (service, options, plugins) => {
  const { form, paginate = true, ...restOptions } = options || {};
  const [table, setTable] = useSetState({ sorts: [], currentPage: 1, pageSize: undefined });
  const { data, run: _run, params, ...rest } = useRequest(service, restOptions, plugins);
  const [param = {}] = params || [];

  useEffect(() => {
    if (param.page === table.currentPage) return;
    setTable({ currentPage: param.page });
  }, [param.page, table.currentPage, setTable]);

  const run = useMemoizedFn((params = {}) => _run({ ...param, ...params, page: params?.page || 1 }));

  const onTableChange = useMemoizedFn(({ pageSize, current }, _f, sort, { action }) => {
    let _sorts;
    const isSort = action === 'sort';
    const isArray = Array.isArray(sort);

    if (isSort && !isArray && !getParamsOrder(sort?.order)) _sorts = [];
    else if (isSort && !isArray) _sorts = [{ sortBy: sort?.field, sortType: getParamsOrder(sort?.order) }];
    else if (isSort) _sorts = sort.map((sort) => ({ sortBy: sort?.field, sortType: getParamsOrder(sort?.order) }));

    setTable({ currentPage: current, sorts: _sorts || table.sorts, pageSize });
    run({ ...param, page: current, sorts: _sorts || table.sorts, pagination: pageSize });
  });

  /** untuk men-trigger supaya form filter nya disubmit */
  const onFilter = useMemoizedFn(() => form?.submit?.());

  /** callback `onFinish` yang digunakan di form filternya */
  const onFinishFilter = useMemoizedFn((data = {}) => {
    deleteEmptyRequest(data);
    const { query, ...rest } = data;
    const noOtherRequest = !Object.keys(rest)?.length;
    if (!query && noOtherRequest) return run({ search: null, page: 1 });
    return run({ search: { ...data }, page: 1 });
  });

  const onResetFilter = useMemoizedFn(() => run({ search: null, page: 1 }));

  /** untuk button reload */
  const onReload = rest.refresh;

  const _params = useCreation(
    () => [{ ...param, pagination: paginate ? param?.pagination || data?.result?.perPage : undefined }],
    [JSON.stringify(param), param?.pagination, data?.result?.perPage],
  );

  const tableProps = useCreation(
    () => ({
      loading: rest.loading,
      dataSource: data?.result?.data,
      onChange: onTableChange,
      pagination: paginate
        ? {
            showSizeChanger: true,
            total: data?.result?.total,
            current: table?.currentPage,
            pageSize: data?.result?.perPage,
            pageSizeOptions: [10, 20, 50, 100],
          }
        : false,
    }),
    [
      paginate,
      rest.loading,
      table?.currentPage,
      data?.result?.total,
      data?.result?.perPage,
      JSON.stringify(data?.result?.data),
    ],
  );

  return {
    ...rest,
    run,
    data,
    onFilter,
    onReload,
    onResetFilter,
    onFinishFilter,
    sorts: table.sorts,
    params: _params,
    tableProps,
  };
};

/**
 * Digunakan untuk store data ke API
 * @param {Object} props
 * @param {Boolean} props.open
 * @param {import("antd").FormInstance} props.form
 * @param {() => void} props.service
 * @param {Array.<{key: String, callback: () => void}>} props.actions
 * @param {() => void} props.onSuccessAdd
 * @param {() => void} props.onCancel
 */
export const useStore = ({ open, form, service, actions, onSuccessAdd, onCancel }) => {
  const callback = useRef('save');
  const { error, loading, runAsync: postData } = useRequest(service, { manual: true });

  useEffect(() => (open ? form?.resetFields?.() : undefined), [form, open]);

  // menghindari glitch/blink modal close
  const _onSuccessAdd = useMemoizedFn((response, request) =>
    setTimeout(() => onSuccessAdd(response || {}, request), 500),
  );

  const onFinish = useMemoizedFn(async (data) => {
    try {
      const response = await postData(data);
      onCancel?.();
      _onSuccessAdd?.(response, data);
    } catch (error) {
      console.error(error);
    }
  });

  const onFinishAndNew = useMemoizedFn(async (data) => {
    try {
      const response = await postData(data);
      form?.resetFields?.();
      onSuccessAdd?.(response, data);
    } catch (error) {
      console.error(error);
    }
  });

  const onSaveClick = useMemoizedFn((data) => {
    let callbacks = { save: onFinish, saveAndNew: onFinishAndNew };

    actions?.map?.((action) => {
      const { key, callback } = action || {};
      if (!key || typeof callback !== 'function') return false;
      return Object.assign(callbacks, { [key]: callback });
    });

    return callbacks?.[callback.current]?.(data);
  });

  const onMenuClick = useMemoizedFn(({ key }) => {
    callback.current = key;
    form?.submit?.();
  });

  const _onFinish = useMemoizedFn((data) => onSaveClick(data));

  return { loading, onMenuClick, error, onFinish: _onFinish };
};

/**
 * Digunakan untuk update data ke API
 * @param {Object} props
 * @param {String} props.id data ID
 * @param {Boolean} props.open
 * @param {import('antd').FormInstance} props.form
 * @param {() => void} props.onClose
 * @param {() => void} props.getService
 * @param {() => void} props.putService
 * @param {Array.<{key: String, callback: () => void}>} props.actions
 * @param {() => void} props.onSuccessUpdate
 * @returns
 */
export const useUpdate = ({ id, open, form, onClose, getService, putService, actions, onSuccessUpdate }) => {
  const callback = useRef('save');
  const { formatMessage } = useIntl();
  const [loading, setLoading] = useState(true); // supaya ketika buka drawer langsung loading

  const {
    run: getData,
    data,
    refresh: getRefresh,
    refreshAsync: getRefreshAsync,
  } = useRequest(getService, {
    manual: true,
    onFinally: () => setLoading(false),
    onBefore: () => (!loading ? setLoading(true) : false),
  });
  const {
    error,
    run: putData,
    loading: loadingSubmit,
  } = useRequest(putService, {
    manual: true,
    onSuccess: onSuccessUpdate,
  });

  useEffect(() => {
    if (!id) return;
    getData();
  }, [open, id, getData]);

  const onFinish = useMemoizedFn((data) => {
    if (form?.isFieldsTouched()) return putData(data);
    message.info(formatMessage({ id: 'No changes to save' }));
    onClose?.();
  });

  const onSaveClick = useMemoizedFn((data) => {
    let callbacks = { save: onFinish };

    actions?.map?.((action) => {
      const { key, callback } = action || {};
      if (!key || typeof callback !== 'function') return false;
      return Object.assign(callbacks, { [key]: callback });
    });

    return callbacks?.[callback?.current]?.(data, { getRefresh, getRefreshAsync });
  });

  const onMenuClick = useMemoizedFn(({ key }) => {
    callback.current = key;
    form?.submit?.();
  });

  const _onFinish = useMemoizedFn((data) => onSaveClick(data));

  return { loadingSubmit, loading, data, error, onFinish: _onFinish, onMenuClick, getRefresh, getRefreshAsync };
};
