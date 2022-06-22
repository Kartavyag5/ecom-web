import { useRouter } from "next/router";
import { useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import styles from '../../styles/ShopPage.module.css';
import { useSelector } from "react-redux";
import axios from "axios";

const CategoryPage = ({products2})=>{
    const router = useRouter();
    const productsData = useSelector((state) => state.items.products);
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Results for {router.query.category}
            </h1>
            <div className={styles.cards}>
                {products2.map((product)=>(
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;

export async function getServerSideProps(ctx){
    const category = ctx.query.category;
    const res = await axios.get('http://localhost:3000/products');
    const products = res.data;
    const products2 = products.filter(product=> product.category === category);
    return {props: {products2}};
} 
