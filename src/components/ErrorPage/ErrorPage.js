import React from 'react';
import { usePage } from 'hooks';
import { Button, Result } from 'antd';
import { appConfig } from 'configuration';
import { useNavigate } from 'react-router-dom';

import { FormattedMessage } from 'components/Intl';

const ErrorPage = () => {
  const navigate = useNavigate();
  usePage({ title: 'common.Something went wrong' });

  return (
    <Result
      status="500"
      title="500"
      subTitle={<FormattedMessage id="common.Sorry, something went wrong." />}
      extra={
        <Button type="primary" onClick={() => navigate(appConfig.fallbackUrl)}>
          <FormattedMessage id="common.Back Home" />
        </Button>
      }
    />
  );
};

export default ErrorPage;
