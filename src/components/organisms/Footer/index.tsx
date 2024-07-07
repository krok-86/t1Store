import { NavLink } from 'react-router-dom';

import styles from './footer.module.css';

const CustomFooter = () => {

return (
  <footer className={styles.footer}>
    <div className={styles.logo}>Goods4you</div>
    <div className={styles.navBlock}>
    <NavLink to='/#catalog'>
      <div className={styles.navLink}>Catalog</div>
    </NavLink>
    <NavLink to='/#faq'>
      <div className={styles.navLink}>FAQ</div>
    </NavLink>
    </div>
  </footer>
  );
};

export default CustomFooter;
