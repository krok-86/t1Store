import { useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import CartBadge from '../../atoms/CartBadge';

import styles from './header.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/hook';
import { getCartsByAUser } from '../../../redux/slices/cart';

const CustomHeader = () => {

  const { totalQuantity } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCartsByAUser(''));
  }, [dispatch]);

  const location = useLocation();

  const scrollToHash = (): void => {
    if (!location.hash) { return; }
    const hash = location.hash.replace('#', '');
    const element = document.getElementById(hash);
    if (!element) { return; }
    element.scrollIntoView({
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    scrollToHash();
  }, [scrollToHash]);

  return (
    <header className={styles.header}>
      <Link to='/'>
        <div className={styles.logo}>Goods4you</div>
      </Link>
      <nav className={styles.navBlock}>
        <NavLink to='/#catalog'>
          <div className={styles.navLink}>Catalog</div>
        </NavLink>
        <NavLink to='/#faq'>
          <div className={styles.navLink}>FAQ</div>
        </NavLink>
        <NavLink to='cart'>
          <div className={styles.navBadge}>
            <div className={`${styles.navLink} ${styles.navBadgeLink}`}>Cart</div>
            {totalQuantity &&
              <CartBadge totalQuantity={totalQuantity} />
            }
          </div>
        </NavLink>
        <div className={styles.navLink}>Johnson Smith</div>
      </nav>
    </header>
  );
};

export default CustomHeader;
