import { Button } from 'antd';
import { Plus } from 'assets';
import Icon from '@ant-design/icons';

const ModuleBar = ({ addPermission }) => {
  return (
    <div className="module-bar">{addPermission ? <Button type="text" icon={<Icon component={Plus} />} /> : null}</div>
  );
};

export default ModuleBar;
