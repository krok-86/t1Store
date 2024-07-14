import styles from './spinner.module.css';


const Spinner = () => {

  return (
    <div className={styles['loading-screen']}>
      <div className={styles['loading-spinner']} />
    </div>
  );
};

export default Spinner;