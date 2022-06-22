import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/CartPage.module.css';
import { incrementQuantity, decrementQuantity, removeFromCart, setAllCarts, getUserCart } from '../redux/cart.slice';
import { 
  PlusCircleOutlined,
  MinusCircleOutlined,
  CloseCircleOutlined 
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState, useEffect } from 'react';
import axios from 'axios';



const CartPage = ({carts})=>{
  const cart = useSelector((state)=>state.cart.carts);
  const dispatch = useDispatch();
  const [loggedUser, setLoggedUser] = useState({});
  const [userCart, setUserCart] = useState({});

  // const getTotalPrice = () =>{
  //   return userCart.products.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0);
  // };

  const getLoggedUser = ()=>{
    const loggedUser2 = localStorage.getItem('loggedUserInfo');
    loggedUser2 && setLoggedUser(JSON.parse(loggedUser2))
  }
  const allProducts = useSelector((state)=> state.items.products);
  // const cartProducts = allProducts.map((item)=>userCart.products.some((item2)=>item2.product_id === item.id))

  const getUserCart = ()=>{
    const userCart2 = cart.find((item)=>item.user_id === loggedUser.id);
    setUserCart(userCart2);
 }

  useEffect(()=>{
    getLoggedUser();
    getUserCart();
    console.log("userCart", userCart);
    dispatch(setAllCarts(carts));
  },[])

  return(
    <div className={styles.container}>
      {cart.length === 0 ? (
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
          {cart.map((item)=>(
            <div key={item.id} className = {styles.body}>
              <div className={styles.image}>
                {/* <Image src= {item.image} height={"90"} width={"65"} alt="Cart-image"/> */}
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
          {/* <h2>Grand Total: $ {getTotalPrice()}</h2> */}
        </>
      )}
    </div>
  );
};

export default CartPage;

export async function getStaticProps(){
  const res = await axios.get('http://localhost:3000/carts');
  const carts = res.data
  return {props: {carts}};
}