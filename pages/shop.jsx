import ProductCard from '../components/ProductCard';
import styles from '../styles/ShopPage.module.css';
import {getProducts} from './api/products/index';
import data from '../data.json';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {addItem,deleteItem} from '../redux/item.slice';
import Link from 'next/link';
import axios from 'axios';
import { getItems } from '../redux/item.slice';

const ShopPage = ({products})=>{
    const dispatch = useDispatch()
    const [user, setUser] = useState({});
    
    useEffect(() => {
        const user1 = localStorage.getItem("loggedUserInfo");
        setUser(JSON.parse(user1));
        dispatch(getItems(products))
    }, [])
    const productsData = useSelector((state) => state.items.products)
    
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
    const products = res.data
    console.log("products",products); 
    return {props: {products}};
}
