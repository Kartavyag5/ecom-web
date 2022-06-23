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
  const [userCart, setUserCart2] = useState({});
  const [cartProducts, setCartProducts] = useState([])

  const allProducts = useSelector((state)=> state.items.products);
  
  const getTotalPrice = () =>{
    return cartProducts.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0);
  };

  const user_cart = useSelector((state)=>state.cart.userCart)

  // const getLoggedUser = ()=>{
  //   const loggedUser2 = localStorage.getItem('loggedUserInfo');
  //   loggedUser2 && setLoggedUser(JSON.parse(loggedUser2))
  // }

  // const getUserCart = ()=>{
  //   const userCart2 = cart.find((item)=>item.user_id === loggedUser.id);
  //   setUserCart(userCart2);
  // }

  useEffect(()=>{
    const loggedInUser = JSON.parse(localStorage.getItem('loggedUserInfo'))
    const loggedUserCart = carts.find(item => item.user_id === loggedInUser.id)
    setLoggedUser(loggedInUser)
    setUserCart2(loggedUserCart)
    
    // getLoggedUser();
    // getUserCart();
    dispatch(setAllCarts(carts));
    const loggedUserCartId = loggedUserCart.products.map(item => item.product_id)
    const cP = products.filter(product => loggedUserCartId.includes(product.id))
    const newCP = cP.map(i => {
      const q = loggedUserCart.products.find(c => c.product_id === i.id)
      return {...i, quantity: q.quantity}
    })
    setCartProducts(newCP)
    dispatch(setUserCart(newCP));
    localStorage.setItem('userCart', JSON.stringify(newCP))
  },[dispatch, carts, products])

  console.log('loggedUser::', loggedUser)
  console.log('userCart::', userCart)
  console.log('cartProducts::', cartProducts)

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
          {cartProducts.map((item)=>(
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