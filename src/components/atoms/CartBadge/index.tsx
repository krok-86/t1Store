import { useState } from 'react';

import styles from './cartBadge.module.css';

const CartBadge = () => {

  const [badge, setBadge] = useState(1)

  return (
    <div className={styles.cartBadge}>
      <img className={styles.cart} src="/pictures/cart.svg" alt="cart" />
      <div className={styles.circle}>{badge}</div>
    </div>
  )
};

export default CartBadge;