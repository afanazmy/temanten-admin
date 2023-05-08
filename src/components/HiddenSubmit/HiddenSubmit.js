import { Button, Form } from 'antd';

const HiddenSubmit = () => {
  return (
    <Form.Item hidden>
      <Button htmlType="submit" />
    </Form.Item>
  );
};

export default HiddenSubmit;
