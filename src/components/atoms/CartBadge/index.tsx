import { FC } from 'react';

import styles from './cartBadge.module.css';

type CartBadgeType = {
  totalQuantity: number;
}
const CartBadge:FC <CartBadgeType> = ({totalQuantity}) => {

  return (
    <div className={styles.cartBadge}>
      <img className={styles.cart} src="/pictures/cart.svg" alt="cart" />
      <div className={styles.circle}>{totalQuantity}</div>
    </div>
  )
};

export default CartBadge;