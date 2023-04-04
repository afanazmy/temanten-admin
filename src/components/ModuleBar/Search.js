import classNames from 'classnames';
import Icon from '@ant-design/icons';
import { useIntl } from 'components/Intl';
import { Search as SearchIc } from 'assets';
import { Input, theme as _theme } from 'antd';
import { useStyleRegister } from '@ant-design/cssinjs';

import { genSearchStyle } from './moduleBar.style';

const SearchIcon = () => <SearchIc size={16} />;

/**
 *
 * @param {import("antd").InputProps} props
 * @returns
 */
const Search = (props) => {
  const prefixCls = 'snow-ui-search';

  const { formatMessage } = useIntl();
  const { theme, token, hashId } = _theme.useToken();

  const wrapSSR = useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
    genSearchStyle(prefixCls, token),
  ]);

  return wrapSSR(
    <Input
      {...props}
      addonBefore={<Icon component={SearchIcon} />}
      placeholder={formatMessage({ id: 'common.Search' })}
      className={classNames(prefixCls, hashId, props.className)}
    />,
  );
};

export default Search;
