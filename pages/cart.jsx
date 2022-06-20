import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/CartPage.module.css';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../redux/cart.slice';
import { 
  PlusCircleOutlined,
  MinusCircleOutlined,
  CloseCircleOutlined 
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState } from 'react';


const CartPage = ()=>{
  const cart = useSelector((state)=>state.cart);
  const dispatch = useDispatch();
  const [loggedUser, setLoggedUser] = useState({});

  const getTotalPrice = () =>{
    return cart.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0);
  };

  const getLoggedUser = ()=>{
    const loggedUser = localStorage.getItem('loggedUserInfo');
    loggedUser && setLoggedUser(JSON.parse(loggedUser))
  }
  
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