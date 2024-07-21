import { FC, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import CartBadge from '../../atoms/CartBadge';
import Spinner from '../../atoms/Spinner';

import { ApiError } from '../../../types/types';

import { useAppDispatch, useAppSelector } from '../../../hooks/hook';
import { getCartsByAUser } from '../../../redux/slices/cart';
import { useGetCurrentUserMutation } from '../../../redux/api/index.rtkQuery';
import { errorToast, LocalStorageUtil } from '../../../utils';

import styles from './header.module.css';


type CustomHeaderType = {
  handleLogin: (value: string) => void;
  isLoggin: string;
};

const CustomHeader: FC<CustomHeaderType> = ({ handleLogin, isLoggin }) => {
  const [userData, setUserData] = useState({name: '', id: -1 });
  const location = useLocation();
  const { totalQuantity } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userData.id === -1) return;
    dispatch(getCartsByAUser(userData.id));
  }, [dispatch, userData.id]);

  const [getCurrentUserMutation, { isLoading }] = useGetCurrentUserMutation();
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

  useEffect(() => {
    const getCurrentUser = async () => {
      const token = LocalStorageUtil.getItem('token')
      if (!token) {
        handleLogin('not logged')
        return
      }
      try {
      const res = await getCurrentUserMutation(token).unwrap();
      if (res) {
        setUserData({
          id: res.id,
          name: res.firstName + ' ' + res.lastName
        })
        handleLogin('logged')
      }
    } catch (err) {
      const error = err as ApiError;
      if (error.status === 401 || error.status === 403 || error.status === 400) {
        LocalStorageUtil.removeItem('token');
        LocalStorageUtil.removeItem('userId');
        handleLogin && handleLogin('not logged');
      }
      errorToast(error?.data?.message || 'Error occurred during loading page');
    }
  }
    getCurrentUser()
  }, [location.pathname]);

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.headerWrap}>
      <header className={styles.header}>
        <Link to='/'>
          <div className={styles.logo}>Goods4you</div>
        </Link>
        {(userData && isLoggin.length && isLoggin !== 'not logged' ) && (
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
            <div className={styles.navLink}>{userData.name}</div>
          </nav>
        )}
      </header>
    </div>
  );
};

export default CustomHeader;
