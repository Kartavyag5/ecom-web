import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber,Select } from 'antd';
import 'antd/dist/antd.css';
import styles from '../styles/itemForm.module.css';

const ItemForm = () => {
  const [form] = Form.useForm();
  const categories = ['xbox', 'ps5', 'switch', 'pc', 'accessories'];

  return (
    <div className={styles.div}>
      <Form
        form={form}
        layout="vertical"
      > 
        <Form.Item label="Product Name" required tooltip="This is a required field">
          <Input placeholder="enter Product Name" />
        </Form.Item>
        <Form.Item label="Select Category">
          <Select>
            <Select.Option value="select"></Select.Option>
            {categories.map((category,index)=>(
              <Select.Option key={index} value={category}>{category}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item required
          label="Image URL"
          tooltip={{
            title: 'Tooltip with customize icon',
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input placeholder="Enter Image URL" />
        </Form.Item>
        <Form.Item required label="Price">
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ItemForm;