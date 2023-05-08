import { Drawer as AntDrawer } from 'antd';

/**
 *
 * @param {import("antd").DrawerProps} props
 * @returns
 */
const Drawer = (props) => {
  return <AntDrawer destroyOnClose={true} {...props} />;
};

export default Drawer;
