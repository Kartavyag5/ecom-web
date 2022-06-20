import Link from 'next/link';
import styles from '../styles/Navbar.module.css';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { redirect } from '../common/common-methods'
import { useRouter } from 'next/router';


const Navbar = () =>{
    const router = useRouter()
    const [loggedUser, setLoggedUser] = useState({});
    const cart = useSelector((state)=>state.cart);
    
    const getItemsCount = ()=>{
        return cart.reduce((accumulator, item)=> accumulator + item.quantity, 0);
    };

    const getLoggedUser = () => {
        const user = localStorage.getItem("loggedUserInfo");
        setLoggedUser(JSON.parse(user));
    }

    const logout = () => {
        localStorage.removeItem('loggedUserInfo');
        setLoggedUser({});
        alert('successfully logout');
        redirect('login');

    }

    useEffect(()=>{
        getLoggedUser();
        // console.log("windows.location.href", String(window.location.href).split("/")[3]);
    }
    ,[])

    console.log('wwwwww', router.route.slice(1))
    return (
        <nav className={styles.navbar}>
            <h6 className={styles.logo}>
                GamesKart
            </h6>
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