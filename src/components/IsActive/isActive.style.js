/**
 *
 * @param {string} prefixCls
 * @param {import('antd').GlobalToken} token
 * @returns {import('@ant-design/cssinjs').CSSInterpolation}
 */
export const genIsActiveStyle = (prefixCls, token) => ({
  [`.${prefixCls}`]: {
    '&.active': {
      '.ant-badge-status-dot': {
        backgroundColor: `${token?.IsActive?.colorBadgeActive} !important`,
      },
      '.ant-badge-status-text': {
        color: `${token?.IsActive?.colorTextActive} !important`,
      },
    },

    '&.inactive': {
      '.ant-badge-status-dot': {
        backgroundColor: `${token?.IsActive?.colorBadgeInactive} !important`,
      },
      '.ant-badge-status-text': {
        color: `${token?.IsActive?.colorTextInactive} !important`,
      },
    },
  },
});
