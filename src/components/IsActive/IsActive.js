import { useStyleRegister } from '@ant-design/cssinjs';
import { Badge, theme as _theme } from 'antd';
import classNames from 'classnames';
import { FormattedMessage } from 'components/Intl';
import { genIsActiveStyle } from './isActive.style';

/**
 *
 * @param {React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>} props
 * @returns
 */
const IsActive = ({ isActive, ...props }) => {
  const prefixCls = 'snow-ui-is-active';
  const { theme, token, hashId } = _theme.useToken();
  const wrapSSR = useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
    genIsActiveStyle(prefixCls, token),
  ]);

  const isActives = {
    0: { label: <FormattedMessage id="common.Inactive" />, className: 'inactive' },
    1: { label: <FormattedMessage id="common.Active" />, className: 'active' },
  };
  const { label, className } = isActives?.[isActive] || {};

  return wrapSSR(
    <div {...props} className={classNames(prefixCls, hashId, props.className, className)}>
      <Badge status="default" text={label} />
    </div>,
  );
};

export default IsActive;
