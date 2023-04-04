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

    '&:focus-within': {
      '.ant-input-group-addon': {
        backgroundColor: `${token?.Search?.colorItemBgActive} !important`,
      },
    },
  },
});
