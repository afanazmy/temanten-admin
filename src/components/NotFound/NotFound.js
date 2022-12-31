import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import { appConfig } from 'configuration';

import { FormattedMessage } from 'components/Intl';
import { usePage } from 'hooks';

const NotFound = () => {
  usePage({ title: 'common.Not Found' });

  return (
    <Result
      status="404"
      title="404"
      subTitle={<FormattedMessage id="common.The requested URL was not found on this server." />}
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

export default NotFound;
