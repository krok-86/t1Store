import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Counter from '../../molecules/Counter';
import Button from '../../../stories/atoms/Button';
import ImageWrapper from '../../atoms/ImageWrapper';

import { IProductCart } from '../../../types/types';

import { useAppSelector } from '../../../hooks/hook';

import styles from './cardItem.module.css';
import { makeDiscountedPrice } from '../../../utils';

export type CardItemType = {
  cardData: IProductCart,
  sendCart: (idProduct: number, num: number) => void;
};

  const CardItem: FC<CardItemType> = ({ cardData, sendCart }) => {

  const { addStatus } = useAppSelector((state) => state.cart);

  const [count, setCount] = useState(cardData.quantity);

  const discountedPrice = makeDiscountedPrice(cardData.price || 0, cardData.discountPercentage || 0);

  const handleDel = () => {
    sendCart(cardData.id, 0);
    setCount(0);
  };

  const addToCart = () => {
    sendCart(cardData.id, 1);
    setCount(1);
  };

  const handleChangeCount = (number: number) => {
    sendCart(cardData.id, number);
    setCount(number);
  }

  useEffect(() => {
    if (addStatus === 'error') {
      setCount(cardData.quantity);
    }
  }, [addStatus]);

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
            {discountedPrice}
          </div>
        </div>
      </div>
      {count ?
        <div className={styles.actions}>
          <Counter
            count={count}
            setCount={handleChangeCount}
            isLoading = { addStatus === 'loading' }
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
          aria-label='Add to cart'
        />
      }
    </div>
  );
};

export default CardItem;

