import { FC } from 'react';
import styles from './EmptyCartPage.module.css';

const EmptyCartPage: FC = () => {
  return (
    <div className={styles.emptyCart}>
      <h1>My cart</h1>
      <p className={styles.text}>No items</p>
    </div>
  );
};

export default EmptyCartPage;