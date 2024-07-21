import Button from '../../../stories/atoms/Button';

import styles from './counter.module.css';

interface CounterProps {
  count: number;
  // setCount: (value: number) => void;
};

const Counter: React.FC<CounterProps> = ({ count }) => {

  const itemsCount = count > 1 ? "items" : "item";

  //ts-ignore
  const handleChange = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    //temporary removed button actions
    // if (newCount >= 0 && newCount <= 99) {
    //   setCount(newCount);
    // }
  };

  return (

    <div className={styles.counter}>
      <Button className={styles.button}
        onClick={(e) => handleChange(e)}
        label={<img className={styles.picture} src="/pictures/minus.svg" alt="plus" />}
        isSmall
        area-label='Minus one piece from cart'
      />
      <div className={styles.count}>{count} {itemsCount}</div>
      <Button className={styles.button}
        onClick={(e) => handleChange(e)}
        label={<img className={styles.picture} src="/pictures/plus.svg" alt="minus" />}
        isSmall
        area-label='Plus one piece to cart'
      />
    </div>
  );
};

export default Counter;
