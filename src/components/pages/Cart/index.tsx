import CardItem from '../../organisms/CardItem';

import { useAppDispatch, useAppSelector } from '../../../hooks/hook';

import { updateACart } from '../../../redux/slices/cart';
import { LocalStorageUtil } from '../../../utils';

import Spinner from '../../atoms/Spinner';
import EmptyCartPage from '../EmptyCartPage';

import styles from './cart.module.css';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { items, totalQuantity, total, discountedTotal, status } = useAppSelector((state) => state.cart);

  const sendCart = (idProduct: number, num: number) => {

    const updatedItems = items.map(item => {
      if (item.id === idProduct) {
        return { ...item, quantity: num };
      }
      return item;
    });

    const userId = LocalStorageUtil.getItem('userId');
    if (!userId) return;
    dispatch(updateACart({
      userId,
      cart: updatedItems,
    }));
  };

  const itemsCount = totalQuantity > 1 ? "items" : "item";

  if (!totalQuantity && status === 'loaded') {
    return <EmptyCartPage />
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
              sendCart={sendCart}
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
              <p className={styles.number}>{total.toFixed(2)}$</p>
            </div>
          </div>
          <div className={`${styles.total} ${styles.alignment}`} >
            <p className={styles.title}>Total price</p>
            <p className={styles.number}>{discountedTotal.toFixed(2)}$</p>
          </div>
        </section>
      </div>
    </article>
  );
};

export default Cart;
