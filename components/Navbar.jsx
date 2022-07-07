import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { redirect } from '../common/common-methods'
import { useRouter } from 'next/router';
import Logo from '../public/logo.png';
import Image from 'next/image';
import { Input } from 'antd';
import 'antd/dist/antd.css';



const Navbar = () =>{
    const router = useRouter()
    const [loggedUser, setLoggedUser] = useState({});
    const [userCart, setUserCart] = useState([]);
    const cart = useSelector((state)=>state.cart.carts);
    const user_cart = useSelector((state)=>state.cart.userCart);

    useEffect(() => {
        getUserCart(cart);

    }, [cart,user_cart])
    
    const getItemsCount = ()=>{
        return userCart?.products?.reduce((accumulator, item)=> accumulator + item.quantity, 0);
    };

    const getUserCart = ()=>{
        const logUser = JSON.parse(localStorage.getItem("loggedUserInfo"))
        setLoggedUser(logUser)
        setUserCart(JSON.parse(localStorage.getItem("userCart")));
    }

    const logout = () => {
        localStorage.removeItem('loggedUserInfo');
        setLoggedUser({});
        alert('successfully logout');
        redirect('login');
    }

    const onSearch = (value) => console.log(value);

    const {Search} = Input;

        return (
        <nav className={styles.navbar}>
            <div className={styles.logodiv}>
                <Image className={styles.logo} src={Logo} alt={'logo'} />
            </div>
            <div className={styles.searchbar}>
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
            />
            </div>
            
            <ul className={styles.links}>
                <li className={router.route === '/' ? styles.navlinkActive : styles.navlink}>
                    <Link href={"/"}>Home</Link>
                </li>
                <li className={router.route === '/shop' ? styles.navlinkActive : styles.navlink}>
                    <Link href={"/shop"}>Shop</Link>
                </li>
                <li className={router.route === '/login' ? styles.navlinkActive : styles.navlink}>
                    {!loggedUser ? 
                    <Link href={"/login"}>Login</Link>
                    :
                    <p style={{"cursor": "pointer !important"}} className={styles.navlink} onClick={()=>logout()}>Logout </p>
                    }
                </li>
                <li className={router.route === '/cart' ? styles.navlinkActive : styles.navlink}>
                    {loggedUser && 
                    <Link href={"/cart"}>
                        Cart 
                    </Link>
                    }
                    {loggedUser && `(${getItemsCount()})`}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;