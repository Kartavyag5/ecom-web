import ProductCard from '../components/ProductCard';
import styles from '../styles/ShopPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {addItem,deleteItem} from '../redux/item.slice';
import { setAllCarts, getUserCart, setUserCart} from '../redux/cart.slice';
import Link from 'next/link';
import axios from 'axios';
import { getItems } from '../redux/item.slice';

const ShopPage = ({products,carts})=>{
    const dispatch = useDispatch()
    const [user, setUser] = useState({});
    const user_cart = useSelector((state)=>state.cart.userCart)
    console.log("user_cart",user_cart);
    console.log('user',user);
    
    
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("loggedUserInfo")));
        dispatch(getItems(products));
        dispatch(setAllCarts(carts));
    }, [])

    useEffect(() => {
        const user2 = JSON.parse(localStorage.getItem("loggedUserInfo"))
        if(user2){

            const userCart = carts.find(item => item.user_id === user2.id)
            const cartProducts = userCart?.products.map((product)=> products.find((item)=> item.id === product.product_id ))
            
            const cartProducts_qauntity = cartProducts?.map((product)=>{
                const cartItem = userCart.products.find(item => item.product_id === product.id)
                return {...product, quantity: cartItem.quantity}
            })
            localStorage.setItem('userCart', JSON.stringify({user_id:user.id, products:cartProducts_qauntity}));
            setCartData({user_id:user.id, products:cartProducts_qauntity})
            dispatch(setUserCart({user_id:user.id, products:cartProducts_qauntity}))
        }
    }, [carts, products])

    const setCartData = (values) => {
        axios.post("http://localhost:3000/userCart", values).then((response) => {
        });
        dispatch(setUserCart(values))
      };

    return (
        <div className={styles.container}>
            <div>
                <Link href={"/addProduct"}><button className={styles.button} type='primary'>Add New Product</button></Link>
                <button className={styles.button} type='danger' onClick={() => dispatch(deleteItem(x.id))}>Delete Item</button>
                <p className={styles.username}>{user && 'Welcome: '.concat(user?.name)}</p>
            </div>

            <h1 className={styles.title}>All Result</h1>
            <div className={styles.cards}>
                {products.map((product)=>(
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ShopPage;

export async function getStaticProps(){
    const res = await axios.get('http://localhost:3000/products');
    const res2 = await axios.get('http://localhost:3000/carts');
    const products = res.data
    const carts = res2.data
    return {props: {products, carts}};
}
