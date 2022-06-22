import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { redirect } from '../common/common-methods'
import { useRouter } from 'next/router';
import Logo from '../public/logo.png';
import Image from 'next/image';


const Navbar = () =>{
    const router = useRouter()
    const [loggedUser, setLoggedUser] = useState({});
    const [userCart, setUserCart] = useState([]);
    const cart = useSelector((state)=>state.cart.carts);

    useEffect(() => {
        getUserCart(cart);
    }, [cart])
    
    const getItemsCount = ()=>{
        return userCart.reduce((accumulator, item)=> accumulator + item.quantity, 0);
    };

    const getUserCart = (cartItems)=>{
        console.log('myyyyy', cart)
        const logUser = JSON.parse(localStorage.getItem("loggedUserInfo"))
        setLoggedUser(logUser)
        const userCart2 = cartItems.find((item)=>item.user_id === logUser.id);
        console.log('eeee', userCart2)
        setUserCart(userCart2?.products);
    }

    const logout = () => {
        localStorage.removeItem('loggedUserInfo');
        setLoggedUser({});
        alert('successfully logout');
        redirect('login');
    }

        return (
        <nav className={styles.navbar}>
            <div className={styles.logodiv}>
                <Image className={styles.logo} src={Logo} alt={'logo'} />
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