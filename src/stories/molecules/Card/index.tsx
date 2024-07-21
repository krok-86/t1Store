import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Counter from '../../../components/molecules/Counter';
import Button from '../../atoms/Button';

import styles from './card.module.css';

import { CatalogItemType } from '../../../types/types';
import ImageWrapper from '../../../components/atoms/ImageWrapper';
import { useAppSelector } from '../../../hooks/hook';
import { countInCart } from '../../../utils';

type CardType = {
  cardData: CatalogItemType;
  sendCart?: (idProduct: number, num: number, cardData: CatalogItemType) => void;
};

const Card: FC<CardType> = ({ cardData, sendCart }) => {

  const { items, addStatus } = useAppSelector((state) => state.cart);

  const [count, setCount] = useState(0);

  const truncatedText = (cardData?.title?.length > 20 && count) ? cardData?.title?.slice(0, 19) + '...' : cardData?.title;

  const addToCart = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const newCount = count + 1;
      sendCart && sendCart(cardData.id, newCount, cardData);
      setCount(newCount);
  };

  const handleChangeCount = (number: number) => {
    sendCart && sendCart(cardData.id, number, cardData);
    setCount(number);
  };

  useEffect(() => {
    setCount(countInCart(items, cardData.id));
  }, [cardData.id]);

  useEffect(() => {
    if (addStatus === 'error') {
      const n = countInCart(items, cardData.id);
      setCount(n);
    }
  }, [addStatus]);

  return (
    <Link
      to={`/product/${cardData.id}`}
      className={styles.card}
      role="listitem"
    >
      <div
        className={styles.picWrap}
        id="more-info"
      >
        <ImageWrapper
          src={cardData.thumbnail}
          alt={cardData.title}
        />
        <div
          className={`${styles.mouseTarget}`}
          aria-details="more-info"
        >
          Show details
        </div>
      </div>
      <div className={styles.title}>
        <div className={styles.textWrap}>
          <div className={`${styles.textDescription} `}>
            {count ? truncatedText : cardData.title}
          </div>
          <div className={styles.textPrice}>
            {cardData.price} $
          </div>
        </div>
        { count ?
          <Counter
            count={count}
            setCount={handleChangeCount}
            limit={cardData.stock}
            isLoading={ addStatus === 'loading' }
          />
          :
          <Button
            className={styles.buy}
            label={<img className={styles.cart} src="./pictures/cart.svg" alt="add item to cart" />}
            onClick={addToCart}
            isSmall
            aria-label='Add to cart'
            disabled ={ addStatus === 'loading' }
          />
        }
      </div>
    </Link>
  )
};

export default Card;

