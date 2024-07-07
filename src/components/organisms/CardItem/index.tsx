import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import Counter from '../../molecules/Counter';
import Button from '../../atoms/Button';

import { ItemType } from '../../pages/Catalog';

import styles from './cardItem.module.css';

export type CardItemType = {
  cardData: ItemType,
  //temporary props to be figma convenient
  defaultCounter: number,
}

const CardItem: FC<CardItemType> = ({ cardData, defaultCounter }) => {
  const [count, setCount] = useState(defaultCounter);

  const handleDel = () => {
    setCount(0)
  };

  const addToCart = () => {
    setCount(count + 1)
  };

  return (
    <div className={styles.cardItem} role="listitem">
      <div className={`${styles.infoWrap} ${count ? '' : styles.infoWrapDisabled}`}>
        <div className={styles.pictureWrap}>
          <img
            className={styles.picture}
            src={cardData.img}
            alt={cardData.alt}
          />
        </div>
        <div className={styles.textWrap}>
          <Link to='/product/1'>
            <div className={styles.text}>
              {cardData.name}
            </div>
          </Link>
          <div className={styles.price}>
            {cardData.price} $
          </div>
        </div>
      </div>
      {count ?
        <div className={styles.actions}>
          <Counter
            count={count}
            setCount={setCount}
          />
          <div
            className={styles.del}
            onClick={handleDel}
          >
            Delete
          </div>
        </div>
        :
        <Button
          className={styles.cartButton}
          label={<img className={styles.cart} src="/pictures/cart.svg" alt="cart" />}
          isSmall
          isOnlySymbol
          onClick={addToCart}
          area-label='Add to cart'
        />
      }
    </div>
  );
};

export default CardItem;

