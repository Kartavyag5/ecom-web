import ProductCard from '../components/ProductCard';
import styles from '../styles/ShopPage.module.css';
import {getProducts} from './api/products/index';
import data from '../data.json';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {addItem,deleteItem} from '../redux/item.slice';
import Link from 'next/link';
import axios from 'axios';
import { getItems } from '../redux/item.slice';

const x = {
    id: 111,
    product: "Cyberpunk 2077",
    category: "xbox",
    image: "https://imgur.com/3CF1UhY.png",
    price: 36.49
  }

const ShopPage = ({products})=>{
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getItems(products))
    }, [])
    const productsData = useSelector((state) => state.items.products)
    
    return (
        <div className={styles.container}>
            <div>
                {/* <button onClick={() => dispatch(addItem(x))}>Add Item</button> */}
                <Link href={"/addProduct"}>Add Product</Link>
                <button onClick={() => dispatch(deleteItem(x.id))}>Delete Item</button>
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
    // const data = useSelector((state)=> state.items);
    // const products = data;
    return {props: {products}};
}
