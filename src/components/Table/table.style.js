/**
 *
 * @param {string} prefixCls
 * @param {import('antd').GlobalToken} token
 * @returns {import('@ant-design/cssinjs').CSSInterpolation}
 */
export const genTableActionStyle = (prefixCls, token) => ({
  [`.${prefixCls}`]: {
    '.btn-table-action': {
      width: '39px',
      height: '39px',
      display: 'flex',
      opacity: '0',
      justifyContent: 'center',
      alignItems: 'center',
      transition: `all ${token.motionDurationMid} ${token.motionEaseInOut}`,
    },
  },
});
