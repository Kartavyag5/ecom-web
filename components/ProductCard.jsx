import Image from 'next/image';
import styles from '../styles/ProductCard.module.css'
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart.slice';
import { useEffect, useState } from 'react';

const ProductCard = ({product})=>{
    const dispatch = useDispatch();
    const [loggedUser, setLoggedUser] = useState({});

    useEffect(()=>{
        const user = localStorage.getItem('loggedUserInfo');
        setLoggedUser(JSON.parse(user))
    },[])
    
    return(
        <div className={styles}>
            <Image className={styles.image} src={product.image} height={300} width={220} alt="card Image" />
            <h4 className={styles.title}>{product.product}</h4> 
            <h5 className={styles.category}>{product.category}</h5>
            <p>$ {product.price}</p>
            <button 
                className={styles.button}
                onClick = {()=> loggedUser ? dispatch(addToCart({user_id:loggedUser.id, product})): alert("login First, then you can add items in cart")}
            >
            Add to Cart
            </button> 
        </div>
    );
};

export default ProductCard;