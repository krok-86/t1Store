import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../atoms/Button';
import Counter from '../../molecules/Counter';

import styles from './card.module.css';

import { CatalogItemType } from '../../../types/types';

type CardType = {
  cardData: CatalogItemType;
  defaultCounter: number;
}
const Card:FC <CardType> = ({ cardData, defaultCounter }) => {

  const [count, setCount] = useState(defaultCounter);
  const [isHovered, setIsHovered] = useState(false);
  const truncatedText = (cardData?.title?.length > 20 && count) ? cardData?.title?.slice(0, 19) + '...' : cardData?.title;
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const addToCart = (event: React.MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault();
      //temporary removed to user interaction turn off
      // setCount(1);
  };

  const eventMouse = isHovered ? styles.mouseTargetVisible : styles.mouseTargetHidden;

  return (
    <Link
      to={`/product/${cardData.id}`}
      className={styles.card}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="listitem"
    >
      <div
        className={styles.picWrap}
        id="more-info"
      >
        <img
          src={cardData.thumbnail}
          alt={cardData.title}
        />
        <div
          className={`${styles.mouseTarget} ${eventMouse}`}
          aria-details="more-info"
        >
          Show details
        </div>
      </div>
      <div className={styles.title}>
        <div className={styles.textWrap}>
          <div className={`${styles.textDescription} ${isHovered && styles.isHovered}`}>
            {count ? truncatedText : cardData.title}
          </div>
          <div className={styles.textPrice}>
            {cardData.price} $
          </div>
        </div>
        {defaultCounter ?
          <Counter count={defaultCounter} setCount={setCount} />
          :
          <Button
            className={styles.buy}
            label={<img className={styles.cart} src="./pictures/cart.svg" alt="cart" />}
            onClick={addToCart}
            isSmall
            isOnlySymbol
            area-label='Add to cart'
          />
        }
      </div>
    </Link>
  )
};

export default Card;

