import { paths } from 'routes';
import { OptionalField } from 'components';
import { removeDataForLogout } from 'helpers';
import { notification, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

import { envs } from './envs';
import { getToken } from './auth';

const { Text, Paragraph } = Typography;

export const apiBaseUrl = (baseURL) => baseURL ?? envs('REACT_APP_API_URL');

export const withParams = (endpoint, params = {}) => {
  let str = endpoint;
  Object.keys(params).map((key) => (str = str.replace(`:${key}`, params[key])));
  return str;
};

export const interceptors = {
  request: {
    /** @param {import('axios').AxiosRequestConfig} config */
    onSuccess: (config) => {
      config.headers.common['Accept'] = 'application/json';

      // remove empty request
      for (const key of Object.keys(config.params || {})) {
        if (config.params?.[key] === '') {
          delete config.params?.[key];
        }
      }

      let token = getToken();
      if (!token) return config;

      config.headers.common['Authorization'] = token;

      return config;
    },
    onError: (error) => Promise.reject(error),
  },

  response: {
    /**
     * @param {import('axios').AxiosResponse} response
     * @param {{raw: Boolean, showMessage: Boolean, intl: import('languages')['intl']}} param
     */
    onSuccess: (response, { raw, showMessage, intl }) => {
      const message = response?.data?.message;
      if (!showMessage && !raw) return response?.data;
      if (!showMessage && raw) return response;
      if (!message && !raw) return response?.data;
      if (!message && raw) return response;

      notification.success({ message: intl?.({ id: 'common.Success' }), description: message });

      if (raw) return response;
      return response?.data;
    },

    /**
     * @param {import('axios').AxiosResponse} error
     * @param {{intl: import('languages')['intl'], navigate: import('react-router-dom').NavigateFunction}} param
     */
    onError: (error, { intl, navigate }) => {
      const { data } = error?.response || {};
      const { exception, file, line, trace, errors, info } = data || {};

      let btn;
      const key = `notif-${Date.now()}`;
      let title = intl?.({ id: 'common.Error' });
      const status = error?.response?.status || error?.code;
      let message = data?.message || error?.message || error;

      if (exception || file || line || trace || info) {
        title = intl?.({ id: 'common.Something went wrong' });
        message = intl?.({ id: 'common.Please contact Technical Support by attaching response data from server.' });

        let text;
        try {
          text = JSON.stringify({ exception, file, line, info, message: data?.message });
        } catch (error) {
          text = 'No information';
        }

        btn = (
          <Text
            copyable={{
              text,
              icon: [
                <Text className="text-primary">{intl?.({ id: 'common.Copy server response' })}</Text>,
                <Text className="text-primary">
                  {intl?.({ id: 'common.Copy server response' })} <CheckOutlined />
                </Text>,
              ],
            }}
          />
        );
      }

      let showErrors = null;
      if (errors) {
        showErrors = (
          <OptionalField forceRender={false} title={intl?.({ id: 'common.Show more' })}>
            <Paragraph className="pl-24 m-0">
              <ul>
                {Object.keys(errors)?.map?.((key) =>
                  errors?.[key]?.map?.((error, key) => <li key={`error-detail-${key}`}>{error}</li>),
                )}
              </ul>
            </Paragraph>
          </OptionalField>
        );
      }

      notification.error({
        key,
        btn,
        message: title,
        description: (
          <>
            <div>{`[${status}] ${message}`}</div>
            {showErrors}
          </>
        ),
      });

      const isUnauthorized = status === 401;
      // redirect if token expired
      if (isUnauthorized) {
        removeDataForLogout();
        navigate?.(paths.signIn);
      }

      return Promise.reject(error);
    },
  },
};

export const defaultParams = {
  page: 'page',
  pageSize: 'limit',
  search: 'search',
  sortBy: 'sortBy',
  sortType: 'sortType',
};
