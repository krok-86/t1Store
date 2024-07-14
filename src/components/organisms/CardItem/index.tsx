import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import Counter from '../../molecules/Counter';
import Button from '../../../stories/atoms/Button';
import ImageWrapper from '../../atoms/ImageWrapper';

import { IProductCart } from '../../../types/types';

import styles from './cardItem.module.css';

export type CardItemType = {
  cardData: IProductCart,
};

const CardItem: FC<CardItemType> = ({ cardData }) => {
  const [count, setCount] = useState(cardData.quantity);

  const handleDel = () => {
    setCount(0);
  };

  const addToCart = () => {
    setCount(count + 1);
  };

  return (
    <div className={styles.cardItem} role="listitem">
      <div className={`${styles.infoWrap} ${count ? '' : styles.infoWrapDisabled}`}>
        <div className={styles.pictureWrap}>
          <ImageWrapper
            className={styles.picture}
            src={cardData.thumbnail}
            alt={cardData.title}
          />
        </div>
        <div className={styles.textWrap}>
          <Link to={`/product/${cardData.id}`}>
            <div className={styles.text}>
              {cardData.title}
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
            count={cardData.quantity}
            // setCount={setCount}
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
          onClick={addToCart}
          area-label='Add to cart'
        />
      }
    </div>
  );
};

export default CardItem;

