import classNames from 'classnames';
import Icon from '@ant-design/icons';
import { useMemoizedFn } from 'ahooks';
import { useIntl } from 'components/Intl';
import { Search as SearchIc } from 'assets';
import { Input, theme as antTheme } from 'antd';
import { useStyleRegister } from '@ant-design/cssinjs';

const SearchIcon = () => <SearchIc size={16} />;

/**
 *
 * @param {import("antd").InputProps} props
 * @returns
 */
const Search = (props) => {
  const prefixCls = 'snow-ui-search';

  const { formatMessage } = useIntl();
  const { theme, token, hashId } = antTheme.useToken();

  const genSearchStyle = useMemoizedFn(
    /**
     *
     * @param {string} prefixCls
     * @param {import('antd').GlobalToken} token
     * @returns {import('@ant-design/cssinjs').CSSInterpolation}
     */
    (prefixCls, token) => ({
      [`.${prefixCls}`]: {
        '.ant-input-group-addon': {
          backgroundColor: `${token?.Search?.colorBgContainer} !important`,

          svg: {
            fill: `${token?.Search?.colorPlaceholder}`,
          },
        },

        input: {
          backgroundColor: `${token?.Search?.colorBgContainer} !important`,

          '&:hover, &:focus': {
            borderColor: `${token?.colorBorder} !important`,
            boxShadow: 'none !important',
          },
        },
      },
    }),
  );

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
