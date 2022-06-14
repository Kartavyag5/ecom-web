import Image from 'next/image';
import styles from '../styles/ProductCard.module.css'
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart.slice';

const ProductCard = ({product})=>{
    const dispatch = useDispatch();
    return(
        <div className={styles}>
            <Image className={styles.image} src={product.image} height={300} width={220} alt="card Image" />
            <h4 className={styles.title}>{product.product}</h4> 
            <h5 className={styles.category}>{product.category}</h5>
            <p>$ {product.price}</p>
            <button 
                className={styles.button}
                onClick = {()=> dispatch(addToCart(product))}
            >
            Add to Cart
            </button> 
        </div>
    );
};

export default ProductCard;