import classNames from 'classnames';
import { useAppProvider } from 'hooks';
import { FormattedMessage } from 'components';
import { Grid, Layout, Typography } from 'antd';

import UserAvatar from './UserAvatar';
import { useMasterLayoutStyle } from '../masterLayout.style';

const { Title, Text } = Typography;
const { Header: AntHeader } = Layout;

const Header = ({ onClickMenu }) => {
  const { app } = useAppProvider();
  const { title } = app || {};

  const { md } = Grid.useBreakpoint();
  const { header } = useMasterLayoutStyle();

  return (
    <AntHeader style={header}>
      {!md ? (
        <div className="menu-container">
          <Text onClick={onClickMenu}>{/* <Icon component={icons.HamburgerMenu} /> */}</Text>
        </div>
      ) : null}

      <div className={classNames('title-container', { 'text-center': !md })}>
        {title ? (
          <Title level={5} className="mb-0">
            <FormattedMessage id={title} />
          </Title>
        ) : null}
      </div>

      <div className="extra-container">
        <UserAvatar />
      </div>
    </AntHeader>
  );
};

export default Header;
