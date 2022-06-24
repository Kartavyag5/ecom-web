import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/CartPage.module.css';
import { incrementQuantity, decrementQuantity, removeFromCart, setAllCarts, setUserCart } from '../redux/cart.slice';
import { 
  PlusCircleOutlined,
  MinusCircleOutlined,
  CloseCircleOutlined 
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState, useEffect } from 'react';
import axios from 'axios';



const CartPage = ({carts, products})=>{
  const cart = useSelector((state)=>state.cart.carts);
  const dispatch = useDispatch();
  const [loggedUser, setLoggedUser] = useState({});
  const [userCart, setUserCart] = useState({});
  const [cartProducts, setCartProducts] = useState([])

  
  const getTotalPrice = () =>{
    return userCart?.products?.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0);
  };

  const user_cart = useSelector((state)=>state.cart.userCart)

  useEffect(()=>{
    const loggedInUser = JSON.parse(localStorage.getItem('loggedUserInfo'))
    const local_userCart = JSON.parse(localStorage.getItem('userCart'))
    // const loggedUserCart = carts.find(item => item.user_id === loggedInUser.id)
    setLoggedUser(loggedInUser)
    setUserCart(local_userCart)
    dispatch(setAllCarts(carts));
  },[dispatch, carts, products])

  return(
    <div className={styles.container}>
      {!user_cart ? (
        <h1>Your Cart is Empty!!</h1>  
      ):(
        <>
          <div className={styles.header}>
            <div>Image</div>
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Actions</div>
            <div>Total Price</div>
          </div>
          {userCart?.products?.map((item)=>(
            <div key={item.id} className = {styles.body}>
              <div className={styles.image}>
                <Image src= {item.image} height={"90"} width={"65"} alt="Cart-image"/>
              </div>
              <p>{item.product}</p>
              <p>$ {item.price}</p>
              <p>{item.quantity}</p>
              <div className={styles.button}>
                <button onClick={()=> dispatch(incrementQuantity(item.id))}>
                  <abbr className={styles.abbr} title="Increase quantity">+</abbr>
                </button>
                <button onClick={()=> dispatch(decrementQuantity(item.id))}>
                  <abbr className={styles.abbr} title="Decrease quantity">-</abbr>
                </button>
                <button onClick={()=> dispatch(removeFromCart(item.id))}>
                  <abbr className={styles.abbr} title="Remove Item">x</abbr>
                </button>
              </div>
              <p>$ {item.quantity * item.price}</p>
            </div>
          ))}
          <h2>Grand Total: $ {getTotalPrice()}</h2>
        </>
      )}
    </div>
  );
};

export default CartPage;

export async function getStaticProps(){
  const res = await axios.get('http://localhost:3000/carts');
  const res2 = await axios.get('http://localhost:3000/products')
  const carts = res.data
  const products = res2.data
  return {props: {carts, products}};
}