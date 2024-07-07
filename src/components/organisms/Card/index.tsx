import { FC, useState } from 'react';

import Button from '../../atoms/Button';
import Counter from '../../molecules/Counter';

import { CardItemType } from '../CardItem';

import styles from './card.module.css';
import { Link } from 'react-router-dom';

const FULL_TEXT = "Essence Mascara Lash Princess";

const Card:FC <CardItemType> = ({ cardData, defaultCounter }) => {

  const [count, setCount] = useState(defaultCounter);
  const [isHovered, setIsHovered] = useState(false);

  const truncatedText = cardData.name.slice(0, 20) + (FULL_TEXT.length > 20 ? '...' : '');

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
      to='/product/1'
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
          src={cardData.img}
          alt={cardData.alt}
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
            {count ? truncatedText : FULL_TEXT}
          </div>
          <div className={styles.textPrice}>
            {cardData.price} $
          </div>
        </div>
        {count ?
          <Counter count={count} setCount={setCount} />
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

