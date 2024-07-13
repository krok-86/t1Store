import CardItem from '../../organisms/CardItem';

import styles from './cart.module.css';
import { useAppSelector } from '../../../hooks/hook';

import Spinner from '../../atoms/Spinner';

const Cart = () => {
  const { items, totalQuantity, total, discountedTotal, status } = useAppSelector((state) => state.cart);

  const itemsCount = totalQuantity > 1 ? "items" : "item";

  if (!totalQuantity && status === 'loaded') {
    return <div>Your cart is empty!!!</div>
  }

  if (status === 'loading') {
    return <Spinner />
  }

  if (!totalQuantity) {
    return null
  }
  return (
    <article className={styles.cart}>
      <title>My cart | Goods4you</title>
      <h1>My cart</h1>
      <div className={styles.cartInner}>
        <section className={styles.cartList} role="list">
          {items.map((item, idx) => (
            <CardItem
              key={idx}
              cardData={item}
            //temporary props to be figma convenient
            />
          ))}
        </section>
        <section className={styles.cartCheck}>
          <div className={styles.bordered}>
            <div className={`${styles.count} ${styles.alignment}`} >
              <p className={styles.title}>Total count</p>
              <p className={styles.number}>{totalQuantity} {itemsCount}</p>
            </div>
            <div className={`${styles.price} ${styles.alignment}`} >
              <p className={styles.title}>Price without discount</p>
              <p className={styles.number}>{total}$</p>
            </div>
          </div>
          <div className={`${styles.total} ${styles.alignment}`} >
            <p className={styles.title}>Total price</p>
            <p className={styles.number}>{discountedTotal}$</p>
          </div>
        </section>
      </div>
    </article>
  );
};

export default Cart;
