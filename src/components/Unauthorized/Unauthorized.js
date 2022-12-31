import React from 'react';
import { usePage } from 'hooks';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import { appConfig } from 'configuration';

import { FormattedMessage } from 'components/Intl';

const Unauthorized = () => {
  usePage({ title: 'common.Unauthorized access' });

  return (
    <Result
      status="403"
      title="403"
      subTitle={<FormattedMessage id="common.You are not authorized to access this page." />}
      extra={
        <Link to={appConfig.fallbackUrl}>
          <Button type="primary">
            <FormattedMessage id="common.Back Home" />
          </Button>
        </Link>
      }
    />
  );
};

export default Unauthorized;
