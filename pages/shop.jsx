import ProductCard from '../components/ProductCard';
import styles from '../styles/ShopPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {addItem,deleteItem} from '../redux/item.slice';
import { setAllCarts, getUserCart} from '../redux/cart.slice';
import Link from 'next/link';
import axios from 'axios';
import { getItems } from '../redux/item.slice';

const ShopPage = ({products,carts})=>{
    const dispatch = useDispatch()
    const [user, setUser] = useState({});
    const [userCart, setUserCart] = useState({});
    const user_cart = useSelector((state)=>state.cart.userCart)
    
    useEffect(() => {
        console.log("user_cart",user_cart);
        const user1 = localStorage.getItem("loggedUserInfo");
        setUser(JSON.parse(user1));
        dispatch(getItems(products));
        dispatch(setAllCarts(carts));
        const loggedUserCartId = loggedUserCart.products.map(item => item.product_id)
        const cP = products.filter(product => loggedUserCartId.includes(product.id))
        const newCP = cP.map(i => {
        const q = loggedUserCart.products.find(c => c.product_id === i.id)
        return {...i, quantity: q.quantity}
    })
        // console.log("carts",carts);
        // setUserCart(JSON.parse(localStorage.getItem("userCart")))
    }, [])
    const productsData = useSelector((state) => state.items.products)
    const cartData = useSelector((state)=> state.cart.carts)
    const loggedUserCart = cartData.find(item => item.user_id === user.id)

    console.log('shop user Cart', userCart)
    return (
        <div className={styles.container}>
            <div>
                <Link href={"/addProduct"}><button className={styles.button} type='primary'>Add New Product</button></Link>
                <button className={styles.button} type='danger' onClick={() => dispatch(deleteItem(x.id))}>Delete Item</button>
                <p className={styles.username}>{user && 'Welcome: '.concat(user?.name)}</p>
            </div>

            <h1 className={styles.title}>All Result</h1>
            <div className={styles.cards}>
                {productsData.map((product)=>(
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
