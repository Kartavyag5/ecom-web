import { 
  Button, 
  Form, 
  Input, 
  InputNumber,
  Select,
  Checkbox,
  Switch
} from 'antd';
import 'antd/dist/antd.css';
import styles from '../styles/itemForm.module.css';
import { useDispatch,useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {addUser,getUsers} from '../redux/user.slice';
import {redirect} from '../common/common-methods';

const LoginRegForm = ({users}) => {
  const [newUser, setNewUser] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const role = ['admin', 'user'];

  const login = (values) =>{
    const loggedUser = users.find((user)=> (values.password === user.password && values.name === user.name))
    localStorage.setItem("loggedUserInfo",JSON.stringify(loggedUser));
    loggedUser && redirect("shop");
    loggedUser ?
      alert("User login successfully!!")
    :
      alert("password/email doesn't match with records, Try again !!")
  }

  const register = (values)=>{
    axios.post("http://localhost:3000/users", values).then((response) => {
    });
    dispatch(addUser(values));
    alert("registration successful,\n now you can login, \n redirecting to login page")
    redirect("login");
  }

  const onFinish = (values) => {
    if (!newUser){
      login(values)
    }
  };

  const RegisterForm = (
    <>
      <h1>User Registration Form</h1>
      <Form
        className={styles.form}
          form={form}
          layout="vertical"
          onFinish={onFinish}
        > 
          <Form.Item name="name" label="User Name" required tooltip="This is a required field" rules={[{ required: true }]}>
            <Input placeholder="enter Product Name" />
          </Form.Item>
          <Form.Item name="email" required rules={[{ required: true, type:'email' }]} label="Email id" tooltip="This is a required field">
          <Input />
          </Form.Item>
          
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Renter Password"
            name="password2"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item required rules={[{ required: true }]} name='phone' label="Phone Number" style={{ width: 150 }}>
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType='submit'>Submit</Button>
          </Form.Item>
      </Form>
    </>
  )

  const LoginForm = (
    <>
      <h1>Login From Here</h1>
      <Form
        form={form}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )

  useEffect(() => {
    dispatch(getUsers(users))
}, []);

const usersData = useSelector((state) => state.users)

  return (
    <div className={styles.div}>
      <Switch checkedChildren="new User? Register here" unCheckedChildren="already user? Login here" onClick={()=>setNewUser(!newUser)} defaultChecked />
    <br />
      {!newUser ? LoginForm : RegisterForm}
    </div>
  );
};

export default LoginRegForm;

// export async function getStaticProps(){
//   const res = await axios.get('http://localhost:3000/users');
//   console.log("res", res?.data);
//   const users = res?.data;
//   return {props: {users}};
// };
