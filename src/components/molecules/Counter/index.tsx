import Button from "../../atoms/Button";

import styles from './counter.module.css';

interface CounterProps {
  count: number;
  setCount: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({ count, setCount }) => {

  const itemsCount = count > 1 ? "items" : "item";

  const handleChange = (event: React.MouseEvent<HTMLButtonElement>, newCount: number): void => {
    event.preventDefault();
    //temporary remove button actions
    // if (newCount >= 0 && newCount <= 99) {
    //   setCount(newCount);
    // }
  };

  return (

    <div className={styles.counter}>
      <Button className={styles.button}
        onClick={(e) => handleChange(e, count - 1)}
        label={<img className={styles.picture} src="./pictures/minus.svg" alt="plus" />}
        isOnlySymbol
        isSmall
        area-label='Minus one piece from cart'
      />
      <div className={styles.count}>{count} {itemsCount}</div>
      <Button className={styles.button}
        onClick={(e) => handleChange(e, count + 1)}
        label={<img className={styles.picture} src="./pictures/plus.svg" alt="minus" />}
        isOnlySymbol
        isSmall
        area-label='Plus one piece to cart'
      />
    </div>
  );
};

export default Counter;
