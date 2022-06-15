import styles from '../styles/Home.module.css'
import CategoryCard from '../components/CategoryCard'
import {addItem} from '../redux/item.slice';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {

  return (
    <main className={styles.container}>
      <div className={styles.small}>
        <CategoryCard image="https://imgur.com/uKQqsuA.png" name="Xbox" />
        <CategoryCard image="https://imgur.com/3Y1DLYC.png" name="PS5" />
        <CategoryCard image="https://imgur.com/Dm212HS.png" name="Switch" />
      </div>
      <div className={styles.large}>
        <CategoryCard image="https://imgur.com/qb6IW1f.png" name="PC" />
        <CategoryCard image="https://imgur.com/HsUfuRU.png" name="Accessories" />
      </div>
    </main>
  );
};

export default Home;
