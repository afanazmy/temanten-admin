/**
 *
 * @param {string} prefixCls
 * @param {import('antd').GlobalToken} token
 * @returns {import('@ant-design/cssinjs').CSSInterpolation}
 */
export const genSearchStyle = (prefixCls, token) => ({
  [`.${prefixCls}`]: {
    '.ant-input-group-addon': {
      backgroundColor: `${token?.Search?.colorBgContainer} !important`,

      svg: {
        fill: `${token?.Search?.colorPlaceholder}`,
      },
    },

    '.ant-input-affix-wrapper': {
      borderLeft: 'none !important',
      borderColor: `${token?.colorBorder} !important`,
      backgroundColor: `${token?.Search?.colorBgContainer} !important`,
      boxShadow: 'none !important',
      padding: '0px 8px 0px 0px',
    },

    input: {
      backgroundColor: `${token?.Search?.colorBgContainer} !important`,

      '&:hover, &:focus': {
        borderColor: `${token?.colorBorder} !important`,
        boxShadow: 'none !important',
      },

      '&:focus': {
        backgroundColor: `${token?.Search?.colorItemBgActive} !important`,
      },
    },

    '.ant-input-suffix': {
      backgroundColor: `transparent !important`,
    },

    '&:focus-within': {
      '.ant-input-group-addon, .ant-input-affix-wrapper': {
        backgroundColor: `${token?.Search?.colorItemBgActive} !important`,
      },
    },
  },
});
