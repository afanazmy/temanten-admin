/**
 * Global token, untuk theme dark dan light
 *
 * @type {import("antd/es/config-provider").ConfigProviderProps['theme']['token']}
 */
const token = {
  fontFamily: "'Inter', sans-serif",
  borderRadius: 8,
};

export const theme = {
  /** @type {import("antd/es/config-provider").ConfigProviderProps['theme']} */
  light: {
    token: { ...token, colorPrimary: '#1C1C1C', borderRadius: 8 },
    components: {
      Menu: { colorItemTextSelected: '#1C1C1C', colorItemBgSelected: 'rgba(0, 0, 0, 0.05)' },
      Table: {
        colorTextHeading: 'rgba(0, 0, 0, 0.4)',
        colorFillAlter: '#F7F9FB',
        fontSize: 12,
        controlItemBgActive: 'rgba(0, 0, 0, 0.02)',
        controlItemBgActiveHover: 'rgba(0, 0, 0, 0.04)',
      },
      Avatar: { colorTextPlaceholder: '#1C1C1C' },
      Select: { controlItemBgActive: 'rgba(0, 0, 0, 0.05)' },
      Badge: { fontSize: 12 },
      Checkbox: { borderRadiusSM: 4 },
      DatePicker: { controlItemBgActive: 'rgba(0, 0, 0, 0.05)' },
      ModuleBar: { colorBgContainer: '#F7F9FB' },
      Search: {
        colorBgContainer: 'rgba(255, 255, 255, 0.8)',
        colorPlaceholder: 'rgba(0, 0, 0, 0.2)',
        colorItemBgActive: 'rgba(255, 255, 255, 1)',
      },
      IsActive: {
        colorTextInactive: 'rgba(0, 0, 0, 0.4)',
        colorTextActive: '#4AA785',
        colorBadgeInactive: 'rgba(0, 0, 0, 0.4)',
        colorBadgeActive: '#A1E3CB',
      },
    },
  },
};
