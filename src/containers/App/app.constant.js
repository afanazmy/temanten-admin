/**
 * Global token, untuk theme dark dan light
 *
 * @type {import("antd/es/config-provider").ConfigProviderProps['theme']['token']}
 */
const token = {
  fontFamily: "'Inter', sans-serif",
};

export const theme = {
  /** @type {import("antd/es/config-provider").ConfigProviderProps['theme']} */
  light: {
    token: { ...token, colorPrimary: '#1C1C1C', borderRadius: 8 },
    components: {
      Menu: { colorItemTextSelected: '#1C1C1C', colorItemBgSelected: 'rgba(0, 0, 0, 0.05)' },
      Table: { colorTextHeading: 'rgba(0, 0, 0, 0.4)' },
      Avatar: { colorTextPlaceholder: '#1C1C1C' },
      ModuleBar: { backgroundColor: '#F7F9FB' },
      Search: { backgroundColor: 'rgba(255, 255, 255, 0.8)', placeholderColor: 'rgba(0, 0, 0, 0.2)' },
    },
  },
};
