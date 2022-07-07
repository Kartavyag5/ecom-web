import LoginRegForm from "../components/LoginRegForm";
import axios from "axios";

const LoginPage = ({users})=>{
  return(   
      <div>
        <LoginRegForm users={users}/>
      </div>
  )
}

export default LoginPage;

export async function getStaticProps(){
  const res = await axios.get('http://localhost:3000/users');
  const users = res?.data;
  return {props: {users}};
};