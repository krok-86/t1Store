import { NavLink } from 'react-router-dom';

import Button from '../../../stories/atoms/Button';

import styles from './introduction.module.css';

const Introduction = () => {

  return (
    <div className={styles.introduction}>
      <section className={styles.bordered}>
        <div className={styles.textWrap}>
          <h3 className={styles.text}>
            Any products from famous brands
          </h3>
          <h3 className={`${styles.text} ${styles.secondRow}`}>
            with worldwide delivery
          </h3>
        </div>
        <div className={styles.textSmallWrap}>
          <div className={styles.textSmall}>
            We sell smartphones, laptops, clothes, shoes
          </div>
          <div className={styles.textSmall}>
            and many other products at low prices
          </div>
        </div>
        <NavLink to='#catalog' className={styles.textButton}>
          <Button
            className={styles.textButton}
            label='Go to shopping'
          />
        </NavLink>
        <div className={styles.tagline}>
          Goods4you
        </div>
      </section>
    </div>
  );
};

export default Introduction;
