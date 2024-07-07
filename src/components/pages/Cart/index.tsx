import CardItem from '../../organisms/CardItem';

import { createMocks } from '../../../utils';

import styles from './cart.module.css';

const Cart = () => {

  const cartArr = createMocks(4, 'Essence Mascara Lash Princess', './pictures/imageItem.png');

  return (
    <article className={styles.cart}>
      <title>My cart | Goods4you</title>
      <h1>My cart</h1>
      <div className={styles.cartInner}>
        <section className={styles.cartList} role="list">
          {cartArr.map((item, idx) => (
            <CardItem
              key={idx}
              cardData={item}
              //temporary props to be figma convenient
              defaultCounter={idx===2 ? 5 : idx===3 ? 0 : 1}/>
          ))}
        </section>
        <section className={styles.cartCheck}>
        <div className={styles.bordered}>
          <div className={`${styles.count} ${styles.alignment}`} >
            <p className={styles.title}>Total count</p>
            <p className={styles.number}>3 items</p>
          </div>
          <div className={`${styles.price} ${styles.alignment}`} >
            <p className={styles.title}>Price without discount</p>
            <p className={styles.number}>700$</p>
          </div>
        </div>
          <div className={`${styles.total} ${styles.alignment}`} >
            <p className={styles.title}>Total price</p>
            <p className={styles.number}>590$</p>
          </div>
        </section>
      </div>
    </article>
  );
};

export default Cart;
