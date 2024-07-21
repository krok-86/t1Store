import Button from '../../../stories/atoms/Button';

import styles from './counter.module.css';

interface CounterProps {
  count: number;
  setCount: (value: number) => void;
  limit?: number;
  isLoading?: boolean;
}

const Counter: React.FC<CounterProps> = ({ count, setCount, limit, isLoading }) => {
  const itemsCount = count > 1 ? "items" : "item";

  const handleChangePlus = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setCount(count + 1);
  };
  const handleChangeMinus = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setCount(count - 1);
  };

  return (
    <div className={styles.counter}>
      <Button className={styles.button}
        onClick={(e) => handleChangeMinus(e)}
        label={<img className={styles.picture} src="/pictures/minus.svg" alt="minus" />}
        isSmall
        aria-label='Minus one piece from cart'
        disabled={isLoading}
      />
      <div className={styles.count}>{count} {itemsCount}</div>
      <Button className={styles.button}
        onClick={(e) => handleChangePlus(e)}
        label={<img className={styles.picture} src="/pictures/plus.svg" alt="plus" />}
        isSmall
        aria-label='Plus one piece to cart'
        disabled={isLoading || (!!limit && count >= limit)}
      />
    </div>
  );
};

export default Counter;
