import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber,Select } from 'antd';
import 'antd/dist/antd.css';
import styles from '../styles/itemForm.module.css';
import { addItem } from '../redux/item.slice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const ItemForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const categories = ['xbox', 'ps5', 'switch', 'pc', 'accessories'];

  const redirect = (url) =>{
    window.location.href = url;  
  }

  const onFinish = (values) => {
    // values = {...values, id:Math.random()}
    axios.post("http://localhost:3000/products", values).then((response) => {
    });
    dispatch(addItem(values));
    redirect("http://localhost:3001/shop");  
  };

  return (
    <div className={styles.div}>
      <h1>ADD NEW PRODUCT</h1>
      <Form
      className={styles.form}
        form={form}
        layout="vertical"
        onFinish={onFinish}
      > 
        <Form.Item name="product" label="Product Name" required tooltip="This is a required field" rules={[{ required: true }]}>
          <Input placeholder="enter Product Name" />
        </Form.Item>
        <Form.Item name="category" required rules={[{ required: true }]} label="Category" tooltip="This is a required field">
          <Select
            placeholder="select category"
            allowClear
          >
            {categories.map((category,index)=>(
              <Select.Option key={index} value={category}>{category}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item required
        name='image'
        rules={[{ required: true }]}
          label="Image URL"
          tooltip={{
            title: 'Enter Url of Image Source',
            icon: <InfoCircleOutlined />,
          }}
        >
          <Input placeholder="Enter Image URL" />
        </Form.Item>
        <Form.Item required rules={[{ required: true }]} name='price' label="Price">
          <InputNumber />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType='submit'>Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ItemForm;
